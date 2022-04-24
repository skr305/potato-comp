import { ServerErrorCode } from "./error-code";

export default class ServerError<T> {
    data: T;
    errorCode: ServerErrorCode;
    constructor( data: T, errorCode = ServerErrorCode.UNKNOWN ) {
        this.data = data;
        this.errorCode = errorCode;
    }
};