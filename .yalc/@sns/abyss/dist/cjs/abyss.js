'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.CommonErrorCode = void 0;
(function (CommonErrorCode) {
  CommonErrorCode["UNKNOWN"] = "UNKNOWN";
  CommonErrorCode["NOT_FOUND"] = "NOT_FOUND";
  CommonErrorCode["NOT_AUTHENTICATED"] = "NOT_AUTHENTICATED";
  CommonErrorCode["NOT_AUTHORISED"] = "NOT_AUTHORISED";
  CommonErrorCode["CONFLICT"] = "CONFLICT";
  CommonErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
  CommonErrorCode["VALIDATION"] = "VALIDATION";
})(exports.CommonErrorCode || (exports.CommonErrorCode = {}));
class BaseError extends Error {
  constructor(...args) {
    super(...args);
    this.code = exports.CommonErrorCode.UNKNOWN;
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
  constructor(entity, id) {
    super(`Could not find requested ${entity} ${id}`);
    this.entity = entity;
    this.id = id;
    this.code = exports.CommonErrorCode.NOT_FOUND;
    this.status = 404;
  }
  toString() {
    if (this.entity && this.id) {
      return `Hmm, we couldn't find a ${this.entity} for ${this.id}`;
    }
    return "Requested resource could not be found";
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
        id: this.id,
        entity: this.entity
      }
    };
  }
}
class NotAuthenticatedError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = exports.CommonErrorCode.NOT_AUTHENTICATED;
    this.status = 401;
  }
  toString() {
    return "You are not correctly authenticated";
  }
}
class NotAuthorisedError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = exports.CommonErrorCode.NOT_AUTHORISED;
    this.status = 403;
  }
  toString() {
    return "You do not have permission for this action";
  }
}
class ConflictError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = exports.CommonErrorCode.CONFLICT;
    this.status = 409;
  }
  toString() {
    return "There was a conflict. Maybe a record already exists or was updated by someone else?";
  }
}
class BadRequestError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = exports.CommonErrorCode.BAD_REQUEST;
    this.status = 400;
  }
  toString() {
    return "The data you provided was not valid...";
  }
}
class ValidationError extends BadRequestError {
  constructor(errors) {
    super();
    this.errors = errors;
    this.code = exports.CommonErrorCode.VALIDATION;
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
    return "Some required fields are missing or incomplete...";
  }
}

exports.AuthErrorCode = void 0;
(function (AuthErrorCode) {
  AuthErrorCode["INVALID_LOGIN"] = "INVALID_LOGIN";
  AuthErrorCode["INVALID_TOKEN"] = "INVALID_TOKEN";
  AuthErrorCode["OUTDATED_TOKEN"] = "OUTDATED_TOKEN";
})(exports.AuthErrorCode || (exports.AuthErrorCode = {}));
class InvalidLoginError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = exports.AuthErrorCode.INVALID_LOGIN;
  }
  toString() {
    return "Unable to log in with these credentials...";
  }
}
class InvalidTokenError extends NotAuthenticatedError {
  constructor(...args) {
    super(...args);
    this.code = exports.AuthErrorCode.INVALID_TOKEN;
  }
}
class OutdatedTokenError extends NotAuthenticatedError {
  constructor(...args) {
    super(...args);
    this.code = exports.AuthErrorCode.OUTDATED_TOKEN;
  }
}

exports.GameErrorCode = void 0;
(function (GameErrorCode) {
  GameErrorCode["GAME_NOT_FOUND"] = "GAME_NOT_FOUND";
  GameErrorCode["INVALID_GAME_PLATFORM"] = "INVALID_GAME_PLATFORM";
})(exports.GameErrorCode || (exports.GameErrorCode = {}));
class GameNotFoundError extends NotFoundError {
  constructor(id) {
    super("game", id);
    this.code = exports.GameErrorCode.GAME_NOT_FOUND;
  }
  toString() {
    return `Hmm, we couldn't find a game with the id ${this.id}`;
  }
}
class InvalidGamePlatformError extends BadRequestError {
  constructor(platformId, gameId) {
    super(`Invalid platform ${platformId} for game ${gameId}`);
    this.platformId = platformId;
    this.gameId = gameId;
    this.code = exports.GameErrorCode.INVALID_GAME_PLATFORM;
  }
  toString() {
    return `Invalid platform ${this.platformId} for game ${this.gameId}`;
  }
  toHttpResponse() {
    return {
      status: this.status,
      body: {
        code: this.code,
        platformId: this.platformId,
        gameId: this.gameId
      }
    };
  }
}

