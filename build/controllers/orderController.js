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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const loggerFactory_1 = require("../utils/logger/loggerFactory");
const log = loggerFactory_1.loggerFactory.getLogger('orderController');
// import validation from "../joiValidation";
// import Author from "../models/category";
const orderService_1 = require("../service/orderService");
const response_1 = require("../utils/response");
// router.get('/order/:id',orderController.get_orders);
// router.post('/order/:id',orderController.checkout);
class OrderController {
    constructor() {
        // 3.create author
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("ehrfj");
                const payload = req.body.attributes;
                const saveOrderData = {
                    transaction_id: payload.transaction_id,
                    amount: payload.amount,
                    address: payload.address
                };
                const orderData = yield orderService_1.orderService.save(saveOrderData);
                if (!orderData) {
                    return response_1.response.error(req, res, {}, "Error in save order data");
                }
                return response_1.response.send(req, res, orderData, "SUCCESS");
            }
            catch (err) {
                console.log(err, "**********");
                return response_1.response.error(req, res, err, "Something Went Wrong");
            }
        });
    }
}
exports.orderController = new OrderController();
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
