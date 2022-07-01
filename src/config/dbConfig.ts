import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Project_with_mongo")
   .then(() => {
    console.log("connection Successfull");
}).catch((error:any) => {
    console.log(error);
})
