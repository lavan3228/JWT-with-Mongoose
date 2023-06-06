import * as mongoose from 'mongoose';

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

export const productCart = mongoose.model("ProductCart", productCartSchema)
export const orderModel = mongoose.model("Order", orderSchema);
