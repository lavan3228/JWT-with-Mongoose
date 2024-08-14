"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose = __importStar(require("mongoose"));
const modelName = 'Product';
const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        // ref: 'User'
    },
    productName: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: String,
        // ref: "Category",
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    // img: {type:String, required: true},
    // quantity: {type:String, required: true},
    // size: {type:String, required: true},
    // meterial: {type:String, required: true},
    // discount:{
    //     type:Number,
    //     default: 0
    // },
    // category: {
    //     type: String,
    //     required: [true, "Please enter product category"]
    // },
    // stock: {
    //     type: Number,
    //     required: [true, "Please enter product stock"],
    //     maxlength: [4, "Stock cannot exceed limit"],
    //     default: 1
    // },
    status: { type: Number, default: 1 }, // 1- Active, 2-Inactive, 3 -Cancelled
    created_date_time: { type: Date, default: Date.now },
    created_by: { type: String },
    modified_date_time: { type: Date, default: Date.now },
    modified_by: { type: String }
}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } });
exports.productModel = mongoose.model(modelName, productSchema);
