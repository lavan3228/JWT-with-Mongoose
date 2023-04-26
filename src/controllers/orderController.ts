import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
// import express, { Application, } from "express";
import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
import { orderService } from "../service/orderService";
import { any } from "joi";
import { response } from '../utils/response';

class OrderController {

    // 3.create author
    createOrder = async (req, res) => {
        try {
            console.log("ehrfj")
            const payload = req.body.attributes;
            const saveOrderData = {
                transaction_id: payload.transaction_id,
                amount: payload.amount,
                address: payload.address
            };
            const orderData = await orderService.save(saveOrderData);

            if (!orderData) {
                return response.error(req, res, {}, "Error in save order data")
            }

            return response.send(req, res, orderData, "SUCCESS")
        } catch (err: any) {
            console.log(err, "**********")
            return response.error(req, res, err, "Something Went Wrong")
        }
    }
}

export const orderController = new OrderController();
