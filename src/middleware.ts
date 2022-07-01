import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
    let jwtToken;
        const authheader:any = req.headers["authorization"];
        if (authheader !== undefined) {
            jwtToken = authheader.split(" ")[1]
        }
        if (authheader === undefined) {
            res.send({
                status: 401,
                message:"Invalid Access Token"
            })
        }else {
            jwt.verify(jwtToken, "djsdbsbcnxnhbwdhj" , async(error:any, payload:any)=> {
                if (error){
                    res.send({
                        status: 401,
                        message:"Invalid Access Token"
                    })
                }else{ 
                   //req.body.username = payload.username; 
                   next();
                }
            })    
        }
}

export default authenticateToken;


