"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = void 0;
class ErrorModel extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=error-model.js.map