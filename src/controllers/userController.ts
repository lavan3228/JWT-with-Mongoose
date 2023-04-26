import express, { Application } from "express";
import { userModel } from "../models/user";
import validation from "../joiValidation";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
import { userService } from "../service/userService";
import { Index } from "../service";
import { orderService } from '../service/orderService';
import { response } from '../utils/response';


const app: Application = express();
app.use(express.json());

class UserController {

    // 1. get all Users
    allUsers = async (req, res) => {
        try {
            console.log("jejwjeh")
            const allUsers: any = await orderService.find({});
            
            if (!allUsers || allUsers.length <= 0) {
                return response.error(req, res, {}, "USER DETAILS NOT FOUND");
            }

            // const count = await userService.countAll();
            return response.send(req, res, {}, "USER DETAILS NOT FOUND");
        } catch (error: any) {
            return response.error(req, res, {}, "SOMETHING WENT WRONG")
        }
    }

    // 2.get single author 
    getUser = async (req, res) => {
        try {
            const id = req.params.id;
            const getUser = await userService.find({_id: id});

            if (!getUser) {
                return response.error(req, res, {}, "User not found")
            }

            return response.send(req, res, getUser, "SUCCESS")
        } catch (err) {
            return response.error(req, res, {}, "SOMETHING WENT WRONG")
        }
    }

    // 3.create user
    createUser = async (req, res) => {
        try {
            console.log("ehrfj")
            const result = req.body;
            const author = await userModel.create({
                name: result.name,
                lastname: result.lastname,
                email: result.email,
                userInfo: result.userInfo,
                password: result.password,
                salt: result.salt,
                role: result.role
            });
            const data = await author.save()
            res.send({
                status: 201,
                message: "Success",
                data: data
            })
        } catch (error: any) {
            res.send({
                status: 400,
                message: error.message

            });
        }
    }

    // 4. update author
    // updateAuthor = async (req:Request, res:Response)=>{
    //     try{
    //         const _id = req.params.id;
    //         const result = await validation.updateAuthorValidation.validateAsync(req.body);
    //         const getAuthor = await Author.findByIdAndUpdate(_id, result, {
    //             new: true
    //         });
    //         res.send({
    //             status: 200,
    //             message:"Success",
    //             data: getAuthor 
    //         })
    //     }catch(error:any){
    //         res.send({
    //             status: 400,
    //             message: error.message
    //         })
    //     }
    // }

    // // 5. delete author by id
    // deleteAuthor = async (req:Request, res:Response) =>{
    //     try{
    //         const deleteAuthor = await Author.findByIdAndDelete(req.params.id)
    //         if (!deleteAuthor) {
    //             res.send({
    //                 status: 400,
    //                 message: "Author not exists",
    //             })
    //         }
    //         res.send({
    //             status: 200,
    //             message: "Success",
    //             data: deleteAuthor
    //         })
    //     }catch(err:any){
    //         res.send({
    //             status: 400,
    //             message: err.message,
    //         })
    //     }
    // }
}


export const userController = new UserController();
