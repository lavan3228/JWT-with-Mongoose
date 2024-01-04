import * as mongoose from 'mongoose';
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
    
}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } }
);

export const productModel = mongoose.model(modelName, productSchema);
