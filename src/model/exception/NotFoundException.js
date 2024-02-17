import ErrorConstants from './ErrorConstants.js';

export default class NotFoundException {
    constructor(userDetails = null) {
        this.code = ErrorConstants.NOT_FOUND.code;
        this.status = 404;
        this.details = userDetails ? userDetails : ErrorConstants.NOT_FOUND.message;
    }
}

