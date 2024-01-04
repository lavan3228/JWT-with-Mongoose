import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, async (error: any, payload: any) => {
        if (error) {
            console.log(error, "jdj")
            res.send({
                status: 401,
                message: "Invalid Access Token"
            })
        } else {
            console.log(payload, "fjkf");

            req.user_id = payload._id;
            console.log(req.user_id, "dbhejjd")
            next();
        }
    })
}


export default authenticateToken;


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