import { cartModel } from "../models/cart";
import { Index } from "./index";


class CartService extends Index {

    find = async (condition) => {
        return await this.findOne(cartModel, condition);
    }

    save = async (record: any) => {
        return await this.create(cartModel, record);
    }

    update = async (whereCondition: any, updateData: any) => {
        return await this.updateOne(cartModel, whereCondition, updateData);
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
}

export const cartService = new CartService();