exports.ImageErrorCode = void 0;
(function (ImageErrorCode) {
  ImageErrorCode["UPLOAD_FAILED"] = "UPLOAD_FAILED";
})(exports.ImageErrorCode || (exports.ImageErrorCode = {}));
class UploadFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.ImageErrorCode.UPLOAD_FAILED;
  }
  toString() {
    return "Something went wrong uploading your image, please try again";
  }
}

exports.ListingErrorCode = void 0;
(function (ListingErrorCode) {
  ListingErrorCode["CREATE_LISTING"] = "CREATE_LISTING";
  ListingErrorCode["LISTING_NOT_FOUND"] = "LISTING_NOT_FOUND";
  ListingErrorCode["UPDATE_FAILED"] = "UPDATE_FAILED";
  ListingErrorCode["UPDATE_LISTING_PROHIBITED"] = "UPDATE_LISTING_PROHIBITED";
})(exports.ListingErrorCode || (exports.ListingErrorCode = {}));
class CreateListingError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.ListingErrorCode.CREATE_LISTING;
  }
  toString() {
    return "Uhoh looks like we couldn't create this listing. You might want to try again?";
  }
}
class ListingNotFoundError extends NotFoundError {
  constructor(id) {
    super("listing", id);
    this.code = exports.ListingErrorCode.LISTING_NOT_FOUND;
  }
}
class UpdateListingFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.ListingErrorCode.UPDATE_FAILED;
  }
  toString() {
    return "Something went wrong trying to save this listing...";
  }
}
class UpdateListingProhibitedError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = exports.ListingErrorCode.UPDATE_LISTING_PROHIBITED;
  }
  toString() {
    return "You do not have permission to edit this listing";
  }
}

exports.OrderErrorCode = void 0;
(function (OrderErrorCode) {
  OrderErrorCode["ORDER_NOT_FOUND"] = "ORDER_NOT_FOUND";
  OrderErrorCode["ORDER_NOT_OWNED_BY_USER"] = "ORDER_NOT_OWNED_BY_USER";
  OrderErrorCode["INVALID_TRANSITION"] = "INVALID_TRANSITION";
  OrderErrorCode["LISTING_OWNED_BY_USER"] = "LISTING_OWNED_BY_USER";
  OrderErrorCode["ORDER_NOT_AVAILABLE"] = "ORDER_NOT_AVAILABLE";
})(exports.OrderErrorCode || (exports.OrderErrorCode = {}));
class OrderNotFoundError extends NotFoundError {
  constructor(id) {
    super("order", id);
    this.code = exports.OrderErrorCode.ORDER_NOT_FOUND;
  }
}
class OrderNotOwnedByUserError extends NotAuthorisedError {
  constructor(userId, listingId) {
    super(`User [${userId}] is not the buyer or seller of listing [${listingId}]`);
    this.code = exports.OrderErrorCode.ORDER_NOT_OWNED_BY_USER;
  }
  toString() {
    return "You are not authorised to access this order";
  }
}
class InvalidStatusError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = exports.OrderErrorCode.INVALID_TRANSITION;
  }
  toString() {
    return "You have attempted to change your order status to an invalid value";
  }
}
class ListingOwnedByUserError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = exports.OrderErrorCode.LISTING_OWNED_BY_USER;
  }
  toString() {
    return "You cannot create an order for a listing you own";
  }
}
class OrderNotAvailableError extends ConflictError {
  constructor(...args) {
    super(...args);
    this.code = exports.OrderErrorCode.ORDER_NOT_AVAILABLE;
  }
  toString() {
    return "This listing is no longer available :(";
  }
}

