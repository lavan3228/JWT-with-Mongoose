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
exports.userModel = void 0;
const mongoose = __importStar(require("mongoose"));
const { isEmail } = require('validator');
const modelName = 'User';
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    mobileNumber: {
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
        required: [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length must be 6 characters']
    },
    // confirmpassword : {
    //     type: String,
    //     required: [true, 'Please enter a valid password'],
    //     minlength: [6, 'Minimum password length must be 6 characters']
    // },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    },
    // gender: {type: String, reuired: true},
    // address: {type: String, required: true},
    // dateOfBirth: {type: Date, required: true},
    // city: {type: String, required: true}
    // pincode: {type: String, required: true},
    created_date_time: { type: Date, default: Date.now },
    created_by: { type: String },
    modified_date_time: { type: Date, default: Date.now },
    modified_by: { type: String }
}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } });
// userSchema.method = {
//     authenticate: function (plainpassword: any) {
//         return this.securePassword(plainpassword) == this.encry_password;
//     },
//     securePassword: function (plainpassword: any) {
//         if (!plainpassword) return "";
//         try {
//             return crypto
//                 .createHmac('sha256', this.salt)
//                 .update(plainpassword)
//                 .digest('hex')
//         } catch (err) {
//             return "";
//         }
//     }
// }
exports.userModel = mongoose.model(modelName, userSchema);
// username : String,
// userImage: String
// city: String,
// state: String,
// country: String,
