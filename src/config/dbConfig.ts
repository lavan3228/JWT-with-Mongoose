import mongoose from "mongoose";
import * as env from 'dotenv';
env.config();

const url: any = process.env.MONGOCONNECT;

mongoose.connect(url, () => {
    console.log("DB CONNECTED");
})