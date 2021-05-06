import {
  UserInputError,
  ConflictError,
  NotAuthorisedError,
  NotFoundError,
} from "@sns/contracts/common";

export enum UserCode {
  NOT_UNIQUE = 200,
  INVALID_LOGIN = 201,
  INVALID_TOKEN = 202,
  OUTDATED_TOKEN = 203,
  NOT_FOUND = 204,
  EMAIL_NOT_UNIQUE = 205,
}

export class UsernameNotUniqueError extends ConflictError {
  code: number = UserCode.NOT_UNIQUE;
}

export class EmailNotUniqueError extends ConflictError {
  code: number = UserCode.EMAIL_NOT_UNIQUE;
}

export class InvalidUsernamePassword extends UserInputError {
  code: number = UserCode.INVALID_LOGIN;

  constructor(message = "invalid username / password") {
    super(message);
  }
}

export class InvalidTokenError extends NotAuthorisedError {
  code: number = UserCode.INVALID_TOKEN;
}

export class OutdatedTokenError extends NotAuthorisedError {
  code: number = UserCode.OUTDATED_TOKEN;
}

export class UserNotFoundError extends NotFoundError {
  code: number = UserCode.NOT_FOUND;
}
