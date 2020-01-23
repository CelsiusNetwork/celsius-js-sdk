declare module 'celsius-sdk' {
    interface CelsiusConfigurations {
        staging: Partial<CelsiusConfigurationInstance>;
        production: Partial<CelsiusConfigurationInstance>;
    }

    interface CelsiusConfigurationInstance {
        /** Base URL of the Celsius API */
        baseUrl?: string;
        /** Public key required for preventing man-in-the-middle attacks */
        publicKey?: string;
        /** The partner's API token */
        partnerKey: string;
        /** the selected auth method */
        authMethod: AUTH_METHODS;
        /** The node environment to run on. */
        environment: ENVIRONMENT;
    }

    interface CelsiusBalanceSummaryResponse {
        /** Contains user's balance per coin. **/
        balance: {
            [key: string]: number
        }
    }

    interface CelsiusInterestSummaryResponse {
        /** Contains user's interest per coin. **/
        interest: {
            [key: string]: number
        }
    }

    interface CelsiusStatisticsTotalUSDAmount {
        /** Contains total amount owned in usd. **/
        total_amount_usd: string,
    }

    interface CelsiusAmountPerCoin {
        /** Contains, for each coin, amount of that coin and amount in usd. **/
        [key: string]: {
            amount: string,
            amount_usd: number
        }
    }

    interface CelsiusStatisticsResponse {
        deposit_count: number | string,
        deposit_amount:  CelsiusStatisticsTotalUSDAmount & CelsiusAmountPerCoin,
        withdrawal_count: number | string,
        withdrawal_amount: CelsiusStatisticsTotalUSDAmount & CelsiusAmountPerCoin,
        interest_count: number | string,
        interest_amount: CelsiusStatisticsTotalUSDAmount & CelsiusAmountPerCoin
    }

    interface CelsiusPaginationOptions {
        /** Page to retrieve. If left empty, defaults to first page.**/
        page?: number;
        /** How many records are shown per page. If left empty, defaults to 20 records.**/
        per_page?: number;
    }

    interface CelsiusPagination {
        /** Total number of records */
        total?: number;
        /** Total number of pages */
        pages?: number;
        /** Current page */
        current?: number;
        /** How many records are shown per page */
        per_page?: number;
        /** A string representing with records are being shown */
        showing?: string;
    }

    interface CelsiusCoinBalanceResponse {
        /** The amount in the current token */
        amount: string;
        /** The amount in US dollars of your token's balance */
        amount_in_usd: string;
    }

    /**
     * Celsius Withdraw Options
     */
    interface CelsiusWithdrawOptions {
        /** The coin you wish to withdraw */
        coin: string;
        /** This is the withdrawal amount you want */
        amount: number;
        /** This is destination address that you want the tokens to be deposited  */
        address: string;
    }

    /** Celsius Withdrawal Transaction, received in the response of the withdraw method */
    interface CelsiusWithdrawalTransaction {
        /** Celsius Transaction ID received in the withdraw */
        tx_id: string|null;
        /** The state of the withdraw request */
        state: string;
    }

    /**
     * Celsius Withdrawal Addresses
     */
    interface CelsiusWithdrawalAddresses {
        addresses: {
            /** Each key,value pair represents a coin and the withdrawal address for that coin **/
            [key: string]: string
        };
    }

    interface CelsiusTransactionRecord extends CelsiusCoinBalanceResponse {
        /** The amount in this coin */
        amount: string;
        /** The amount in US dollars for this coin */
        amount_usd: string,
        /** The coin of the transaction */
        coin: string;
        /** In which state the transaction is in */
        state: string;
        /** The nature of the transaction */
        nature: string;
        /** The timestamp of the transaction */
        time: string;
        /** The transaction id in the blockchain. It's null if the transaction was not yet submitted */
        tx_id: string|null;
    }

    /** Celsius transaction summary */
    interface CelsiusTransactionSummary {
        /** Informations about the pagination */
        pagination: CelsiusPagination;
        /** Records of the transactions */
        record: CelsiusTransactionRecord[];
    }

    interface KycStatus {
        status: 'PENDING' | 'COMPLETED' | 'PASSED' | 'REJECTED';
    }

    interface CelsiusSupportedCurrencies {
        /** Short names of currencies **/
        currencies: string[]
    }

    interface CelsiusKycUserData {
        first_name: string;
        last_name: string;
        middle_name?: string;
        title?: 'mr' | 'ms' | 'mrs';
        /** ISO-8601 date string **/
        date_of_birth: string;
        /** ISO-3166-1 country short names **/
        citizenship: string;
        /** ISO-3166 country names (two letter code, three letter code, common name or official name **/
        country: 'AW' | 'ABW' | 'Aruba' | 'Aruba' | 'AF' | 'AFG' | 'Afghanistan' | 'Islamic Republic of Afghanistan' | 'AO' | 'AGO' | 'Angola' | 'Republic of Angola' | 'AI' | 'AIA' | 'Anguilla' | 'Anguilla' | 'AX' | 'ALA' | 'Åland Islands' | 'Åland Islands' | 'AL' | 'ALB' | 'Albania' | 'Republic of Albania' | 'AD' | 'AND' | 'Andorra' | 'Principality of Andorra' | 'AE' | 'ARE' | 'United Arab Emirates' | 'United Arab Emirates' | 'AR' | 'ARG' | 'Argentina' | 'Argentine Republic' | 'AM' | 'ARM' | 'Armenia' | 'Republic of Armenia' | 'AS' | 'ASM' | 'American Samoa' | 'American Samoa' | 'AQ' | 'ATA' | 'Antarctica' | 'Antarctica' | 'TF' | 'ATF' | 'French Southern and Antarctic Lands' | 'Territory of the French Southern and Antarctic Lands' | 'AG' | 'ATG' | 'Antigua and Barbuda' | 'Antigua and Barbuda' | 'AU' | 'AUS' | 'Australia' | 'Commonwealth of Australia' | 'AT' | 'AUT' | 'Austria' | 'Republic of Austria' | 'AZ' | 'AZE' | 'Azerbaijan' | 'Republic of Azerbaijan' | 'BI' | 'BDI' | 'Burundi' | 'Republic of Burundi' | 'BE' | 'BEL' | 'Belgium' | 'Kingdom of Belgium' | 'BJ' | 'BEN' | 'Benin' | 'Republic of Benin' | 'BF' | 'BFA' | 'Burkina Faso' | 'Burkina Faso' | 'BD' | 'BGD' | 'Bangladesh' | 'People\'s Republic of Bangladesh' | 'BG' | 'BGR' | 'Bulgaria' | 'Republic of Bulgaria' | 'BH' | 'BHR' | 'Bahrain' | 'Kingdom of Bahrain' | 'BS' | 'BHS' | 'Bahamas' | 'Commonwealth of the Bahamas' | 'BA' | 'BIH' | 'Bosnia and Herzegovina' | 'Bosnia and Herzegovina' | 'BL' | 'BLM' | 'Saint Barthélemy' | 'Collectivity of Saint Barthélemy' | 'SH' | 'SHN' | 'Saint Helena, Ascension and Tristan da Cunha' | 'Saint Helena, Ascension and Tristan da Cunha' | 'BY' | 'BLR' | 'Belarus' | 'Republic of Belarus' | 'BZ' | 'BLZ' | 'Belize' | 'Belize' | 'BM' | 'BMU' | 'Bermuda' | 'Bermuda' | 'BO' | 'BOL' | 'Bolivia' | 'Plurinational State of Bolivia' | 'BQ' | 'BES' | 'Caribbean Netherlands' | 'Bonaire, Sint Eustatius and Saba' | 'BR' | 'BRA' | 'Brazil' | 'Federative Republic of Brazil' | 'BB' | 'BRB' | 'Barbados' | 'Barbados' | 'BN' | 'BRN' | 'Brunei' | 'Nation of Brunei, Abode of Peace' | 'BT' | 'BTN' | 'Bhutan' | 'Kingdom of Bhutan' | 'BV' | 'BVT' | 'Bouvet Island' | 'Bouvet Island' | 'BW' | 'BWA' | 'Botswana' | 'Republic of Botswana' | 'CF' | 'CAF' | 'Central African Republic' | 'Central African Republic' | 'CA' | 'CAN' | 'Canada' | 'Canada' | 'CC' | 'CCK' | 'Cocos (Keeling) Islands' | 'Territory of the Cocos (Keeling) Islands' | 'CH' | 'CHE' | 'Switzerland' | 'Swiss Confederation' | 'CL' | 'CHL' | 'Chile' | 'Republic of Chile' | 'CN' | 'CHN' | 'China' | 'People\'s Republic of China' | 'CI' | 'CIV' | 'Ivory Coast' | 'Republic of Côte d\'Ivoire' | 'CM' | 'CMR' | 'Cameroon' | 'Republic of Cameroon' | 'CD' | 'COD' | 'DR Congo' | 'Democratic Republic of the Congo' | 'CG' | 'COG' | 'Republic of the Congo' | 'Republic of the Congo' | 'CK' | 'COK' | 'Cook Islands' | 'Cook Islands' | 'CO' | 'COL' | 'Colombia' | 'Republic of Colombia' | 'KM' | 'COM' | 'Comoros' | 'Union of the Comoros' | 'CV' | 'CPV' | 'Cape Verde' | 'Republic of Cabo Verde' | 'CR' | 'CRI' | 'Costa Rica' | 'Republic of Costa Rica' | 'CU' | 'CUB' | 'Cuba' | 'Republic of Cuba' | 'CW' | 'CUW' | 'Curaçao' | 'Country of Curaçao' | 'CX' | 'CXR' | 'Christmas Island' | 'Territory of Christmas Island' | 'KY' | 'CYM' | 'Cayman Islands' | 'Cayman Islands' | 'CY' | 'CYP' | 'Cyprus' | 'Republic of Cyprus' | 'CZ' | 'CZE' | 'Czechia' | 'Czech Republic' | 'DE' | 'DEU' | 'Germany' | 'Federal Republic of Germany' | 'DJ' | 'DJI' | 'Djibouti' | 'Republic of Djibouti' | 'DM' | 'DMA' | 'Dominica' | 'Commonwealth of Dominica' | 'DK' | 'DNK' | 'Denmark' | 'Kingdom of Denmark' | 'DO' | 'DOM' | 'Dominican Republic' | 'Dominican Republic' | 'DZ' | 'DZA' | 'Algeria' | 'People\'s Democratic Republic of Algeria' | 'EC' | 'ECU' | 'Ecuador' | 'Republic of Ecuador' | 'EG' | 'EGY' | 'Egypt' | 'Arab Republic of Egypt' | 'ER' | 'ERI' | 'Eritrea' | 'State of Eritrea' | 'EH' | 'ESH' | 'Western Sahara' | 'Sahrawi Arab Democratic Republic' | 'ES' | 'ESP' | 'Spain' | 'Kingdom of Spain' | 'EE' | 'EST' | 'Estonia' | 'Republic of Estonia' | 'ET' | 'ETH' | 'Ethiopia' | 'Federal Democratic Republic of Ethiopia' | 'FI' | 'FIN' | 'Finland' | 'Republic of Finland' | 'FJ' | 'FJI' | 'Fiji' | 'Republic of Fiji' | 'FK' | 'FLK' | 'Falkland Islands' | 'Falkland Islands' | 'FR' | 'FRA' | 'France' | 'French Republic' | 'FO' | 'FRO' | 'Faroe Islands' | 'Faroe Islands' | 'FM' | 'FSM' | 'Micronesia' | 'Federated States of Micronesia' | 'GA' | 'GAB' | 'Gabon' | 'Gabonese Republic' | 'GB' | 'GBR' | 'United Kingdom' | 'United Kingdom of Great Britain and Northern Ireland' | 'GE' | 'GEO' | 'Georgia' | 'Georgia' | 'GG' | 'GGY' | 'Guernsey' | 'Bailiwick of Guernsey' | 'GH' | 'GHA' | 'Ghana' | 'Republic of Ghana' | 'GI' | 'GIB' | 'Gibraltar' | 'Gibraltar' | 'GN' | 'GIN' | 'Guinea' | 'Republic of Guinea' | 'GP' | 'GLP' | 'Guadeloupe' | 'Guadeloupe' | 'GM' | 'GMB' | 'Gambia' | 'Republic of the Gambia' | 'GW' | 'GNB' | 'Guinea-Bissau' | 'Republic of Guinea-Bissau' | 'GQ' | 'GNQ' | 'Equatorial Guinea' | 'Republic of Equatorial Guinea' | 'GR' | 'GRC' | 'Greece' | 'Hellenic Republic' | 'GD' | 'GRD' | 'Grenada' | 'Grenada' | 'GL' | 'GRL' | 'Greenland' | 'Greenland' | 'GT' | 'GTM' | 'Guatemala' | 'Republic of Guatemala' | 'GF' | 'GUF' | 'French Guiana' | 'Guiana' | 'GU' | 'GUM' | 'Guam' | 'Guam' | 'GY' | 'GUY' | 'Guyana' | 'Co-operative Republic of Guyana' | 'HK' | 'HKG' | 'Hong Kong' | 'Hong Kong Special Administrative Region of the People\'s Republic of China' | 'HM' | 'HMD' | 'Heard Island and McDonald Islands' | 'Heard Island and McDonald Islands' | 'HN' | 'HND' | 'Honduras' | 'Republic of Honduras' | 'HR' | 'HRV' | 'Croatia' | 'Republic of Croatia' | 'HT' | 'HTI' | 'Haiti' | 'Republic of Haiti' | 'HU' | 'HUN' | 'Hungary' | 'Hungary' | 'ID' | 'IDN' | 'Indonesia' | 'Republic of Indonesia' | 'IM' | 'IMN' | 'Isle of Man' | 'Isle of Man' | 'IN' | 'IND' | 'India' | 'Republic of India' | 'IO' | 'IOT' | 'British Indian Ocean Territory' | 'British Indian Ocean Territory' | 'IE' | 'IRL' | 'Ireland' | 'Republic of Ireland' | 'IR' | 'IRN' | 'Iran' | 'Islamic Republic of Iran' | 'IQ' | 'IRQ' | 'Iraq' | 'Republic of Iraq' | 'IS' | 'ISL' | 'Iceland' | 'Iceland' | 'IL' | 'ISR' | 'Israel' | 'State of Israel' | 'IT' | 'ITA' | 'Italy' | 'Italian Republic' | 'JM' | 'JAM' | 'Jamaica' | 'Jamaica' | 'JE' | 'JEY' | 'Jersey' | 'Bailiwick of Jersey' | 'JO' | 'JOR' | 'Jordan' | 'Hashemite Kingdom of Jordan' | 'JP' | 'JPN' | 'Japan' | 'Japan' | 'KZ' | 'KAZ' | 'Kazakhstan' | 'Republic of Kazakhstan' | 'KE' | 'KEN' | 'Kenya' | 'Republic of Kenya' | 'KG' | 'KGZ' | 'Kyrgyzstan' | 'Kyrgyz Republic' | 'KH' | 'KHM' | 'Cambodia' | 'Kingdom of Cambodia' | 'KI' | 'KIR' | 'Kiribati' | 'Independent and Sovereign Republic of Kiribati' | 'KN' | 'KNA' | 'Saint Kitts and Nevis' | 'Federation of Saint Christopher and Nevisa' | 'KR' | 'KOR' | 'South Korea' | 'Republic of Korea' | 'XK' | 'UNK' | 'Kosovo' | 'Republic of Kosovo' | 'KW' | 'KWT' | 'Kuwait' | 'State of Kuwait' | 'LA' | 'LAO' | 'Laos' | 'Lao People\'s Democratic Republic' | 'LB' | 'LBN' | 'Lebanon' | 'Lebanese Republic' | 'LR' | 'LBR' | 'Liberia' | 'Republic of Liberia' | 'LY' | 'LBY' | 'Libya' | 'State of Libya' | 'LC' | 'LCA' | 'Saint Lucia' | 'Saint Lucia' | 'LI' | 'LIE' | 'Liechtenstein' | 'Principality of Liechtenstein' | 'LK' | 'LKA' | 'Sri Lanka' | 'Democratic Socialist Republic of Sri Lanka' | 'LS' | 'LSO' | 'Lesotho' | 'Kingdom of Lesotho' | 'LT' | 'LTU' | 'Lithuania' | 'Republic of Lithuania' | 'LU' | 'LUX' | 'Luxembourg' | 'Grand Duchy of Luxembourg' | 'LV' | 'LVA' | 'Latvia' | 'Republic of Latvia' | 'MO' | 'MAC' | 'Macau' | 'Macao Special Administrative Region of the People\'s Republic of China' | 'MF' | 'MAF' | 'Saint Martin' | 'Saint Martin' | 'MA' | 'MAR' | 'Morocco' | 'Kingdom of Morocco' | 'MC' | 'MCO' | 'Monaco' | 'Principality of Monaco' | 'MD' | 'MDA' | 'Moldova' | 'Republic of Moldova' | 'MG' | 'MDG' | 'Madagascar' | 'Republic of Madagascar' | 'MV' | 'MDV' | 'Maldives' | 'Republic of the Maldives' | 'MX' | 'MEX' | 'Mexico' | 'United Mexican States' | 'MH' | 'MHL' | 'Marshall Islands' | 'Republic of the Marshall Islands' | 'MK' | 'MKD' | 'Macedonia' | 'Republic of Macedonia' | 'ML' | 'MLI' | 'Mali' | 'Republic of Mali' | 'MT' | 'MLT' | 'Malta' | 'Republic of Malta' | 'MM' | 'MMR' | 'Myanmar' | 'Republic of the Union of Myanmar' | 'ME' | 'MNE' | 'Montenegro' | 'Montenegro' | 'MN' | 'MNG' | 'Mongolia' | 'Mongolia' | 'MP' | 'MNP' | 'Northern Mariana Islands' | 'Commonwealth of the Northern Mariana Islands' | 'MZ' | 'MOZ' | 'Mozambique' | 'Republic of Mozambique' | 'MR' | 'MRT' | 'Mauritania' | 'Islamic Republic of Mauritania' | 'MS' | 'MSR' | 'Montserrat' | 'Montserrat' | 'MQ' | 'MTQ' | 'Martinique' | 'Martinique' | 'MU' | 'MUS' | 'Mauritius' | 'Republic of Mauritius' | 'MW' | 'MWI' | 'Malawi' | 'Republic of Malawi' | 'MY' | 'MYS' | 'Malaysia' | 'Malaysia' | 'YT' | 'MYT' | 'Mayotte' | 'Department of Mayotte' | 'NA' | 'NAM' | 'Namibia' | 'Republic of Namibia' | 'NC' | 'NCL' | 'New Caledonia' | 'New Caledonia' | 'NE' | 'NER' | 'Niger' | 'Republic of Niger' | 'NF' | 'NFK' | 'Norfolk Island' | 'Territory of Norfolk Island' | 'NG' | 'NGA' | 'Nigeria' | 'Federal Republic of Nigeria' | 'NI' | 'NIC' | 'Nicaragua' | 'Republic of Nicaragua' | 'NU' | 'NIU' | 'Niue' | 'Niue' | 'NL' | 'NLD' | 'Netherlands' | 'Kingdom of the Netherlands' | 'NO' | 'NOR' | 'Norway' | 'Kingdom of Norway' | 'NP' | 'NPL' | 'Nepal' | 'Federal Democratic Republic of Nepal' | 'NR' | 'NRU' | 'Nauru' | 'Republic of Nauru' | 'NZ' | 'NZL' | 'New Zealand' | 'New Zealand' | 'OM' | 'OMN' | 'Oman' | 'Sultanate of Oman' | 'PK' | 'PAK' | 'Pakistan' | 'Islamic Republic of Pakistan' | 'PA' | 'PAN' | 'Panama' | 'Republic of Panama' | 'PN' | 'PCN' | 'Pitcairn Islands' | 'Pitcairn Group of Islands' | 'PE' | 'PER' | 'Peru' | 'Republic of Peru' | 'PH' | 'PHL' | 'Philippines' | 'Republic of the Philippines' | 'PW' | 'PLW' | 'Palau' | 'Republic of Palau' | 'PG' | 'PNG' | 'Papua New Guinea' | 'Independent State of Papua New Guinea' | 'PL' | 'POL' | 'Poland' | 'Republic of Poland' | 'PR' | 'PRI' | 'Puerto Rico' | 'Commonwealth of Puerto Rico' | 'KP' | 'PRK' | 'North Korea' | 'Democratic People\'s Republic of Korea' | 'PT' | 'PRT' | 'Portugal' | 'Portuguese Republic' | 'PY' | 'PRY' | 'Paraguay' | 'Republic of Paraguay' | 'PS' | 'PSE' | 'Palestine' | 'State of Palestine' | 'PF' | 'PYF' | 'French Polynesia' | 'French Polynesia' | 'QA' | 'QAT' | 'Qatar' | 'State of Qatar' | 'RE' | 'REU' | 'Réunion' | 'Réunion Island' | 'RO' | 'ROU' | 'Romania' | 'Romania' | 'RU' | 'RUS' | 'Russia' | 'Russian Federation' | 'RW' | 'RWA' | 'Rwanda' | 'Republic of Rwanda' | 'SA' | 'SAU' | 'Saudi Arabia' | 'Kingdom of Saudi Arabia' | 'SD' | 'SDN' | 'Sudan' | 'Republic of the Sudan' | 'SN' | 'SEN' | 'Senegal' | 'Republic of Senegal' | 'SG' | 'SGP' | 'Singapore' | 'Republic of Singapore' | 'GS' | 'SGS' | 'South Georgia' | 'South Georgia and the South Sandwich Islands' | 'SJ' | 'SJM' | 'Svalbard and Jan Mayen' | 'Svalbard og Jan Mayen' | 'SB' | 'SLB' | 'Solomon Islands' | 'Solomon Islands' | 'SL' | 'SLE' | 'Sierra Leone' | 'Republic of Sierra Leone' | 'SV' | 'SLV' | 'El Salvador' | 'Republic of El Salvador' | 'SM' | 'SMR' | 'San Marino' | 'Most Serene Republic of San Marino' | 'SO' | 'SOM' | 'Somalia' | 'Federal Republic of Somalia' | 'PM' | 'SPM' | 'Saint Pierre and Miquelon' | 'Saint Pierre and Miquelon' | 'RS' | 'SRB' | 'Serbia' | 'Republic of Serbia' | 'SS' | 'SSD' | 'South Sudan' | 'Republic of South Sudan' | 'ST' | 'STP' | 'São Tomé and Príncipe' | 'Democratic Republic of São Tomé and Príncipe' | 'SR' | 'SUR' | 'Suriname' | 'Republic of Suriname' | 'SK' | 'SVK' | 'Slovakia' | 'Slovak Republic' | 'SI' | 'SVN' | 'Slovenia' | 'Republic of Slovenia' | 'SE' | 'SWE' | 'Sweden' | 'Kingdom of Sweden' | 'SZ' | 'SWZ' | 'Eswatini' | 'Kingdom of Eswatini' | 'SX' | 'SXM' | 'Sint Maarten' | 'Sint Maarten' | 'SC' | 'SYC' | 'Seychelles' | 'Republic of Seychelles' | 'SY' | 'SYR' | 'Syria' | 'Syrian Arab Republic' | 'TC' | 'TCA' | 'Turks and Caicos Islands' | 'Turks and Caicos Islands' | 'TD' | 'TCD' | 'Chad' | 'Republic of Chad' | 'TG' | 'TGO' | 'Togo' | 'Togolese Republic' | 'TH' | 'THA' | 'Thailand' | 'Kingdom of Thailand' | 'TJ' | 'TJK' | 'Tajikistan' | 'Republic of Tajikistan' | 'TK' | 'TKL' | 'Tokelau' | 'Tokelau' | 'TM' | 'TKM' | 'Turkmenistan' | 'Turkmenistan' | 'TL' | 'TLS' | 'Timor-Leste' | 'Democratic Republic of Timor-Leste' | 'TO' | 'TON' | 'Tonga' | 'Kingdom of Tonga' | 'TT' | 'TTO' | 'Trinidad and Tobago' | 'Republic of Trinidad and Tobago' | 'TN' | 'TUN' | 'Tunisia' | 'Tunisian Republic' | 'TR' | 'TUR' | 'Turkey' | 'Republic of Turkey' | 'TV' | 'TUV' | 'Tuvalu' | 'Tuvalu' | 'TW' | 'TWN' | 'Taiwan' | 'Republic of China (Taiwan)' | 'TZ' | 'TZA' | 'Tanzania' | 'United Republic of Tanzania' | 'UG' | 'UGA' | 'Uganda' | 'Republic of Uganda' | 'UA' | 'UKR' | 'Ukraine' | 'Ukraine' | 'UM' | 'UMI' | 'United States Minor Outlying Islands' | 'United States Minor Outlying Islands' | 'UY' | 'URY' | 'Uruguay' | 'Oriental Republic of Uruguay' | 'US' | 'USA' | 'United States' | 'United States of America' | 'UZ' | 'UZB' | 'Uzbekistan' | 'Republic of Uzbekistan' | 'VA' | 'VAT' | 'Vatican City' | 'Vatican City State' | 'VC' | 'VCT' | 'Saint Vincent and the Grenadines' | 'Saint Vincent and the Grenadines' | 'VE' | 'VEN' | 'Venezuela' | 'Bolivarian Republic of Venezuela' | 'VG' | 'VGB' | 'British Virgin Islands' | 'Virgin Islands' | 'VI' | 'VIR' | 'United States Virgin Islands' | 'Virgin Islands of the United States' | 'VN' | 'VNM' | 'Vietnam' | 'Socialist Republic of Vietnam' | 'VU' | 'VUT' | 'Vanuatu' | 'Republic of Vanuatu' | 'WF' | 'WLF' | 'Wallis and Futuna' | 'Territory of the Wallis and Futuna Islands' | 'WS' | 'WSM' | 'Samoa' | 'Independent State of Samoa' | 'YE' | 'YEM' | 'Yemen' | 'Republic of Yemen' | 'ZA' | 'ZAF' | 'South Africa' | 'Republic of South Africa' | 'ZM' | 'ZMB' | 'Zambia' | 'Republic of Zambia' | 'ZW' | 'ZWE' | 'Zimbabwe' | 'Republic of Zimbabwe';
        /** State in United States **/
        state?: 'AL' | 'Alabama' | 'AK' | 'Alaska' | 'AS' | 'American Samoa' | 'AZ' | 'Arizona' | 'AR' | 'Arkansas' | 'CA' | 'California' | 'CO' | 'Colorado' | 'CT' | 'Connecticut' | 'DE' | 'Delaware' | 'DC' | 'District Of Columbia' | 'FM' | 'Federated States Of Micronesia' | 'FL' | 'Florida' | 'GA' | 'Georgia' | 'GU' | 'Guam' | 'HI' | 'Hawaii' | 'ID' | 'Idaho' | 'IL' | 'Illinois' | 'IN' | 'Indiana' | 'IA' | 'Iowa' | 'KS' | 'Kansas' | 'KY' | 'Kentucky' | 'LA' | 'Louisiana' | 'ME' | 'Maine' | 'MH' | 'Marshall Islands' | 'MD' | 'Maryland' | 'MA' | 'Massachusetts' | 'MI' | 'Michigan' | 'MN' | 'Minnesota' | 'MS' | 'Mississippi' | 'MO' | 'Missouri' | 'MT' | 'Montana' | 'NE' | 'Nebraska' | 'NV' | 'Nevada' | 'NH' | 'New Hampshire' | 'NJ' | 'New Jersey' | 'NM' | 'New Mexico' | 'NY' | 'New York' | 'NC' | 'North Carolina' | 'ND' | 'North Dakota' | 'MP' | 'Northern Mariana Islands' | 'OH' | 'Ohio' | 'OK' | 'Oklahoma' | 'OR' | 'Oregon' | 'PW' | 'Palau' | 'PA' | 'Pennsylvania' | 'PR' | 'Puerto Rico' | 'RI' | 'Rhode Island' | 'SC' | 'South Carolina' | 'SD' | 'South Dakota' | 'TN' | 'Tennessee' | 'TX' | 'Texas' | 'UT' | 'Utah' | 'VT' | 'Vermont' | 'VI' | 'Virgin Islands' | 'VA' | 'Virginia' | 'WA' | 'Washington' | 'WV' | 'West Virginia' | 'WI' | 'Wisconsin' | 'WY' | 'Wyoming';
        city: string;
        zip: string;
        street: string;
        building_number?: string;
        flat_number?: string;
        /** Individual taxpayer identification number **/
        itin?: string;
        /** National id **/
        national_id?: string;
        /** Social security number **/
        ssn?: string;
        gender?: 'male' | 'female' | 'other';
        /** E.123 international notation phone **/
        phone_number: string;
        document_type: 'passport' | 'identity_card' | 'driving_licence';
    }

    interface CelsiusKycFiles {
        /** Path to the file. **/
        document_front_image: string;
        /** Path to the file. **/
        document_back_image: string;
    }

    interface PaginationOptions {
        page?: number;
        limit?: number;
        email?: string;
        name?: string;
        orderBy?: string;
        direction?: string;
    }

    interface User {
        id: string;
        auth0_user_id: string;
        email: string;
        pin: string;
        first_name: string;
        last_name: string;
        company_name: string;
        country: string;
        twitter_id: string;
        facebook_id: string;
        google_id: string;
        referral_link_id: string;
        twitter_screen_name: string;
        two_factor_secret: string;
        profile_picture: string;
        api_token: string;
        phone_number: string;
        citizenship: string;
        note: string;
        sms_verification_code: string;
        partner_id: string;
        blocked_reason: string;
        two_factor_enabled: boolean;
        phone_contacts_connected: boolean;
        whitelisted_by_location: boolean;
        twitter_friends_connected: boolean;
        facebook_friends_connected: boolean;
        expo_push_tokens: object;
        metadata: object;
        session_invalid_before: Date;
        created_at: Date;
        updated_at: Date;
        blocked_at: Date;
        kyc_status: KycStatus;
    }

    interface UserMetadataResponse {
        message: 'User`s metadata has been updated';
    }

    interface UserCreateResponse {
        message: 'User has been created';
    }

    interface UserWithdrawalAddress {
        user_id: string;
        coin: string;
        bitgo_wallet_id: string;
        address: string;
        manually_set: boolean;
        created_at: string;
        updated_at: string;
        version: number;
    }

    interface UsersResponse {
        users: {
            total: number,
            results: User[]
        }
    }

    interface WithdrawalAddress {
        short: string,
        address: string
    }

    interface InstitutionalUser {
        companyName: string;
        email: string;
        country: string;
        state?: string;
        taxNumber?: string;
        contactPerson: string;
        contactEmail: string;
        note?: string;
        withdrawalWallets: WithdrawalAddress[];
    }

    interface CelsiusInstance {
        currencies: string[];
        getKycStatus(userSecret: string): Promise<KycStatus>;
        verifyKyc(userData: CelsiusKycUserData, documents: CelsiusKycFiles, userSecret: string): Promise<any>;
        getSupportedCurrencies(): Promise<CelsiusSupportedCurrencies>;
        getBalanceSummary(userSecret: string): Promise<CelsiusBalanceSummaryResponse>;
        getCoinBalance(coin: string, userSecret: string): Promise<CelsiusCoinBalanceResponse>;
        getInterestSummary(userSecret: string): Promise<CelsiusInterestSummaryResponse>;
        getTransactionSummary(pagination: CelsiusPagination, userSecret: string): Promise<CelsiusTransactionSummary>;
        getCoinTransactions(coin: string, pagination: CelsiusPagination, userSecret: string): Promise<CelsiusTransactionSummary>;
        getDeposit(coin: string, userSecret: string): Promise<{address: string}>;
        withdraw(coin: string, formFields: CelsiusWithdrawOptions, userSecret: string): Promise<{transaction_id: string}>;
        getWithdrawalAddressForCoin(coin: string, userSecret: string): Promise<{address: string}>
        getWithdrawalAddresses(userSecret: string): Promise<CelsiusWithdrawalAddresses>
        getTransactionStatus(transaction: string, userSecret: string): Promise<CelsiusWithdrawalTransaction>;
        getUsers(pagination: PaginationOptions, userSecret: string): Promise<UsersResponse>;
        changeMetadata(id: string, data: object, userSecret: string): Promise<UserMetadataResponse>;
        changeWithdrawalAddress(id: string, data: WithdrawalAddress, userSecret: string): Promise<UserWithdrawalAddress>;
        createUser(user: InstitutionalUser, userSecret: string): Promise<UserCreateResponse>
        getInterestRates(): Promise<InterestRates>
        getStatistics(userSecret: string, timestamp?: string): Promise<CelsiusStatisticsResponse>
    }

    interface InterestRates {
        interestRates: {
            coin: string;
            rate: string;
            currency: Currency;
        }
    }

    interface Currency {
        id: number;
        name: string;
        short: string;
        image_url: string;
    }

    export enum AUTH_METHODS {
        API_KEY = 'api-key',
        USER_TOKEN = 'user-token',
    }

    export enum ENVIRONMENT {
        STAGING = 'staging',
        PRODUCTION = 'production'
    }

    export function Celsius(config: CelsiusConfigurationInstance): Promise<CelsiusInstance>;
}
