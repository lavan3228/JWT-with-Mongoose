import mongoose from "mongoose";

const modelName = 'Category';

const categorySchama: any = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, { timestamps: true }
);

export const categoryModel = mongoose.model(modelName, categorySchama);
