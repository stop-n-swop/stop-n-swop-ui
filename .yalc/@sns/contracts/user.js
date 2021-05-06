'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var common = require('@sns/contracts/common');

exports.OauthProvider = void 0;
(function (OauthProvider) {
  OauthProvider["GOOGLE"] = "google";
})(exports.OauthProvider || (exports.OauthProvider = {}));

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

exports.UserCode = void 0;
(function (UserCode) {
  UserCode[UserCode["NOT_UNIQUE"] = 200] = "NOT_UNIQUE";
  UserCode[UserCode["INVALID_LOGIN"] = 201] = "INVALID_LOGIN";
  UserCode[UserCode["INVALID_TOKEN"] = 202] = "INVALID_TOKEN";
  UserCode[UserCode["OUTDATED_TOKEN"] = 203] = "OUTDATED_TOKEN";
  UserCode[UserCode["NOT_FOUND"] = 204] = "NOT_FOUND";
  UserCode[UserCode["EMAIL_NOT_UNIQUE"] = 205] = "EMAIL_NOT_UNIQUE";
})(exports.UserCode || (exports.UserCode = {}));
class UsernameNotUniqueError extends common.ConflictError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.NOT_UNIQUE);
  }
}
class EmailNotUniqueError extends common.ConflictError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.EMAIL_NOT_UNIQUE);
  }
}
class InvalidUsernamePassword extends common.UserInputError {
  constructor(message = "invalid username / password") {
    super(message);
    _defineProperty(this, "code", exports.UserCode.INVALID_LOGIN);
  }
}
class InvalidTokenError extends common.NotAuthorisedError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.INVALID_TOKEN);
  }
}
class OutdatedTokenError extends common.NotAuthorisedError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.OUTDATED_TOKEN);
  }
}
class UserNotFoundError extends common.NotFoundError {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.UserCode.NOT_FOUND);
  }
}

exports.EmailNotUniqueError = EmailNotUniqueError;
exports.InvalidTokenError = InvalidTokenError;
exports.InvalidUsernamePassword = InvalidUsernamePassword;
exports.OutdatedTokenError = OutdatedTokenError;
exports.UserNotFoundError = UserNotFoundError;
exports.UsernameNotUniqueError = UsernameNotUniqueError;
