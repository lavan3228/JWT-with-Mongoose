import express, { Application, Request, Response } from "express";
import User from "../models/userModel";
import validation from "../joiValidation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const app:Application = express();

app.use(express.json());

class userApiCalls {
    
    // 1. get all users
    allUsers = async (req:Request, res:Response) =>{
        try{
            const records = await User.find()
            res.send({
                status:200,
                message:"Success",
                data: records
            })
        }catch(error:any){
            res.send({
                status:500,
                message: error.message
            })
        }
    }

    // 2.get single user 
    getUser = async (req:Request, res:Response) =>{
        try{
            const _id = req.params.id;
            let getUser;
                if (_id.endsWith(".com")) {
                    getUser = await User.findOne({mail:_id})
                } else if (_id.length === 10) {
                    getUser = await User.findOne({mobileNumber:_id})
                } else if (_id.length === 24 ) {
                    getUser = await User.findOne({_id:_id})
                } else {
                    getUser = await User.findOne({username:_id})
                }
            
            if (!getUser) {
                res.send({
                    status: 400,
                    message:"user not exists"
                    })
            } else {
                res.send({
                    status: 200,
                    message:"Success",
                    data: getUser
                    })
            }
            
        }catch(err){
            res.send({
                status: 404,
                message:"User not existed"
            })
        }
    }

    // 3.create user
    createUser = async (req:Request, res:Response) =>{
        try{
            const { username, mobileNumber, mail, password } = await validation.createUserValidation.validateAsync(req.body)
            const hashedPassword = await bcrypt.hash(password, 10);

            const postuser = await User.create({
                username:username,
                mobileNumber:mobileNumber,
                mail: mail,
                password: hashedPassword
            })
            const data = await postuser.save()
            res.send({
                status: 201,
                message: "Success",
                data: data
            })
        }catch(error:any) {
            res.send({
                status: 400,
                message: error.message
            });
        }
    }

    // 4. login user
    loginUser = async (req: Request, res: Response) => {
        try{
            const {username, password} = req.body;
            const dbUser:any = await User.findOne({username:username}); 
            if (dbUser === undefined) {
                res.send({
                    status: 400,
                    message: "Invalid User"
                })
            }else {
                const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
                if(isPasswordMatched === true) {
                    const payload = {username:username};
                    const jwtToken = jwt.sign(payload, "djsdbsbcnxnhbwdhj");
                    res.send({jwtToken})
                }else {
                    res.send({
                        status: 400,
                        message: "Incorrect Password"
                    })
                }
            }
        }catch(err:any){
            console.log(err)
            res.send({
            status: 400,
            message: err.message
            })
        }    
    }

    // 5. update user
    updateUser = async (req:Request, res:Response)=>{
        try{
            const _id = req.params.id;
            const result = await validation.updateUserValidation.validateAsync(req.body);
            const getUser = await User.findByIdAndUpdate(_id, result, {
                new: true
            });
            res.send({
                status: 200,
                message:"Success",
                data: getUser 
            })
        }catch(error:any){
            res.send({
                status: 400,
                message: error.message
            })
        }
    }

    // 6. delete user by id
    deleteUser = async (req:Request, res:Response) =>{
        try{
            const deleteUser = await User.findByIdAndDelete(req.params.id)
            if (!deleteUser) {
                res.send({
                    status: 400,
                    message: "user not exists"
                })
            }
            res.send({
                status: 200,
                message: "Success",
                data: deleteUser
            })
        }catch(err:any){
            res.send({
                status: 400,
                message: err.message
            })
        }
    }

    // 7. login user profile 
    loginUserProfile = async(req:Request, res: Response)=> {
        let { username } = req.body;
        const user = await User.findOne({username:username})
        res.send({
            status: 200,
            message:"Success",
            data: user
        });
    }

}


export = new userApiCalls;

