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
    const token = req.header('x-auth-token');
    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (error, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.log(error, "jdj");
            res.send({
                status: 401,
                message: "Invalid Access Token"
            });
        }
        else {
            console.log(payload, "fjkf");
            req.user_id = payload._id;
            console.log(req.user_id, "dbhejjd");
            next();
        }
    }));
};
exports.default = authenticateToken;
// const auth = async (req,res,next) =>{
//     const token = req.header('x-auth');
//     if(!token){
//         return res.status(400).send('Token Not Found');
//     }
// try{
//     jwt.verify(
//         token,
//         'jwtSecret',
//         (error,decode) =>{
//             if(error){
//                 return res.status(401).json({msg:'Token not valid'})
//             }
//             else{
//                 req.user = decode.user;
//                 next();
//             }
//         }
//     )   
// }
// catch(err){
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error' });
// }
// }
// module.exports = auth;
