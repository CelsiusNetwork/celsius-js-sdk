const fs = require("fs");
const crypto = require("crypto");
const fileType = require("file-type");

const { PUBLIC_KEY } = require("./consts");

const Util = function () {

  return {
    getMultipartData: function (formFields, files) {
      const crlf = "\r\n";
      const boundary = Math.random().toString(16);
      const openDelimiter = crlf + '--' + boundary;
      const closeDelimiter = openDelimiter + '--';

      function getPartFromData(key, value, isFile = false) {
        let partHeaders = [
          'Content-Disposition: form-data; name="' + key + '"' + crlf
        ];

        if (isFile) {
          const fileName = value.split("\\").pop().split('/').pop();
          value = fs.readFileSync(value);
          partHeaders = [
            'Content-Disposition: form-data; name="' + key + '"; filename="' + fileName + '"' + crlf,
            'Content-Type: ' + fileType(value).mime + crlf
          ];
        }

        return Buffer.concat([
          new Buffer(openDelimiter + crlf + partHeaders.join('') + crlf),
          new Buffer.from(value.toString())]
        );
      }

      let parts = [];

      for(const key in formFields) {
        if (formFields.hasOwnProperty(key)) {
          parts.push(getPartFromData(key, formFields[key]));
        }
      }

      for(const key in files) {
        if (files.hasOwnProperty(key)) {
          parts.push(getPartFromData(key, files[key], true))
        }
      }

      parts = Buffer.concat([
        Buffer.concat(parts),
        new Buffer.from(closeDelimiter)
      ]);

      return {
        multipartBody: parts,
        contentLength: parts.length,
        boundary: boundary,
      };
    },

    verifyResponse: function (data, signature) {
      const publicKey = Buffer.from(PUBLIC_KEY, 'base64').toString();
      return crypto.createVerify("sha256").update(data).verify(publicKey, signature, "base64");
    },
  };
};

module.exports = {
  Util
};
