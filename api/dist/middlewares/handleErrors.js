"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleErrors = (error, request, res, next) => {
    console.error("message: -------", error.message);
    const { message } = error;
    if (message.includes("ValidationError")) {
        res.status(409).send({
            error: message,
        });
    }
    else if (message ===
        "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters") {
        res.status(404).json({
            error: "Not found",
        });
    }
    else {
        res.status(500).end();
    }
};
exports.default = handleErrors;
//# sourceMappingURL=handleErrors.js.map