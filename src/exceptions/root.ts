//message, status code, error codes, error

export class HttpException extends Error{
    message: string;
    errorCode:ErrorCode;
    statusCode: number;
    errors: any;

    constructor(message:string, errorCode:ErrorCode,statusCode: number,errors: any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors 
    }
}


export enum ErrorCode {
    // ───────────────────────────────
    // HTTP Standard Error Codes
    // ───────────────────────────────
    UNAUTHORIZED = 401, // Unauthorized access (standard HTTP status)

    // ───────────────────────────────
    // 1xxx: User-related Errors
    // ───────────────────────────────
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    INVALID_INPUT = 1004,

    // ───────────────────────────────
    // 2xxx: Validation / Business Rule Errors
    // ───────────────────────────────
    UNPROCESSABLE_ENTITY = 2001, // e.g., validation errors, malformed input
    MEMBER_ALREADY_EXISTS = 2002,

    // ───────────────────────────────
    // 3xxx: System / Internal Errors
    // ───────────────────────────────
    INTERNAL_EXCEPTION = 3001,

    // ───────────────────────────────
    // 4xxx: Member-related Errors
    // ───────────────────────────────
    // MEMBER_NOT_FOUND = 4001,
    NO_DATA_PROVIDED = 4002,

    // ───────────────────────────────
    // 5xxx: General Errors
    // ───────────────────────────────
    SERVER_ERROR = 5000, // General server error
    BAD_REQUEST = 5001, // General bad request error
    NOT_FOUND = 5002, // Resource not found
    FORBIDDEN = 5003, // Forbidden access
    CONFLICT = 5004, // Conflict error (e.g., duplicate entry)
    TIMEOUT = 5005, // Timeout error
    SERVICE_UNAVAILABLE = 5006, // Service unavailable error
    GATEWAY_TIMEOUT = 5007, // Gateway timeout error
    INVALID_CREDENTIALS = 5008, // Invalid credentials error
    INVALID_TOKEN = 5009, // Invalid token error
    TOKEN_EXPIRED = 5010, // Token expired error
    INVALID_API_KEY = 5011, // Invalid API key error
    API_RATE_LIMIT_EXCEEDED = 5012, // API rate limit exceeded error
    INVALID_REQUEST = 5013, // Invalid request error
    INVALID_RESPONSE = 5014, // Invalid response error
    DATABASE_ERROR = 5015, // Database error
    NETWORK_ERROR = 5016, // Network error
    OTP_GENERATION_FAILED = 5017, // OTP generation failed error
    OTP_VERIFICATION_FAILED = 5018,
    DUPLICATE_ENTRY = 5019, // Duplicate entry error
}
