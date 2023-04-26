import { categoryModel } from "../models/category";
import { Index } from "./index";


class CategoryService extends Index {

    find = async (condition) => {
        return await this.findOne(categoryModel, condition);
    }

    save = async (record: any) => {
        return await this.create(categoryModel, record);
    }

    update = async (whereCondition: any, updateData: any) => {
        return await this.updateOne(categoryModel, whereCondition, updateData);
    }

    

    //  To get payment details
     findPayment = async (condition: any) => {
        const result: any = await this.findOne(categoryModel, condition);
        return result;
    }

    // To update task details
    findAndUpdateTask = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdate(categoryModel, condition, data);
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
        const result: any = await this.create(categoryModel, statusData);
        return result;
    }

    // Update patient detail if already exist otherwise save the patient details
    patientFindOneAndUpdateUpsert = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdateUpsert(categoryModel, condition, data);
        return result;
    }
}
export const categoryService = new CategoryService();