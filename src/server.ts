import express, { Application, Request, Response } from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const path = require('path');
import "./config/dbConfig";
import EndPoints from "./routes/endpoints";

const app: Application = express();
const port: any = process.env.PORT || 4002;
app.use(express.json());

// Getting data in json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Setting up cors
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello LAVANKUMAR!!")
})


// Listening at port 4002
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});


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
