import { cartModel } from "../models/cart";
import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('CartController');
import { cartService } from "../service/cartService";
import { common } from "../utils/common";
import { response } from "../utils/response";
import moment from 'moment';
import { cartStatus } from "../utils/enumValues";
import { orderService } from "../service/orderService";
import { productService } from "../service/productService";

class CartController {

    /**
     * To add item in cart
     * @param req 
     * @param res 
     * @returns 
     */
    addToCart = async (req, res) => {
        try {
            log.info({ jsonObject: req.body.attributes, description: 'Payload of add cart payload' });
            console.log('lavansjgxsax', req.body.attributes);
            const payload: any = req.body.attributes;
            const data: any = {
                userId: req.user_id,
                "items.productId": payload.items[0].productId
            }

            console.log(data, "dd3");

            // Check if the product is already in the cart
            let cartItem: any = await cartService.find(data);
            console.log(cartItem, "data came1")

            payload['created_date_time'] = moment().format();
            payload['created_by'] = req.user_id;

            if (cartItem) {
                // Update the quantity if the product is already in the cart
                console.log(cartItem.items[0].quantity, "jjsjsj")
                cartItem.items[0].quantity += payload.items[0].quantity;
                cartItem.items[0].price += payload.items[0].price;
                cartItem.bill += payload.bill;
                // return response.send(req, res, cartItem, "Success");
            } else {
                // no cart exists, create one
                console.log(payload, "payload")
                cartItem = {
                    userId: payload.userId,
                    items: payload.items,
                    bill: payload.bill
                }
            }
            let condition: any = {};
            if (cartItem) {
                condition.userId = req.user_id;
                condition["items.productId"] = cartItem.items[0].productId
            };

            console.log(cartItem, condition, "pay items")

            const newCart = await cartService.saveInCart(cartItem, condition);
            console.log(newCart, "dbdh");
            if (!newCart) {
                return response.error(req, res, {}, "error in save cart")
            }

            return response.send(req, res, newCart, "Success");
        }
        catch (error) {
            console.log(error, "*****");
            log.error({ jsonObject: error, description: 'Error in add cart catch block' });
            return response.error(req, res, { error }, "Something went wrong");
        }
    }

    moveToWichList = async (req, res) => {
        try {
            log.info({ jsonObject: req.body.attributes, description: 'Payload of add cart payload' });
            console.log('lavansjgxsax', req.body.attributes);
            const payload: any = req.body.attributes;
            const data: any = {
                userId: req.user_id,
                "items.productId": payload.items[0].productId
            }

            console.log(data, "dd3");

            // Check if the product is already in the cart
            let cartItem: any = await cartService.find(data);
            console.log(cartItem, "data came1")

            payload['created_date_time'] = moment().format();
            payload['created_by'] = req.user_id;

            if (cartItem) {
                // Update the quantity if the product is already in the cart
                console.log(cartItem.items[0].quantity, "jjsjsj")
                cartItem.items[0].quantity += payload.items[0].quantity;
                cartItem.items[0].price += payload.items[0].price;
                cartItem.bill += payload.bill;
                // return response.send(req, res, cartItem, "Success");
            } else {
                // no cart exists, create one
                console.log(payload, "payload")
                cartItem = {
                    userId: payload.userId,
                    items: payload.items,
                    bill: payload.bill
                }
            }
            let condition: any = {};
            if (cartItem) {
                condition.userId = req.user_id;
                condition["items.productId"] = cartItem.items[0].productId
            };

            console.log(cartItem, condition, "pay items")

            const newCart = await cartService.saveInCart(cartItem, condition);
            console.log(newCart, "dbdh");
            if (!newCart) {
                return response.error(req, res, {}, "error in save cart")
            }

            return response.send(req, res, newCart, "Success");
        }
        catch (error) {
            console.log(error, "*****");
            log.error({ jsonObject: error, description: 'Error in add cart catch block' });
            return response.error(req, res, { error }, "Something went wrong");
        }
    }

