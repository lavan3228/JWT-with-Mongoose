"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchama = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true, maxlength: 32, trim: true },
    mobileNumber: { type: Number, trim: true, unique: true, length: 10, required: true },
    mail: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, required: true }
});
const User = mongoose_1.default.model("User", userSchama);
exports.default = User;
