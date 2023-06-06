"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path = require('path');
require("./config/dbConfig");
const endpoints_1 = __importDefault(require("./routes/endpoints"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4002;
app.use(express_1.default.json());
// Getting data in json format
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
//Setting up cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use((0, cors_1.default)(corsOption));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello LAVANKUMAR!!");
});
// Listening at port 4002
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Importing Routes
app.use("/api", new endpoints_1.default().configureRoutes());
// Option to add, edit, view and delete all products in the store.
// Option to add items or remove items from the cart.
// Create cart for each user, add and remove items from the cart and also calculate the bill.
// const now = Math.floor(Date.now() / 1000);
// console.log(now, "epoch time"); 
// https://github.com/breellz/e-commerce-api
// https://documenter.getpostman.com/view/11784799/UVJhDEyt#8eb4b56a-149a-4279-b049-4e6565853c5f
// https://crazymonk.in/unisex-t-shirts/#
// https://dev.to/shubham1710/build-an-e-commerce-website-with-mern-stack-part-2-designing-the-models-38o8
