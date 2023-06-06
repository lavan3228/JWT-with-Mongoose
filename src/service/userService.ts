// import { condition } from "sequelize";
import { userModel } from "../models/user";
import UserToken from "../models/userToken";
import { Index } from "./index";


class UserService extends Index {

    find = async (condition) => {
        return await this.findOne(userModel, condition);
    }

    findToken = async (condition) => {
        return await this.findOne(UserToken, condition);
    }

    mongoFind = async (condition) => {
        return await this.mongoFindAll(userModel, condition);
    }

    // /**
    //  * @condition
    //  * To get all patient details
    //  */
    // patientDetails = async (condition, projection = {}) => {
    //     const result: any = await this.find(patientModel, condition, projection);
    //     return result;
    // }

    save = async (record: any) => {
        return await this.create(userModel, record);
    }

    saveUserToken = async (record: any) => {
        return await this.create(UserToken, record);
    }

    update = async (whereCondition: any, updateData: any) => {
        return await this.updateOne(userModel, whereCondition, updateData);
    }

    countAll = async () => {
        return await this.count(userModel)
    }

    //  To get payment details
    findPayment = async (condition: any) => {
        const result: any = await this.findOne(userModel, condition);
        return result;
    }

    // To update task details
    findAndUpdateTask = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdate(userModel, condition, data);
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
        const result: any = await this.create(userModel, statusData);
        return result;
    }

    // Update patient detail if already exist otherwise save the patient details
    patientFindOneAndUpdateUpsert = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdateUpsert(userModel, condition, data);
        return result;
    }
}

export const userService = new UserService();
