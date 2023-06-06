import mongoose from "mongoose";
const modelName = 'Cart';

const cartSchama: any = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
});

export const cartModel = mongoose.model(modelName, cartSchama);
 