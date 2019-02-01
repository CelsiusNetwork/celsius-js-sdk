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
        gender: 'male' | 'female' | 'other';
        /** E.123 international notation phone **/
        phone_number: string;
        document_type: 'passport' | 'national_id' | 'drivers_license';
    }

    interface CelsiusKycFiles {
        /** Path to the file. **/
        document_front_image: string;
        /** Path to the file. **/
        document_back_image: string;
    }

    interface BackofficePaginationOptions {
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

    interface CelsiusInstance {
        currencies: string[];
        getKycStatus(userSecret: string): Promise<KycStatus>;
        verifyKyc(userData: CelsiusKycUserData, documents: CelsiusKycFiles, userSecret: string): Promise<any>;
        getSupportedCurrencies(): Promise<CelsiusSupportedCurrencies>;
        getBalanceSummary(userSecret: string): Promise<CelsiusBalanceSummaryResponse>;
        getCoinBalance(coin: string, userSecret: string): Promise<CelsiusCoinBalanceResponse>;
        getTransactionSummary(pagination: CelsiusPagination, userSecret: string): Promise<CelsiusTransactionSummary>;
        getCoinTransactions(coin: string, pagination: CelsiusPagination, userSecret: string): Promise<CelsiusTransactionSummary>;
        getDeposit(coin: string, userSecret: string): Promise<{address: string}>;
        withdraw(coin: string, formFields: CelsiusWithdrawOptions, userSecret: string): Promise<{transaction_id: string}>;
        getTransactionStatus(transaction: string, userSecret: string): Promise<CelsiusWithdrawalTransaction>;
        getUsers(pagination: BackofficePaginationOptions, userSecret: string): Promise<User[]>;
        changeMetadata(id: string, data: object, userSecret: string): Promise<UserMetadataResponse>;
        changeWithdrawalAddress(id: string, data: object, userSecret: string): Promise<UserWithdrawalAddress>;
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