exports.PaymentErrorCode = void 0;
(function (PaymentErrorCode) {
  PaymentErrorCode["MISSING_REGISTER_FIELDS"] = "MISSING_REGISTER_FIELDS";
  PaymentErrorCode["FAILED_TO_REGISTER"] = "FAILED_TO_REGISTER";
  PaymentErrorCode["BANK_ACCOUNT_FAIL"] = "BANK_ACCOUNT_FAIL";
  PaymentErrorCode["KYC_DOCUMENT_FAILED"] = "KYC_DOCUMENT_FAILED";
  PaymentErrorCode["KYC_PAGE_TOO_SMALL"] = "KYC_PAGE_TOO_SMALL";
  PaymentErrorCode["KYC_PAGE_FAILED"] = "KYC_PAGE_FAILED";
  PaymentErrorCode["KYC_SUBMIT_FAILED"] = "KYC_SUBMIT_FAILED";
})(exports.PaymentErrorCode || (exports.PaymentErrorCode = {}));
class MissingRegisterFieldsError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.MISSING_REGISTER_FIELDS;
  }
  toString() {
    return 'You are missing some required data from your account. Please check the "details" and "address" sections of your account are completed...';
  }
}
class FailedToRegisterError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.FAILED_TO_REGISTER;
  }
  toString() {
    return "Something went wrong trying to register your account as an active buyer/seller";
  }
}
class BankAccountFailError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.BANK_ACCOUNT_FAIL;
  }
}
class KycDocumentFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.KYC_DOCUMENT_FAILED;
  }
}
class KycPageTooSmallError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.KYC_PAGE_TOO_SMALL;
  }
  toString() {
    return "The uploaded file is too small";
  }
}
class KycPageFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.KYC_PAGE_FAILED;
  }
}
class KycSubmitFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = exports.PaymentErrorCode.KYC_SUBMIT_FAILED;
  }
}

exports.PlatformErrorCode = void 0;
(function (PlatformErrorCode) {
  PlatformErrorCode["PLATFORM_NOT_FOUND"] = "PLATFORM_NOT_FOUND";
})(exports.PlatformErrorCode || (exports.PlatformErrorCode = {}));
class PlatformNotFoundError extends NotFoundError {
  constructor(id) {
    super("platform", id);
    this.code = exports.PlatformErrorCode.PLATFORM_NOT_FOUND;
  }
}

exports.UserErrorCode = void 0;
(function (UserErrorCode) {
  UserErrorCode["USERNAME_NOT_UNIQUE"] = "USERNAME_NOT_UNIQUE";
  UserErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
})(exports.UserErrorCode || (exports.UserErrorCode = {}));
class UsernameNotUniqueError extends ConflictError {
  constructor(...args) {
    super(...args);
    this.code = exports.UserErrorCode.USERNAME_NOT_UNIQUE;
  }
  toString() {
    return "This username has already been picked by another user";
  }
}
class UserNotFoundError extends NotFoundError {
  constructor(id) {
    super("user", id);
    this.code = exports.UserErrorCode.USER_NOT_FOUND;
  }
}

