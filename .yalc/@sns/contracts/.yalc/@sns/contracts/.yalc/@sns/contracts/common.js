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

exports.CommonCode = void 0;
(function (CommonCode) {
  CommonCode[CommonCode["NOT_FOUND"] = 100] = "NOT_FOUND";
  CommonCode[CommonCode["NOT_AUTHORIZED"] = 101] = "NOT_AUTHORIZED";
  CommonCode[CommonCode["VALIDATION"] = 102] = "VALIDATION";
  CommonCode[CommonCode["CONFLICT"] = 103] = "CONFLICT";
  CommonCode[CommonCode["BAD_REQUEST"] = 104] = "BAD_REQUEST";
})(exports.CommonCode || (exports.CommonCode = {}));
class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.CommonCode.NOT_FOUND);
  }
}
class NotAuthorisedError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.CommonCode.NOT_AUTHORIZED);
  }
}
class ConflictError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.CommonCode.CONFLICT);
  }
}
class UserInputError extends Error {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "code", exports.CommonCode.BAD_REQUEST);
  }
}

exports.ConflictError = ConflictError;
exports.NotAuthorisedError = NotAuthorisedError;
exports.NotFoundError = NotFoundError;
exports.UserInputError = UserInputError;
