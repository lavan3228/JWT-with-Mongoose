import * as mongoose from 'mongoose';

const productCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
    },
    count: {
        type: Number
    },
    price: {
        type: Number
    }
});

const orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: { type: String },
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    updated: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    }
}, { timestamps: true });

// export const productCart = mongoose.model("ProductCart", productCartSchema)
export const orderModel = mongoose.model("Order", orderSchema);
