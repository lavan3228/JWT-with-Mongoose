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
        return await this.findAll(orderModel, condition);
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

    orderTracking = async (condition) => {
        try {
            const queryObject = [
                {
                    $match: condition
                },
                { $addFields: { patient_id: { $toObjectId: "$patient_id" } } },
                {
                    $lookup: {
                        from: 'patient',
                        localField: 'patient_id',
                        foreignField: '_id',
                        as: 'patientDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$patientDetails',
                        preserveNullAndEmptyArrays: false
                    }
                },
                { $addFields: { order_id: { $toString: '$_id' } } },
                {
                    $lookup: {
                        from: 'order_test',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'testDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'order_payment',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'paymentDetails'
                    }
                },
                {
                    $lookup: {
                        from: 'phlebo_tracking',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'trackDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$trackDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        patient_id: 1,
                        first_name: '$patientDetails.first_name',
                        last_name: '$patientDetails.last_name',
                        phone_number: '$patientDetails.phone_number',
                        patient_unique_id: '$patientDetails.patient_unique_id',
                        relation_type: '$patientDetails.relation_type',
                        gender: '$patientDetails.gender',
                        dob: '$patientDetails.dob',
                        age: '$patientDetails.age',
                        patient_type: 1,
                        order_unique_id: 1,
                        lab_number: 1,
                        status: 1,
                        is_cash_on_collection: 1,
                        is_home_collection: 1,
                        is_lab_visit: 1,
                        is_vip_slot: 1,
                        actual_amount: 1,
                        amount_after_discount: 1,
                        paid_amount: 1,
                        refund_amount: 1,
                        home_collection_charges: 1,
                        discount_info: 1,
                        collected_by: 1,
                        order_booked_date_time: '$created_date_time',
                        order_confirmed_date: '$slot_info.slot_date',
                        order_confirmed_from_time: '$slot_info.from_time',
                        order_confirmed_to_time: '$slot_info.to_time',
                        phlebo_assigned_date_time: '$phlebo_assigned_date',
                        sample_collected_date_time: '$collection_date_time',
                        sample_submitted_date_time: '$drop_sample_time',
                        report_generated_date_time: 1,
                        test_info: '$testDetails',
                        start_location: '$trackDetails.start_loc',
                        end_location: '$trackDetails.end_loc',
                        current_location: '$trackDetails.current_loc',
                        wallet_info: 1,
                        payment_info: '$paymentDetails',
                        patient_last_name: 1,
                        patient_name: 1
                    }
                }
            ];

            const results: any = await this.aggregate(orderModel, queryObject);
            if (results.length) {
                return results[0];
            } else {
                return {};
            }

        } catch (error) {
            // log.error({ jsonObject: { error }, description: 'Exceptional error in orderTracking' });
        }
    }

    /**
    * Method to get order status
    * @param condition 
    * @param projection
    * @param options
    * @returns 
    */
    getOrderStatus = async (condition, projection, options) => {
        const result = await this.findOneWithOptions(orderModel, condition, projection, options);
        return result;
    }

    getOrderDetails = async (condition, options) => {
        try {
            const queryObject = [
                {
                    $match: condition
                },
                { $addFields: { patient_id: { $toObjectId: "$patient_id" } } },
                {
                    $lookup: {
                        from: 'patient',
                        localField: 'patient_id',
                        foreignField: '_id',
                        as: 'patientDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$patientDetails',
                        preserveNullAndEmptyArrays: false
                    }
                },
                { $addFields: { order_id: { $toString: '$_id' } } },
                {
                    $lookup: {
                        from: 'order_test',
                        localField: 'order_id',
                        foreignField: 'order_id',
                        as: 'testDetails'
                    }
                },
                { $sort: options.sort },
                {
                    $project: {
                        _id: 1,
                        patient_id: 1,
                        first_name: '$patientDetails.first_name',
                        last_name: '$patientDetails.last_name',
                        phone_number: '$patientDetails.phone_number',
                        patient_unique_id: '$patientDetails.patient_unique_id',
                        order_unique_id: 1,
                        lab_number: 1,
                        status: 1,
                        payment_status: 1,
                        slot_info: 1,
                        coupon_info: 1,
                        discount_info: 1,
                        actual_amount: 1,
                        amount_after_discount: 1,
                        home_collection_charges: 1,
                        paid_amount: 1,
                        refund_amount: 1,
                        wallet_info: 1,
                        rsr_info: 1,
                        collected_by: 1,
                        is_cash_on_collection: 1,
                        created_by: 1,
                        created_date_time: 1,
                        doctor_info: 1,
                        test_info: '$order_test'
                    }
                },
                {
                    $facet: {
                        paginatedResults: [
                            { $skip: options.skip },
                            { $limit: options.limit }],
                        totalCount: [
                            {
                                $count: 'count'
                            }
                        ]
                    }
                }
            ];

            const results: any = await this.aggregate(orderModel, queryObject);

            if (results && results.length && results[0].paginatedResults && results[0].paginatedResults.length) {
                return { result: results[0].paginatedResults, count: results[0].totalCount[0].count };
            } else {
                return { result: [], count: 0 };
            }
        } catch (err) {
            // log.error({
            //     jsonObject: err,
            //     description: 'getLabVisitDetails: catch err',
            // });
        }
    }

}

export const orderService = new OrderService();
