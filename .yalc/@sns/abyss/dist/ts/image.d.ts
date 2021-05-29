import { UnknownError } from "./common";
export declare enum ImageErrorCode {
    UPLOAD_FAILED = "UPLOAD_FAILED"
}
export declare class UploadFailedError extends UnknownError {
    code: ImageErrorCode;
    toString(): string;
}
