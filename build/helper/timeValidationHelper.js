"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeValidationHelper = void 0;
const moment_1 = __importDefault(require("moment"));
class TimeValidationHelper {
    constructor() {
        /**
         * Checking time difference between 2 times
         */
        this.isValidTime = (from_time, to_time) => __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = (0, moment_1.default)().format('YYYY-MM-DD');
                const startDate = new Date(`${currentDate} ${from_time}`);
                const endDate = new Date(`${currentDate} ${to_time}`);
                const differenceInMilliseconds = (endDate - startDate);
                return (differenceInMilliseconds <= 0) ? { status: false } : { status: true };
            }
            catch (err) {
                return { status: false, message: err.message };
            }
        });
    }
}
exports.timeValidationHelper = new TimeValidationHelper();
