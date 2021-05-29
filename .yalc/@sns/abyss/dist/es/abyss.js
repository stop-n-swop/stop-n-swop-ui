let CommonErrorCode;
(function (CommonErrorCode) {
  CommonErrorCode["UNKNOWN"] = "UNKNOWN";
  CommonErrorCode["NOT_FOUND"] = "NOT_FOUND";
  CommonErrorCode["NOT_AUTHORIZED"] = "NOT_AUTHORIZED";
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
    super(`Could not find requested game ${id}`);
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
class NotAuthorisedError extends BaseError {
  constructor(...args) {
    super(...args);
    this.code = CommonErrorCode.NOT_AUTHORIZED;
    this.status = 401;
  }
  toString() {
    return "You are not correctly authenticated";
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
    return "";
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
class InvalidTokenError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    this.code = AuthErrorCode.INVALID_TOKEN;
  }
}
class OutdatedTokenError extends NotAuthorisedError {
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

const responseToError = response => {
  var _response$error;
  switch ((_response$error = response.error) == null ? void 0 : _response$error.code) {
    case CommonErrorCode.UNKNOWN:
      return new UnknownError();
    case CommonErrorCode.NOT_FOUND:
      return new NotFoundError(response.error.entity, response.error.id);
    case CommonErrorCode.NOT_AUTHORIZED:
      return new NotAuthorisedError();
    case CommonErrorCode.CONFLICT:
      return new ConflictError();
    case CommonErrorCode.BAD_REQUEST:
      return new BadRequestError();
    case CommonErrorCode.VALIDATION:
      return new ValidationError(response.error.errors);
    case UserErrorCode.USERNAME_NOT_UNIQUE:
      return new UsernameNotUniqueError();
    case UserErrorCode.USER_NOT_FOUND:
      return new UserNotFoundError(response.error.id);
    case AuthErrorCode.INVALID_LOGIN:
      return new InvalidLoginError();
    case AuthErrorCode.OUTDATED_TOKEN:
      return new OutdatedTokenError();
    case ImageErrorCode.UPLOAD_FAILED:
      return new UploadFailedError();
    case GameErrorCode.GAME_NOT_FOUND:
      return new GameNotFoundError(response.error.id);
    case GameErrorCode.INVALID_GAME_PLATFORM:
      return new InvalidGamePlatformError(response.error.platformId, response.error.gameId);
    case ListingErrorCode.CREATE_LISTING:
      return new CreateListingError();
    case ListingErrorCode.LISTING_NOT_FOUND:
      return new ListingNotFoundError(response.error.id);
    case PlatformErrorCode.PLATFORM_NOT_FOUND:
      return new PlatformNotFoundError(response.error.id);
  }
  switch (response.status) {
    case 400:
      return new BadRequestError();
    case 401:
      return new NotAuthorisedError();
    case 404:
      return new NotFoundError("", "");
    case 409:
      return new ConflictError();
  }
  return new UnknownError();
};

export { AuthErrorCode, BadRequestError, BaseError, CommonErrorCode, ConflictError, CreateListingError, GameErrorCode, GameNotFoundError, ImageErrorCode, InvalidGamePlatformError, InvalidLoginError, InvalidTokenError, ListingErrorCode, ListingNotFoundError, NotAuthorisedError, NotFoundError, OutdatedTokenError, PlatformErrorCode, PlatformNotFoundError, UnknownError, UploadFailedError, UserErrorCode, UserNotFoundError, UsernameNotUniqueError, ValidationError, responseToError };
