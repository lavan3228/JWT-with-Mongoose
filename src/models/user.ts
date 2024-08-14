import * as mongoose from 'mongoose';
const { isEmail } = require('validator');
const modelName = 'User';

const userSchema: any = new mongoose.Schema({
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
        default: 1
    },

    // role: {
    //     type: String,
    //     default: ROLES.Member,
    //     enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant]
    //   },
    purchases: {
        type: Array,
        default: []
    },

    // gender: {type: String, reuired: true},
    // address: {type: String, required: true},
    // dateOfBirth: {type: Date, required: true},
    // state: {type: String, required: true},
    // city: {type: String, required: true},
    // pincode: {type: Number, required: true},
    created_date_time: { type: Date, default: Date.now },
    created_by: { type: String },
    modified_date_time: { type: Date, default: Date.now },
    modified_by: { type: String }

}, { timestamps: { createdAt: 'created_date_time', updatedAt: 'modified_date_time' } }
);

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

export const userModel = mongoose.model(modelName, userSchema);

// username : String,
// userImage: String

// city: String,
// state: String,
// country: String,