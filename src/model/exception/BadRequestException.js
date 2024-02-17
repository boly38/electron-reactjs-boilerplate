import ErrorConstants from './ErrorConstants.js';

export default class BadRequestException {
    constructor(userDetails = null) {
        this.code = ErrorConstants.BAD_REQUEST.code;
        this.status = 400;
        this.details = userDetails ? userDetails : ErrorConstants.BAD_REQUEST.message;
    }
}
