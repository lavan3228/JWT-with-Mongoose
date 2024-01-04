"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const modelName = 'Category';
// const subcats = new Schema({name: String});
const categorySchama = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        minlength: 3,
        unique: true
    },
    // subCategories: [subcats],
    // description: {
    //     type: String,
    //     required: false, 
    //     trim: true,
    //     minlength:5
    // },
    created_date_time: { type: Date, default: Date.now },
    created_by: { type: String },
    modified_date_time: { type: Date, default: Date.now },
    modified_by: { type: String }
}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } });
exports.categoryModel = mongoose_1.default.model(modelName, categorySchama);
