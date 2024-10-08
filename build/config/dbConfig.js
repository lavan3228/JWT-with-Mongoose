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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env = __importStar(require("dotenv"));
env.config();
const url = process.env.MONGOCONNECT;
mongoose_1.default.connect(url, () => {
    console.log("DB CONNECTED");
});
// const connectDB = async (req,res)=>{
//     try{
//         await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.iuu8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex : true,
//             useFindAndModify:false
//         });
//         console.log('DB connected')
//     }
//     catch(err){
//         console.log(err.message);
//         process.exit(1);
//     }
// }
// module.exports = connectDB;
// default.json
// {
//     "mongoURI":
//       "mongodb+srv://mern123:<password>@mernatoz-9kdpd.mongodb.net/test?retryWrites=true&w=majority"
//   }
//    /* Replace <password> with your database password */
//   // db.js
//   const mongoose = require('mongoose');
//   const config = require('config');
//   const db = config.get('mongoURI');
//   const connectDB = async () => {
//     try {
//       mongoose.set('strictQuery', true);
//       await mongoose.connect(db, {
//         useNewUrlParser: true,
//       });
//       console.log('MongoDB is Connected...');
//     } catch (err) {
//       console.error(err.message);
//       process.exit(1);
//     }
//   };
//   module.exports = connectDB;
