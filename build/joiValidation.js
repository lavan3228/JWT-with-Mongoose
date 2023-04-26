"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class validation {
    constructor() {
        // 1. user validation
        this.createUserValidation = joi_1.default.object({
            username: joi_1.default.string().pattern(/^[a-z or A-Zor .]+$/).min(2).max(16).trim().required(),
            mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).required(),
            mail: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).min(5).required(),
            password: joi_1.default.string().min(6).max(16).required()
        });
        this.updateUserValidation = joi_1.default.object({
            username: joi_1.default.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().optional(),
            mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).optional(),
            mail: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).min(5).optional(),
            password: joi_1.default.string().min(6).max(16).optional()
        });
        // 2. author validation
        this.createAuthorValidation = joi_1.default.object({
            authorName: joi_1.default.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().required(),
            dob: joi_1.default.date().raw().required(),
            mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).required(),
            gender: joi_1.default.string().valid("male", "female").required(),
            authorBooks: joi_1.default.array().required()
        });
        this.updateAuthorValidation = joi_1.default.object({
            authorName: joi_1.default.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().optional(),
            dob: joi_1.default.date().raw().optional(),
            mobileNumber: joi_1.default.string().length(10).pattern(/^[0-9]+$/).optional(),
            gender: joi_1.default.string().valid("male", "female").optional(),
            authorBooks: joi_1.default.array().optional()
        });
        // 3. book validation 
        this.createBookValidation = joi_1.default.object({
            bookName: joi_1.default.string().min(2).max(64).trim().required(),
            authorId: joi_1.default.string().required(),
            price: joi_1.default.number().integer().min(200).max(1500).required(),
            rating: joi_1.default.number().min(1).max(5).required(),
            published: joi_1.default.boolean().required()
        });
        this.updateBookValidation = joi_1.default.object({
            bookName: joi_1.default.string().min(2).max(64).trim().optional(),
            authorId: joi_1.default.string().optional(),
            price: joi_1.default.number().integer().min(200).max(1500).optional(),
            rating: joi_1.default.number().min(1).max(5).optional(),
            published: joi_1.default.boolean().optional()
        });
    }
}
exports.default = new validation;
