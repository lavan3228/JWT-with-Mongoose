import { orderModel } from "../models/order";
import { userModel } from "../models/user";
import { Index } from "./index";


class OrderService extends Index {

    findAndUpdate = async (condition, data) => {
        const result: any = await this.findOneAndUpdate(orderModel, condition, data);
        return result;
    }

    // save = async (data) => {
    //     const result: any = await this.create(order, data);
    //     return result;
    // }

    counts = async (condition) => {
        const result: any = await this.count(orderModel, condition);
        return result;
    }

    find = async (condition) => {
        return await this.findAll(userModel, condition);
    }

    save = async (record: any) => {
        return await this.create(orderModel, record);
    }

    update = async (whereCondition: any, updateData: any) => {
        return await this.updateOne(orderModel, whereCondition, updateData);
    }



    //  To get payment details
    findPayment = async (condition: any) => {
        const result: any = await this.findOne(orderModel, condition);
        return result;
    }

    // To update task details
    findAndUpdateTask = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdate(orderModel, condition, data);
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
        const result: any = await this.create(orderModel, statusData);
        return result;
    }

    // Update patient detail if already exist otherwise save the patient details
    patientFindOneAndUpdateUpsert = async (condition: any, data: any) => {
        const result: any = await this.findOneAndUpdateUpsert(orderModel, condition, data);
        return result;
    }

    findOrder = async (id) => {
        return this.findOne(orderModel, { _id: id });
    }

    findOrderData = async (condition, projection) => {
        return this.findOne(orderModel, condition, projection);
    }


    findById = async (id) => {
        return this.findOne(orderModel, { order_unique_id: id });
    }

    // getAge(dob) {
    //     try {
    //         log.info('Invoice dob ', dob);
    //         const years = moment().diff(moment(dob), 'years');
    //         const months = moment().diff(moment(dob), 'months');
    //         const days = moment().diff(moment(dob), 'days');
    //         log.info('Age cal ', { years, months, days })
    //         return { years, months, days };
    //     } catch (err) {
    //         log.error('Invoice - Error in getAge', err)
    //     }
    // }


    // findAllOrders = async (condition, projection = {}, options = {}) => {
    //     return this.find(orderModel, condition, projection, options);
    // }

    // // service
    // getAll = async (condition, options) => {
    //     try {
    //         const populate = 'patient_id';
    //         const orderPopulate = 'order_id';
    //         const orderProjection = { _id: 1, order_unique_id: 1, lab_number: 1 };
    //         const patientProjection = { _id: 1, first_name: 1, last_name: 1 };
    //         const taskProjection = { _id: 1, slot_date: 1, status: 1, phlebo_id: 1 };

    //         const result: any = await taskModel.find(condition, taskProjection, options).populate(populate, patientProjection).populate(orderPopulate, orderProjection);
    //         return result;
    //     } catch (err) {
    //         return err;
    //     }
    // }

    // /**
    // * To fetch order test info
    // * @param condition 
    // */
    // async testInfo(condition) {
    //     try {
    //         const projectionObject: any = {
    //             parameters: 1,
    //             name: 1,
    //             net_amount: 1,
    //             unit_price: 1,
    //             test_code: 1
    //         }
    //         const data = this.find(orderModel, condition, projectionObject);
    //         return data;
    //     }
    //     catch (err) {
    //         log.info('Error in InvoiceService testInfo', err);
    //         return null;
    //     }
    // }
}
export const orderService = new OrderService();