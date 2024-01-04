const multer = require('multer');
const fs = require('fs');
// import * as AWS from 'aws-sdk';

// const app = express();
const upload = multer({ dest: 'uploads/' });

import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import multer from "multer";

const path = require('path');
import "./config/dbConfig";
import EndPoints from "./routes/endpoints";

const app = express();
const port: any = process.env.PORT || 4002;

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

/////////////////////

// const encryptionHelper = await aes256.createCipher('aes256', key);
// const filePassword = await encryptionHelper.decrypt(password);
// console.log(filePassword, "mfjd")

////////////////////////

// const encryptionHelper = aes256.createCipher(key);
// const decryptedPassword = encryptionHelper.decrypt(password);

// console.log("jdjdkd", decryptedPassword, "dndjfkj");

///////////////////////////


// console.log("lk elk sid sid sid mani charan gani pawan laddu");
// Listening at port 4002
// * Server Activation
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});

const awsRegion = process.env.BUCKET_REGION_NAME;

// AWS.config.getCredentials((err) => {
//   if (err) {
//       console.log('Error in fetching credentials', err);
//   } else {
//       AWS.config.credentials;
//   }
// });
// AWS.config.update({ region: awsRegion });
// const s3 = new AWS.S3({});

// AWS.config.getCredentials(function (err) {
//   if (err) {
//       log.error('Invoice - Error in fetching credentials', err)
//   }
//   else {
//       const awsCredentials: any = AWS.config.credentials;
//       awsAccessKey = awsCredentials.accessKeyId;
//       awsSecretKey = awsCredentials.secretAccessKey;
//   }
// });

// const config = {
//   provider: 'amazon',
//   keyId: awsAccessKey,
//   key: awsSecretKey,
//   region: awsRegion
// }


// Importing Routes
app.use("/api", new EndPoints().configureRoutes());




// Option to add, edit, view and delete all products in the store.
// Option to add items or remove items from the cart.
// Create cart for each user, add and remove items from the cart and also calculate the bill.

// const now = Math.floor(Date.now() / 1000);
// console.log(now, "epoch time"); 

// https://github.com/breellz/e-commerce-api
// https://documenter.getpostman.com/view/11784799/UVJhDEyt#8eb4b56a-149a-4279-b049-4e6565853c5f
// https://crazymonk.in/unisex-t-shirts/#

// https://dev.to/shubham1710/build-an-e-commerce-website-with-mern-stack-part-2-designing-the-models-38o8


// https://github.com/lavan3228/JWT-with-Mongoose/blob/main/src/routes/endpoints.ts



// const express = require('express');
// const connectDB = require('./config/db');

// const app = express();

// // Connect Database
// connectDB();

// app.get('/', (req, res) => res.send('Hello world!'));

// const port = process.env.PORT || 8082;

// app.listen(port, () => console.log(`Server running on port ${port}`));
