import * as mongoose from 'mongoose';
import crypto from 'crypto';
// import uuid from 'uuid';
// import { func } from 'joi';


const modelName = 'User';

const userSchema: any = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userInfo: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    },
}, { timestamps: true }
);

userSchema.method = {
    authenticate: function (plainpassword: any) {
        return this.securePassword(plainpassword) == this.encry_password;
    },

    securePassword: function (plainpassword: any) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex')
        } catch (err) {
            return "";
        }
    }
}

export const userModel = mongoose.model(modelName, userSchema);
