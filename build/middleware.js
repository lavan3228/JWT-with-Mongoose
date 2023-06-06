"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    let jwtToken;
    const authheader = req.headers["authorization"];
    if (authheader !== undefined) {
        jwtToken = authheader.split(" ")[1];
        console.log(authheader, "sflaml");
    }
    if (authheader === undefined) {
        res.send({
            status: 401,
            message: "Invalid Access Token"
        });
    }
    else {
        jsonwebtoken_1.default.verify(jwtToken, process.env.ACCESS_TOKEN_PRIVATE_KEY, (error, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error, "jdj");
                res.send({
                    status: 401,
                    message: "Invalid Access Token"
                });
            }
            else {
                req.body.username = payload.username;
                next();
            }
        }));
    }
};
exports.default = authenticateToken;
// const config = require('config');
// const jwt = require('jsonwebtoken');
// function auth(req, res, next) {
//     const token = req.header('x-auth-token');
//     // Check for token
//     if(!token){
//         return res.status(401).json({ msg: 'No token, authorization denied'});
//     }
//     try{
//         // Verify token
//         const decoded = jwt.verify(token, config.get('jwtsecret'));
//         //Add user from payload
//         req.user = decoded;
//     next();
//     } catch(e){
//         res.status(400).json({ msg:'Token is not valid'});
//     }
// }
// module.exports = auth;
