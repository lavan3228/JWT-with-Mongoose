"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// import techRoute from "./routes/tech";
require("./config/dbConfig");
const app = (0, express_1.default)();
const port = 4002;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello LAVANKumar!!");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use("/api", userRoutes_1.default);
// app.use("/tech", techRoute);
