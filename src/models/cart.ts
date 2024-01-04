'use strict'
import * as mongoose from "mongoose";
// mongoose.pluralize(null);

const modelName = 'Cart';

const cartSchema: any = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        // ref: 'User'
    },
    items: [{
        productId: {
            type: String,
            required: true,
            // ref: 'Product'
        },
        imageUrl: {
            type: String,
            required: true
        }, 
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number,
        _id: false
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    },
    status: { type: Number, default: 1 },  // 1: Active, 2: Inactive
    created_date_time: { type: Date, default: Date.now },
    created_by: { type: String },
    modified_date_time: { type: Date, default: Date.now },
    modified_by: { type: String }

}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } }
);

// cartSchema.index({ patient_id: 1, test_code: 1, status: 1 });

export const cartModel = mongoose.model(modelName, cartSchema);
