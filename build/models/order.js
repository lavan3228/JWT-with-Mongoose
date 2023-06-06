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
exports.orderModel = exports.productCart = void 0;
const mongoose = __importStar(require("mongoose"));
const productCartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productName: {
        type: String,
    },
    productQuantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number
    }
});
// 	productSize: String,
const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: { type: String },
    totalAmount: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    updated: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // paymentId: { type: String },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    cart: {
        type: Object,
        required: true
    },
}, { timestamps: true });
exports.productCart = mongoose.model("ProductCart", productCartSchema);
exports.orderModel = mongoose.model("Order", orderSchema);
