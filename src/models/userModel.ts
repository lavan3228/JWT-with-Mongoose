import mongoose from "mongoose";

const userSchama:any = new mongoose.Schema({

    username: {type: String, required: true,unique: true, maxlength:32, trim: true},
    mobileNumber: {type: Number, trim:true, unique:true, length:10, required:true},
    mail: {type: String, trim:true, unique:true, required:true},
    password: {type: String, trim: true, required: true}
    
});

const User = mongoose.model("User", userSchama);

export default User;