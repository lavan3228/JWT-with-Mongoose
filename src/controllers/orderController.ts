'use strict';
import * as _ from "lodash";
import * as moment from 'moment';
import { uuid } from 'uuidv4';
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
// import express, { Application, } from "express";
import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
import { orderService } from "../service/orderService";
import { any } from "joi";
import { response } from '../utils/response';
import { common } from '../utils/common';
// router.get('/order/:id',orderController.get_orders);
// router.post('/order/:id',orderController.checkout);

class OrderController {

    // create order
    createOrder = async (req, res) => {
        try {
            console.log("ehrfj")
            const payload = req.body;
            const user_id = req.user_id;
            const saveOrderData = {
                products: payload.products,
                transaction_id: payload.transaction_id,
                amount: payload.amount,
                totalAmount: payload.totalAmount,
                userId: user_id,
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

    getAllOrders = async (req, res) => {
        try {
            console.log("get Orders start")
            const user_id = req.user_id;
            const orderCondition = {
                userId: user_id
            };
            const orderData = await orderService.find(orderCondition);
            console.log(orderData, 'fnfhd7');
            

            if (!orderData) {
                return response.error(req, res, {}, "Error when getting  all orders data")
            }

            return response.send(req, res, orderData, "SUCCESS")
        } catch (err: any) {
            console.log(err, "**********")
            return response.error(req, res, err, "Something Went Wrong")
        }
    }


    // get order
    updateOrderStatus = async (req, res) => {
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

    getOrderById = async (req, res) => {
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

    cancelOrder = async (req, res) => {
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

    /**
     * order history details
     * @param req 
     * @param res 
     * @returns 
     */
    history = async (req, res) => {
        try {
            const condition = {
                _id: req.query.orderId,
                // status: orderStatus.PENDING,
            };

            const page = Number(req.query.page);
            const size = Number(req.query.size);

            const options = {
                limit: size, skip: (page - 1) * size, sort: { modified_date_time: -1 }
            };

            const list: any = await orderService.getOrderDetails(condition, options);
            list.page = page;
            list.size = size;
            return response.send(req, res, list, 'SUCCESS');

        } catch (err) {
            return response.error(req, res, { message: err }, 'SOME-THING-WENT-WRONG');
        }
    }

    orderTrack = async (req, res) => {
        try {
            if (!common.isValid(req.query.id)) {
                log.error('Order id not provided' + req.query.id);
                return response.error(req, res, {}, 'INVALID-INPUTS');
            }

            const condition = {
                _id: (req.query.id)
            };

            let result: any = await orderService.orderTracking(condition);

            result = JSON.parse(JSON.stringify(result));

            const finalTests: any = [];

            const testData = result.test_info;

            if (testData.length) {
                await testData.map(async (test) => {

                    // const allowedStatus = [testStatus['ACTIVE'], testStatus['CANCELLED']];

                    // if (allowedStatus.includes(test.status) && (test.is_supplementary_item === 0 || test.is_supplementary_test === 0 ||
                    //     (test.is_supplementary_test === undefined && test.is_supplementary_item === undefined))) {
                    //     finalTests.push(test);
                    // }

                });
            }

            result.test_info = finalTests;

            // getting map_link from order_status
            if (result.order_unique_id) {
                // Condition
                const orderStatusCondition: any = {
                    order_id: result.order_unique_id,
                    // status_name: order_status_name['PHLEBO_STARTED']
                }

                const options = {
                    sort: { created_date_time: -1 }
                };

                const projection = { map_link: 1 };

                const orderStatus: any = await orderService.getOrderStatus(orderStatusCondition, projection, options);
                // log.info('Order Status result', JSON.stringify(orderStatus));
                if (!_.isEmpty(orderStatus)) {
                    result.map_link = (orderStatus.map_link) ? orderStatus.map_link : "";
                }
            }
            return response.send(req, res, result, 'SUCCESS');

        } catch (err) {
            return response.error(req, res, { message: err }, 'SOME-THING-WENT-WRONG');
        }
    }
}

export const orderController = new OrderController();

// module.exports.get_orders = async (req,res) => {
//     const userId = req.params.id;
//     Order.find({userId}).sort({date:-1}).then(orders => res.json(orders));
// }

// module.exports.checkout = async (req,res) => {
//     try{
//         const userId = req.params.id;
//         const {source} = req.body;
//         let cart = await Cart.findOne({userId});
//         let user = await User.findOne({_id: userId});
//         const email = user.email;
//         if(cart){
//             const charge = await stripe.charges.create({
//                 amount: cart.bill,
//                 currency: 'inr',
//                 source: source,
//                 receipt_email: email
//             })
//             if(!charge) throw Error('Payment failed');
//             if(charge){
//                 const order = await Order.create({
//                     userId,
//                     items: cart.items,
//                     bill: cart.bill
//                 });
//                 const data = await Cart.findByIdAndDelete({_id:cart.id});
//                 return res.status(201).send(order);
//             }
//         }
//         else{
//             res.status(500).send("You do not have items in cart");
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// }
