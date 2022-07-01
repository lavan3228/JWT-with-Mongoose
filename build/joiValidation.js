"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class validation {
    constructor() {
        this.createUserValidation = joi_1.default.object({
            username: joi_1.default.string().pattern(/^[a-z or A-Z]+$/).min(2).max(16).required(),
            mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).required(),
            mail: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).max(16).required()
        });
        this.updateUserValidation = joi_1.default.object({
            username: joi_1.default.string().pattern(/^[a-z or A-Z]+$/).min(2).max(16).optional(),
            mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).optional(),
            mail: joi_1.default.string().email().optional(),
            password: joi_1.default.string().min(6).max(16).optional()
        });
        // createTechValidation = Joi.object({
        //         technology:Joi.string().min(2).max(16).required(),
        //         role:Joi.string().required()
        //     });
        // updateTechValidation = Joi.object({
        //         technology:Joi.string().min(2).max(16).optional(),
        //         role:Joi.string().optional()
        //     });      
    }
}
exports.default = new validation;