const responseToError = response => {
  var _response$error;
  switch ((_response$error = response.error) == null ? void 0 : _response$error.code) {
    case exports.CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case exports.CommonErrorCode.NOT_FOUND:
      return new NotFoundError(response.error.entity, response.error.id);
    case exports.CommonErrorCode.NOT_AUTHENTICATED:
      return new NotAuthenticatedError();
    case exports.CommonErrorCode.NOT_AUTHORISED:
      return new NotAuthorisedError();
    case exports.CommonErrorCode.CONFLICT:
      return new ConflictError();
    case exports.CommonErrorCode.BAD_REQUEST:
      return new BadRequestError();
    case exports.CommonErrorCode.VALIDATION:
      return new ValidationError(response.error.errors);
    case exports.UserErrorCode.USERNAME_NOT_UNIQUE:
      return new UsernameNotUniqueError();
    case exports.UserErrorCode.USER_NOT_FOUND:
      return new UserNotFoundError(response.error.id);
    case exports.AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case exports.AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();
    case exports.ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();
    case exports.GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(response.error.id);
    case exports.GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(response.error.platformId, response.error.gameId);
    case exports.ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case exports.ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(response.error.id);
    case exports.ListingErrorCode.UPDATE_FAILED:
      return new UpdateListingFailedError();
    case exports.ListingErrorCode.UPDATE_LISTING_PROHIBITED:
      return new UpdateListingProhibitedError();
    case exports.PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(response.error.id);
    case exports.OrderErrorCode.INVALID_TRANSITION:
      return new InvalidStatusError();
    case exports.OrderErrorCode.ORDER_NOT_FOUND:
      return new OrderNotFoundError(response.error.id);
    case exports.OrderErrorCode.ORDER_NOT_OWNED_BY_USER:
      return new OrderNotOwnedByUserError("", "");
    case exports.OrderErrorCode.LISTING_OWNED_BY_USER:
      return new ListingOwnedByUserError();
    case exports.OrderErrorCode.ORDER_NOT_AVAILABLE:
      return new OrderNotAvailableError();
    case exports.PaymentErrorCode.MISSING_REGISTER_FIELDS:
      return new MissingRegisterFieldsError();
    case exports.PaymentErrorCode.FAILED_TO_REGISTER:
      return new FailedToRegisterError();
    case exports.PaymentErrorCode.BANK_ACCOUNT_FAIL:
      return new BankAccountFailError();
    case exports.PaymentErrorCode.KYC_DOCUMENT_FAILED:
      return new KycDocumentFailedError();
    case exports.PaymentErrorCode.KYC_PAGE_TOO_SMALL:
      return new KycPageTooSmallError();
    case exports.PaymentErrorCode.KYC_PAGE_FAILED:
      return new KycPageFailedError();
    case exports.PaymentErrorCode.KYC_SUBMIT_FAILED:
      return new KycSubmitFailedError();
  }
  switch (response.status) {
    case 400:
      return new BadRequestError();
    case 401:
      return new NotAuthenticatedError();
    case 403:
      return new NotAuthorisedError();
    case 404:
      return new NotFoundError("", "");
    case 409:
      return new ConflictError();
  }
  return new UnknownError();
};

exports.BadRequestError = BadRequestError;
exports.BankAccountFailError = BankAccountFailError;
exports.BaseError = BaseError;
exports.ConflictError = ConflictError;
exports.CreateListingError = CreateListingError;
exports.FailedToRegisterError = FailedToRegisterError;
exports.GameNotFoundError = GameNotFoundError;
exports.InvalidGamePlatformError = InvalidGamePlatformError;
exports.InvalidLoginError = InvalidLoginError;
exports.InvalidStatusError = InvalidStatusError;
exports.InvalidTokenError = InvalidTokenError;
exports.KycDocumentFailedError = KycDocumentFailedError;
exports.KycPageFailedError = KycPageFailedError;
exports.KycPageTooSmallError = KycPageTooSmallError;
exports.KycSubmitFailedError = KycSubmitFailedError;
exports.ListingNotFoundError = ListingNotFoundError;
exports.ListingOwnedByUserError = ListingOwnedByUserError;
exports.MissingRegisterFieldsError = MissingRegisterFieldsError;
exports.NotAuthenticatedError = NotAuthenticatedError;
exports.NotAuthorisedError = NotAuthorisedError;
exports.NotFoundError = NotFoundError;
exports.OrderNotAvailableError = OrderNotAvailableError;
exports.OrderNotFoundError = OrderNotFoundError;
exports.OrderNotOwnedByUserError = OrderNotOwnedByUserError;
exports.OutdatedTokenError = OutdatedTokenError;
exports.PlatformNotFoundError = PlatformNotFoundError;
exports.UnknownError = UnknownError;
exports.UpdateListingFailedError = UpdateListingFailedError;
exports.UpdateListingProhibitedError = UpdateListingProhibitedError;
exports.UploadFailedError = UploadFailedError;
exports.UserNotFoundError = UserNotFoundError;
exports.UsernameNotUniqueError = UsernameNotUniqueError;
exports.ValidationError = ValidationError;
exports.responseToError = responseToError;
