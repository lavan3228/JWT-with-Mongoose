"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// import userRoute from "./routes/userRoute";
// import authorRoute from "./routes/authorRoute";
// import bookRoute from "./routes/bookRoute";
require("./config/dbConfig");
const endpoints_1 = __importDefault(require("./routes/endpoints"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4002;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello LAVANKumar!!");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use("/api", new endpoints_1.default().configureRoutes());
