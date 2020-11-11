class ValidationError {
  constructor (error) {
    this.status = error.status

    if (error.data.message) {
      this.message = error.data.message
    } else {
      this.message = error.data
    }
  }
}

module.exports = {
  ValidationError
}
