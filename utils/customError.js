class customError extends Error{

    constructor(status = 500, message = "Something went wrong!", details = null, code = null) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.message = message;
        this.details = details;
        this.code = code;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.timestamp = new Date().toISOString();
    }
}

module.exports = customError