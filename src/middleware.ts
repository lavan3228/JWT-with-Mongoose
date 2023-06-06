import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    let jwtToken;
    const authheader: any = req.headers["authorization"];
    if (authheader !== undefined) {
        jwtToken = authheader.split(" ")[1]
        console.log(authheader, "sflaml")
    }
    if (authheader === undefined) {
        res.send({
            status: 401,
            message: "Invalid Access Token"
        })
    } else {
        jwt.verify(jwtToken, process.env.ACCESS_TOKEN_PRIVATE_KEY, async (error: any, payload: any) => {
            if (error) {
                console.log(error, "jdj")
                res.send({
                    status: 401,
                    message: "Invalid Access Token"
                })
            } else {
                req.body.username = payload.username;
                next();
            }
        })
    }
}

export default authenticateToken;


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