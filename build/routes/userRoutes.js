"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const userContoller_1 = __importDefault(require("../controllers/userContoller"));
const router = express_1.default.Router();
router.get("/allUsers", userContoller_1.default.allUsers);
router.get("/getUser/:id", userContoller_1.default.getUser);
router.post("/create", userContoller_1.default.createUser);
module.exports = router;
