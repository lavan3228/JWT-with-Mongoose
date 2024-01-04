import mongoose, { Schema } from "mongoose";

const modelName = 'Category';

// const subcats = new Schema({name: String});

const categorySchama: any = new mongoose.Schema({
    name: { // in the name place use category
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        minlength:3,
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
    
}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } }
);

export const categoryModel = mongoose.model(modelName, categorySchama);
