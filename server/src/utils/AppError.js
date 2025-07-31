export class AppError extends Error {
  constructor(message, status = 500, type = "GENERAL", errorCode = "INTERNAL_ERROR") {
    super(message);
    this.status = status;
    this.type = type;
    this.errorCode = errorCode;

    // Maintain proper stack trace (only on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
