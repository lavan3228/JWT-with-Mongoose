"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerFactory = void 0;
const logger_1 = require("./logger");
// 
class LoggerFactory {
    /**
     * Get logger function instance
     */
    getLogger(className) {
        return new logger_1.logger(className);
    }
}
exports.loggerFactory = new LoggerFactory();
