'use strict';
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
exports.orderModel = void 0;
const mongoose = __importStar(require("mongoose"));
// mongoose.pluralize(null);
// mongoose.set('strictQuery', false);
//mongoose.set('useFindAndModify', false);
// import { orderTestModel } from './orderTest';
// import { patientModel } from './patient';
const productCartSchema = new mongoose.Schema({
    productId: {
        type: String,
        // ref: "Product",
        required: true
    },
    productName: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
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
    userId: {
        type: String,
        // ref: "User"
        required: true
    },
    // paymentId: { type: String },
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    actual_amount: { type: Number, default: 0 }, // total tests amount
    amount_after_discount: { type: Number, default: 0 }, // after deduct promo code and discount amount
    paid_amount: { type: Number, default: 0 },
    refund_amount: { type: Number, default: 0 },
    // status: { type: Number, default: 0 },   // order status like draft, pending, completed, cancelled, report generated
    report_generated_time: { type: Date }, // report generated time
    payment_status: { type: Number, default: 1 }, // payment status of an order like pending or completed,
    is_cash_on_collection: { type: Boolean, default: false },
    created_user_role: { type: String },
    created_date_time: { type: Date, default: Date.now },
    created_by: { type: String },
    modified_date_time: { type: Date },
    modified_by: { type: String },
    invoice_account: { type: String },
    is_franchise: { type: Boolean, default: 0 },
    vendor_code: { type: String },
    // cart: {
    //     type: Object,
    //     required: true
    // },
    // deliveredAt: Date,
    // shippedAt: Date,
    // paidAt: {
    //     type: Date,
    //     required: true
    // },
}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } });
// export const productCart = mongoose.model("ProductCart", productCartSchema);
exports.orderModel = mongoose.model("Order", orderSchema);
