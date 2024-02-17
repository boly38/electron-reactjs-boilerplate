import {v4 as uuidv4} from 'uuid';
import ErrorConstants from './ErrorConstants.js';

const DEFAULT_SERVER_ERROR = "errorMsg.serverError";

export default class InternalServerError {
    constructor(userDetails = null) {
        this.errorUniqueId = generateUUID();
        this.code = ErrorConstants.SERVER_ERROR.code;
        this.status = 500;
        this.details = isSet(userDetails) ? userDetails : ErrorConstants.SERVER_ERROR.message;
    }
    getResponseBody() {
        return {
            code: this.code,
            details: this.details === null ? DEFAULT_SERVER_ERROR : this.details,
            id: this.errorUniqueId
        };
    }
}


//~ private
function generateUUID() {
    return uuidv4();
}

function isSet(value) {
    return (value !== null && value !== undefined && value !== "");
}