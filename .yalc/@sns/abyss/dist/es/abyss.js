let CommonErrorCode;
(function (CommonErrorCode) {
  CommonErrorCode["UNKNOWN"] = "UNKNOWN";
  CommonErrorCode["NOT_FOUND"] = "NOT_FOUND";
  CommonErrorCode["NOT_AUTHENTICATED"] = "NOT_AUTHENTICATED";
  CommonErrorCode["NOT_AUTHORISED"] = "NOT_AUTHORISED";
  CommonErrorCode["CONFLICT"] = "CONFLICT";
  CommonErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
  CommonErrorCode["VALIDATION"] = "VALIDATION";
})(CommonErrorCode || (CommonErrorCode = {}));
class BaseError extends Error {
  constructor(...args) {
    super(...args);
    this.code = CommonErrorCode.UNKNOWN;
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
    this.code = CommonErrorCode.NOT_FOUND;
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
    this.code = CommonErrorCode.NOT_AUTHENTICATED;
    this.status = 401;
  }
  toString() {
    return "You are not correctly authenticated";
  }
}
class NotAuthorisedError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = CommonErrorCode.NOT_AUTHORISED;
    this.status = 403;
  }
  toString() {
    return "You do not have permission for this action";
  }
}
class ConflictError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = CommonErrorCode.CONFLICT;
    this.status = 409;
  }
  toString() {
    return "There was a conflict. Maybe a record already exists or was updated by someone else?";
  }
}
class BadRequestError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = CommonErrorCode.BAD_REQUEST;
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
    this.code = CommonErrorCode.VALIDATION;
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

let AuthErrorCode;
(function (AuthErrorCode) {
  AuthErrorCode["INVALID_LOGIN"] = "INVALID_LOGIN";
  AuthErrorCode["INVALID_TOKEN"] = "INVALID_TOKEN";
  AuthErrorCode["OUTDATED_TOKEN"] = "OUTDATED_TOKEN";
})(AuthErrorCode || (AuthErrorCode = {}));
class InvalidLoginError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = AuthErrorCode.INVALID_LOGIN;
  }
  toString() {
    return "Unable to log in with these credentials...";
  }
}
class InvalidTokenError extends NotAuthenticatedError {
  constructor(...args) {
    super(...args);
    this.code = AuthErrorCode.INVALID_TOKEN;
  }
}
class OutdatedTokenError extends NotAuthenticatedError {
  constructor(...args) {
    super(...args);
    this.code = AuthErrorCode.OUTDATED_TOKEN;
  }
}

let GameErrorCode;
(function (GameErrorCode) {
  GameErrorCode["GAME_NOT_FOUND"] = "GAME_NOT_FOUND";
  GameErrorCode["INVALID_GAME_PLATFORM"] = "INVALID_GAME_PLATFORM";
})(GameErrorCode || (GameErrorCode = {}));
class GameNotFoundError extends NotFoundError {
  constructor(id) {
    super("game", id);
    this.code = GameErrorCode.GAME_NOT_FOUND;
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
    this.code = GameErrorCode.INVALID_GAME_PLATFORM;
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

let ImageErrorCode;
(function (ImageErrorCode) {
  ImageErrorCode["UPLOAD_FAILED"] = "UPLOAD_FAILED";
})(ImageErrorCode || (ImageErrorCode = {}));
class UploadFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = ImageErrorCode.UPLOAD_FAILED;
  }
  toString() {
    return "Something went wrong uploading your image, please try again";
  }
}

let ListingErrorCode;
(function (ListingErrorCode) {
  ListingErrorCode["CREATE_LISTING"] = "CREATE_LISTING";
  ListingErrorCode["LISTING_NOT_FOUND"] = "LISTING_NOT_FOUND";
  ListingErrorCode["UPDATE_FAILED"] = "UPDATE_FAILED";
  ListingErrorCode["UPDATE_LISTING_PROHIBITED"] = "UPDATE_LISTING_PROHIBITED";
})(ListingErrorCode || (ListingErrorCode = {}));
class CreateListingError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = ListingErrorCode.CREATE_LISTING;
  }
  toString() {
    return "Uhoh looks like we couldn't create this listing. You might want to try again?";
  }
}
class ListingNotFoundError extends NotFoundError {
  constructor(id) {
    super("listing", id);
    this.code = ListingErrorCode.LISTING_NOT_FOUND;
  }
}
class UpdateListingFailedError extends UnknownError {
  constructor(...args) {
    super(...args);
    this.code = ListingErrorCode.UPDATE_FAILED;
  }
  toString() {
    return "Something went wrong trying to save this listing...";
  }
}
class UpdateListingProhibitedError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = ListingErrorCode.UPDATE_LISTING_PROHIBITED;
  }
  toString() {
    return "You do not have permission to edit this listing";
  }
}

