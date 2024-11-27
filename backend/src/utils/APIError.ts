import httpStatus from "http-status-codes";

class APIError extends Error {
  statusCode: number;
  isPublic: boolean;
  publicMessage: string;

  constructor(statusCode: number, message?: string, isPublic: boolean = false) {
    const statusMessage = httpStatus.getStatusText(statusCode);

    super(message || statusMessage);
    Object.setPrototypeOf(this, APIError.prototype);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isPublic = isPublic;
    this.publicMessage = isPublic && message ? message : statusMessage;
  }
}

export const statusCodes = httpStatus;

export default APIError;
