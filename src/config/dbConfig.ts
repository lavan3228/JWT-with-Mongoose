import mongoose from "mongoose";
import * as env from 'dotenv';
env.config();

const url: any = process.env.MONGOCONNECT;

mongoose.connect(url, () => {
    console.log("DB CONNECTED");
})


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