    /**
     * Remove item from cart
     * @param req 
     * @param res 
     * @returns 
     */
    removeFromCart = async (req, res) => {
        console.log("remove cart start")
        try {
            const payload = req.body.attributes;
            log.info({ jsonObject: payload, description: 'Payload of removed test ' });

            const condition = { userId: req.user_id, "items.productId": payload.items[0].productId, status: cartStatus['ACTIVE'] };

            log.info({ jsonObject: condition, description: 'Condition for removed test' });


            // Check test exist in cart or not
            const itemDetails: any = await cartService.getItemFromCarts(condition);
            console.log(itemDetails, "itemDetails");

            // return

            if (!common.isObject(itemDetails)) {
                log.error({ jsonObject: itemDetails, description: 'Item not exist in cart' });
                return response.error(req, res, {}, 'ITEM-NOT-EXIST-IN-CART');
            }

            const updateStatusAsInactive = {
                status: cartStatus['INACTIVE'],  // In active
                modified_date_time: moment().format(),
                modified_by: req.user_id
            };

            const removeCartResponse: any = await cartService.removeFromCart(condition, updateStatusAsInactive);
            log.info({ jsonObject: removeCartResponse, description: 'Cart Remove Response' });

            if (!common.isObject(removeCartResponse)) {
                log.error({ jsonObject: removeCartResponse, description: 'Item details not removed from cart' })
                return response.error(req, res, {}, 'CART-ITEM-NOT-REMOVED');
            }

            return response.send(req, res, {}, 'SUCCESSFULLY-REMOVED-FROM-CART')

        } catch (err) {
            log.error({ jsonObject: err, description: 'Error in remove cart catch block' });
            return response.error(req, res, err);
        }
    }

    /**
     * get user cart items
     * @param req 
     * @param res 
     */
    list = async (req, res) => {
        console.log("get cart list lavan");
        try {
            const userId = req.user_id;

            const page = req.query.page;
            const size = req.query.size;
            const options = { limit: size, skip: (page - 1) * size };
            console.log(options, "djdhhd")
            let cartCount = 0;

            const condition: any = { userId: userId, status: cartStatus['ACTIVE'] };
            log.info({ jsonObject: { condition, options }, description: 'Condition for cart list' });

            const cartList: any = await cartService.getCartList(condition, options);
            log.info({ jsonObject: JSON.stringify(cartList), description: 'Response of cart list' });

            cartCount = await cartService.getCartCount(condition);
            log.info({ jsonObject: cartCount, description: 'Total cart count' });

            if (common.isObject(cartList)) {
                const count = Object.keys(cartList).length;
                req.count = count;
                const result = JSON.parse(JSON.stringify(cartList));
            
                const resultData = { result, page, size };
                resultData['count'] = cartCount;
                return response.send(req, res, resultData, 'SUCCESS');
            }

            return response.send(req, res, { result: [], page, size, cart_count: cartCount }, 'NO-DATA-FOUND');
        }
        catch (err) {
            console.log(err, '**********');
            return response.error(req, res, err, "Something went wrong");
        }
    }

    // Checkout process
    checkout = async (req, res) => {
        try {
            const userId = req.user_id;

            // Get the user's cart items
            const cartItems: any = await cartService.find({ userId });

            // Calculate the total price
            let totalPrice = 0;
            cartItems.forEach((cartItem) => {
                totalPrice += cartItem.items[0].quantity * cartItem.items[0].price;
            });

            // Create an order
            const order = {
                userId,
                items: cartItems,
                totalPrice,
            };

            // Save the order
            const orderSave = await orderService.save(order);
            log.info(orderSave);

            // Clear the cart items
            const cartDelete = await cartService.deleteMan({ userId });
            log.info(cartDelete);

            response.send(req, res, { message: 'Order placed successfully' }, "Success");
        } catch (error) {
            console.error(error);
            response.error(req, res, { message: 'Server Error' }, "Some");
        }
    };


}

export const cartController = new CartController();
