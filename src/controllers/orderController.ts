import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
// import express, { Application, } from "express";
import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
import { orderService } from "../service/orderService";
import { any } from "joi";
import { response } from '../utils/response';

// router.get('/order/:id',orderController.get_orders);
// router.post('/order/:id',orderController.checkout);

class OrderController {

    // create order
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

    getAllOrders = async (req, res) => {
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

    history = async (req, res) => {
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
