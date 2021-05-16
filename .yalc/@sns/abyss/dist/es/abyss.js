class BaseError extends Error {
  constructor(...args) {
    super(...args);
    this.code = "UNKNOWN";
    this.status = 500;
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code
      }
    };
  }
  toString() {
    return "An unknown error occurred";
  }
}
class UnknownError extends BaseError {}
class NotFoundError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = "NOT_FOUND";
    this.status = 404;
  }
  toString() {
    return "The requested resource was not found";
  }
}
class NotAuthorisedError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = "NOT_AUTHORIZED";
    this.status = 401;
  }
  toString() {
    return "You are not correctly authenticated";
  }
}
class ConflictError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = "CONFLICT";
    this.status = 409;
  }
  toString() {
    return "There was a conflict. Maybe a record already exists or was updated by someone else?";
  }
}
class BadRequestError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = "BAD_REQUEST";
    this.status = 400;
  }
  toString() {
    return "The data you provided was not valid...";
  }
}
class UsernameNotUniqueError extends ConflictError {
  constructor(...args) {
    super(...args);
    this.code = "USERNAME_NOT_UNIQUE";
  }
  toString() {
    return "This username has already been picked by another user";
  }
}
class InvalidLoginError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = "INVALID_LOGIN";
  }
  toString() {
    return "Unable to log in with these credentials...";
  }
}
class InvalidTokenError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = "INVALID_TOKEN";
  }
}
class OutdatedTokenError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = "OUTDATED_TOKEN";
  }
}
class UserNotFoundError extends NotFoundError {
  constructor(...args) {
    super(...args);
    this.code = "USER_NOT_FOUND";
  }
  toString() {
    return "The user could not be found..";
  }
}
class ValidationError extends BadRequestError {
  constructor(errors) {
    super();
    this.errors = errors;
    this.code = "VALIDATION";
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
        errors: this.errors
      }
    };
  }
  toString() {
    return "";
  }
}
class UploadFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = "UPLOAD_FAILED";
  }
  toString() {
    return "Something went wrong uploading your image, please try again";
  }
}
const responseToError = response => {
  var _response$error;
  switch ((_response$error = response.error) == null ? void 0 : _response$error.code) {
    case "UNKNOWN":
      return new UnknownError();
    case "NOT_FOUND":
      return new NotFoundError();
    case "NOT_AUTHORIZED":
      return new NotAuthorisedError();
    case "CONFLICT":
      return new ConflictError();
    case "BAD_REQUEST":
      return new BadRequestError();
    case "USERNAME_NOT_UNIQUE":
      return new UsernameNotUniqueError();
    case "INVALID_LOGIN":
      return new InvalidLoginError();
    case "OUTDATED_TOKEN":
      return new OutdatedTokenError();
    case "USER_NOT_FOUND":
      return new UserNotFoundError();
    case "VALIDATION":
      return new ValidationError(response.error.errors);
    case "UPLOAD_FAILED":
      return new UploadFailedError();
  }
  switch (response.status) {
    case 400:
      return new BadRequestError();
    case 401:
      return new NotAuthorisedError();
    case 404:
      return new NotFoundError();
    case 409:
      return new ConflictError();
  }
  return new UnknownError();
};

export { BadRequestError, BaseError, ConflictError, InvalidLoginError, InvalidTokenError, NotAuthorisedError, NotFoundError, OutdatedTokenError, UnknownError, UploadFailedError, UserNotFoundError, UsernameNotUniqueError, ValidationError, responseToError };
