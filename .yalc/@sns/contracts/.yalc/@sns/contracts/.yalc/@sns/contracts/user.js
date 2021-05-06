'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

let CommonCode;
(function (CommonCode) {
  CommonCode[CommonCode["NOT_FOUND"] = 100] = "NOT_FOUND";
  CommonCode[CommonCode["NOT_AUTHORIZED"] = 101] = "NOT_AUTHORIZED";
  CommonCode[CommonCode["VALIDATION"] = 102] = "VALIDATION";
  CommonCode[CommonCode["CONFLICT"] = 103] = "CONFLICT";
  CommonCode[CommonCode["BAD_REQUEST"] = 104] = "BAD_REQUEST";
})(CommonCode || (CommonCode = {}));
class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", CommonCode.NOT_FOUND);
  }
}
class NotAuthorisedError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", CommonCode.NOT_AUTHORIZED);
  }
}
class ConflictError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", CommonCode.CONFLICT);
  }
}
class UserInputError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", CommonCode.BAD_REQUEST);
  }
}

exports.UserCode = void 0;
(function (UserCode) {
  UserCode[UserCode["NOT_UNIQUE"] = 200] = "NOT_UNIQUE";
  UserCode[UserCode["INVALID_LOGIN"] = 201] = "INVALID_LOGIN";
  UserCode[UserCode["INVALID_TOKEN"] = 202] = "INVALID_TOKEN";
  UserCode[UserCode["OUTDATED_TOKEN"] = 203] = "OUTDATED_TOKEN";
  UserCode[UserCode["NOT_FOUND"] = 204] = "NOT_FOUND";
})(exports.UserCode || (exports.UserCode = {}));
class UsernameNotUniqueError extends ConflictError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.NOT_UNIQUE);
  }
}
class InvalidUsernamePassword extends UserInputError {
  constructor(message = "invalid username / password") {
    super(message);
    _defineProperty(this, "code", exports.UserCode.INVALID_LOGIN);
  }
}
class InvalidTokenError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.INVALID_TOKEN);
  }
}
class OutdatedTokenError extends NotAuthorisedError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.OUTDATED_TOKEN);
  }
}
class UserNotFoundError extends NotFoundError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.NOT_FOUND);
  }
}

exports.InvalidTokenError = InvalidTokenError;
exports.InvalidUsernamePassword = InvalidUsernamePassword;
exports.OutdatedTokenError = OutdatedTokenError;
exports.UserNotFoundError = UserNotFoundError;
exports.UsernameNotUniqueError = UsernameNotUniqueError;