let OrderErrorCode;
(function (OrderErrorCode) {
  OrderErrorCode["ORDER_NOT_FOUND"] = "ORDER_NOT_FOUND";
  OrderErrorCode["ORDER_NOT_OWNED_BY_USER"] = "ORDER_NOT_OWNED_BY_USER";
  OrderErrorCode["INVALID_TRANSITION"] = "INVALID_TRANSITION";
  OrderErrorCode["LISTING_OWNED_BY_USER"] = "LISTING_OWNED_BY_USER";
  OrderErrorCode["ORDER_NOT_AVAILABLE"] = "ORDER_NOT_AVAILABLE";
})(OrderErrorCode || (OrderErrorCode = {}));
class OrderNotFoundError extends NotFoundError {
  constructor(id) {
    super("order", id);
    this.code = OrderErrorCode.ORDER_NOT_FOUND;
  }
}
class OrderNotOwnedByUserError extends NotAuthorisedError {
  constructor(userId, listingId) {
    super(`User [${userId}] is not the buyer or seller of listing [${listingId}]`);
    this.code = OrderErrorCode.ORDER_NOT_OWNED_BY_USER;
  }
  toString() {
    return "You are not authorised to access this order";
  }
}
class InvalidStatusError extends BadRequestError {
  constructor(...args) {
    super(...args);
    this.code = OrderErrorCode.INVALID_TRANSITION;
  }
  toString() {
    return "You have attempted to change your order status to an invalid value";
  }
}
class ListingOwnedByUserError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = OrderErrorCode.LISTING_OWNED_BY_USER;
  }
  toString() {
    return "You cannot create an order for a listing you own";
  }
}
class OrderNotAvailableError extends ConflictError {
  constructor(...args) {
    super(...args);
    this.code = OrderErrorCode.ORDER_NOT_AVAILABLE;
  }
  toString() {
    return "This listing is no longer available :(";
  }
}

let PaymentErrorCode;
(function (PaymentErrorCode) {
  PaymentErrorCode["PAY_OUT_NOT_READY"] = "PAY_OUT_NOT_READY";
})(PaymentErrorCode || (PaymentErrorCode = {}));
class PayOutNotReadyError extends BadRequestError {
  constructor() {
    super("Attempted to pay out but user is not in a ready state");
  }
  toString() {
    return "You are not set up for pay outs. Please make sure you have set up bank details and verified your identity.";
  }
}

let PlatformErrorCode;
(function (PlatformErrorCode) {
  PlatformErrorCode["PLATFORM_NOT_FOUND"] = "PLATFORM_NOT_FOUND";
})(PlatformErrorCode || (PlatformErrorCode = {}));
class PlatformNotFoundError extends NotFoundError {
  constructor(id) {
    super("platform", id);
    this.code = PlatformErrorCode.PLATFORM_NOT_FOUND;
  }
}

let UserErrorCode;
(function (UserErrorCode) {
  UserErrorCode["USERNAME_NOT_UNIQUE"] = "USERNAME_NOT_UNIQUE";
  UserErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
})(UserErrorCode || (UserErrorCode = {}));
class UsernameNotUniqueError extends ConflictError {
  constructor(...args) {
    super(...args);
    this.code = UserErrorCode.USERNAME_NOT_UNIQUE;
  }
  toString() {
    return "This username has already been picked by another user";
  }
}
class UserNotFoundError extends NotFoundError {
  constructor(id) {
    super("user", id);
    this.code = UserErrorCode.USER_NOT_FOUND;
  }
}

const hydrate = (code, error = {}) => {
  switch (code) {
    case CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case CommonErrorCode.NOT_FOUND:
      return new NotFoundError(error.entity, error.id);
    case CommonErrorCode.NOT_AUTHENTICATED:
      return new NotAuthenticatedError();
    case CommonErrorCode.NOT_AUTHORISED:
      return new NotAuthorisedError();
    case CommonErrorCode.CONFLICT:
      return new ConflictError();
    case CommonErrorCode.BAD_REQUEST:
      return new BadRequestError();
    case CommonErrorCode.VALIDATION:
      return new ValidationError(error.errors);
    case UserErrorCode.USERNAME_NOT_UNIQUE:
      return new UsernameNotUniqueError();
    case UserErrorCode.USER_NOT_FOUND:
      return new UserNotFoundError(error.id);
    case AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();
    case ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();
    case GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(error.id);
    case GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(error.platformId, error.gameId);
    case ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(error.id);
    case ListingErrorCode.UPDATE_FAILED:
      return new UpdateListingFailedError();
    case ListingErrorCode.UPDATE_LISTING_PROHIBITED:
      return new UpdateListingProhibitedError();
    case PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(error.id);
    case OrderErrorCode.INVALID_TRANSITION:
      return new InvalidStatusError();
    case OrderErrorCode.ORDER_NOT_FOUND:
      return new OrderNotFoundError(error.id);
    case OrderErrorCode.ORDER_NOT_OWNED_BY_USER:
      return new OrderNotOwnedByUserError("", "");
    case OrderErrorCode.LISTING_OWNED_BY_USER:
      return new ListingOwnedByUserError();
    case OrderErrorCode.ORDER_NOT_AVAILABLE:
      return new OrderNotAvailableError();
    case PaymentErrorCode.PAY_OUT_NOT_READY:
      return new PayOutNotReadyError();
  }
  return new UnknownError();
};

const responseToError = response => {
  var _response$error;
  let err = hydrate((_response$error = response.error) == null ? void 0 : _response$error.code, response.error);
  if (err.constructor === UnknownError) {
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
  }
  return err;
};

export { AuthErrorCode, BadRequestError, BaseError, CommonErrorCode, ConflictError, CreateListingError, GameErrorCode, GameNotFoundError, ImageErrorCode, InvalidGamePlatformError, InvalidLoginError, InvalidStatusError, InvalidTokenError, ListingErrorCode, ListingNotFoundError, ListingOwnedByUserError, NotAuthenticatedError, NotAuthorisedError, NotFoundError, OrderErrorCode, OrderNotAvailableError, OrderNotFoundError, OrderNotOwnedByUserError, OutdatedTokenError, PayOutNotReadyError, PaymentErrorCode, PlatformErrorCode, PlatformNotFoundError, UnknownError, UpdateListingFailedError, UpdateListingProhibitedError, UploadFailedError, UserErrorCode, UserNotFoundError, UsernameNotUniqueError, ValidationError, hydrate, responseToError };
