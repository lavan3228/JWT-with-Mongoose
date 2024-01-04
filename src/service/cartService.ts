import { cartModel } from "../models/cart";
import { Index } from "./index";

import { common } from '../utils/common';
import * as _ from 'lodash';
import * as promise from "bluebird";
import { cartStatus } from "../utils/enumValues";

import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('CartController');


class CartService extends Index {

    /** 
     * Save items in cart
     * @condition
     * @data 
     */
    saveInCart = async (data, condition) => {
        const result = await this.findOneAndUpdateUpserts(cartModel, data, condition);
        return result;
    }

    /**
     * To remove item from cart
     * @condition
     * @updateData
     */
    removeFromCart = async (condition, updateData) => {
        const result = await this.updateMany(cartModel, condition, updateData);
        return result;
    }

    /**
     * To get cart test list
     * @condition
     */
    getItemFromCarts = async (condition) => {
        const result = await this.findAll(cartModel, condition);
        return result;
    }

    /**
    * To get cart item list
    * @condition
    * @options
    */
    getCartList = async (condition, options) => {
        const result = await cartModel.find(condition, {}, options);
        return result;
    }

    /**
     * Get cart complete count
     */
    getCartCount = async (condition) => {
        const result = await cartModel.count(condition);
        return result;
    }

    /**
     * To get cart item
     * @condition
     */
    getSingleItemFromCart = async (condition) => {
        const result = await this.findOne(cartModel, condition);
        return result;
    }


    find = async (condition) => {
        return await this.findOne(cartModel, condition);
    }

    save = async (record: any) => {
        return await this.create(cartModel, record);
    }

    update = async (whereCondition: any, updateData: any) => {
        return await this.updateOne(cartModel, whereCondition, updateData);
    }

    deleteMan = async (whereCondition) => {
        return await this.deleteMany(cartModel, whereCondition);
    }

    //  To get payment details
    findPayment = async (condition: any) => {
        const result: any = await this.findOne(cartModel, condition);
        return result;
    }

    // To update task details
    findAndUpdateTask = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdate(cartModel, condition, data);
        return result;
    }

    // To Update order status
    saveOrderStatus = async (orderResult: any, statusCode: any, statusName: any) => {
        const statusData = {
            order_id: orderResult.order_unique_id,
            booking_date: orderResult.created_date_time,
            status_code: statusCode,                        // Ex: 40
            status_name: statusName,                        // Ex: Booked
            // created_at: moment().format()
        };
        const result: any = await this.create(cartModel, statusData);
        return result;
    }

    // Update patient detail if already exist otherwise save the patient details
    patientFindOneAndUpdateUpsert = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdateUpsert(cartModel, condition, data);
        return result;
    }

    findOnePopulat = async (condition: any, product: any) => {
        product = 'productId';
        const result: any = await this.findOnePopulate(cartModel, condition, product);
        return result;
    }
}

export const cartService = new CartService();
