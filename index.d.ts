declare module "celsius-sdk" {
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
        country: string;
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
        taxNumber?: number;
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
        getTransactionStatus(transaction: string, userSecret: string): Promise<CelsiusWithdrawalTransaction>;
        getUsers(pagination: PaginationOptions, userSecret: string): Promise<UsersResponse>;
        changeMetadata(id: string, data: object, userSecret: string): Promise<UserMetadataResponse>;
        changeWithdrawalAddress(id: string, data: WithdrawalAddress, userSecret: string): Promise<UserWithdrawalAddress>;
        createUser(user: InstitutionalUser, userSecret: string): Promise<UserCreateResponse>
        getInterestRates(): Promise<InterestRates>
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