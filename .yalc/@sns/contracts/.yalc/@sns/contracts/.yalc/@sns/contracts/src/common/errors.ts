export enum CommonCode {
  NOT_FOUND = 100,
  NOT_AUTHORIZED = 101,
  VALIDATION = 102,
  CONFLICT = 103,
  BAD_REQUEST = 104,
}

export class NotFoundError extends Error {
  code: number = CommonCode.NOT_FOUND;
}

export class NotAuthorisedError extends Error {
  code: number = CommonCode.NOT_AUTHORIZED;
}

export class ConflictError extends Error {
  code: number = CommonCode.CONFLICT;
}

export class UserInputError extends Error {
  code: number = CommonCode.BAD_REQUEST;
}
