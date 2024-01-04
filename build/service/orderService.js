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
exports.orderService = void 0;
const order_1 = require("../models/order");
const user_1 = require("../models/user");
const index_1 = require("./index");
class OrderService extends index_1.Index {
    constructor() {
        super(...arguments);
        this.findAndUpdate = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdate(order_1.orderModel, condition, data);
            return result;
        });
        // save = async (data) => {
        //     const result: any = await this.create(order, data);
        //     return result;
        // }
        this.counts = (condition) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.count(order_1.orderModel, condition);
            return result;
        });
        this.find = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll(user_1.userModel, condition);
        });
        this.save = (record) => __awaiter(this, void 0, void 0, function* () {
            return yield this.create(order_1.orderModel, record);
        });
        this.update = (whereCondition, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.updateOne(order_1.orderModel, whereCondition, updateData);
        });
        //  To get payment details
        this.findPayment = (condition) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOne(order_1.orderModel, condition);
            return result;
        });
        // To update task details
        this.findAndUpdateTask = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdate(order_1.orderModel, condition, data);
            return result;
        });
        // To Update order status
        this.saveOrderStatus = (orderResult, statusCode, statusName) => __awaiter(this, void 0, void 0, function* () {
            const statusData = {
                order_id: orderResult.order_unique_id,
                booking_date: orderResult.created_date_time,
                status_code: statusCode,
                status_name: statusName, // Ex: Booked
                // created_at: moment().format()
            };
            const result = yield this.create(order_1.orderModel, statusData);
            return result;
        });
        // Update patient detail if already exist otherwise save the patient details
        this.patientFindOneAndUpdateUpsert = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdateUpsert(order_1.orderModel, condition, data);
            return result;
        });
        this.findOrder = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.findOne(order_1.orderModel, { _id: id });
        });
        this.findOrderData = (condition, projection) => __awaiter(this, void 0, void 0, function* () {
            return this.findOne(order_1.orderModel, condition, projection);
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.findOne(order_1.orderModel, { order_unique_id: id });
        });
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
        this.orderTracking = (condition) => __awaiter(this, void 0, void 0, function* () {
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
                const results = yield this.aggregate(order_1.orderModel, queryObject);
                if (results.length) {
                    return results[0];
                }
                else {
                    return {};
                }
            }
            catch (error) {
                // log.error({ jsonObject: { error }, description: 'Exceptional error in orderTracking' });
            }
        });
        /**
        * Method to get order status
        * @param condition
        * @param projection
        * @param options
        * @returns
        */
        this.getOrderStatus = (condition, projection, options) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneWithOptions(order_1.orderModel, condition, projection, options);
            return result;
        });
        this.getOrderDetails = (condition, options) => __awaiter(this, void 0, void 0, function* () {
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
                                { $limit: options.limit }
                            ],
                            totalCount: [
                                {
                                    $count: 'count'
                                }
                            ]
                        }
                    }
                ];
                const results = yield this.aggregate(order_1.orderModel, queryObject);
                if (results && results.length && results[0].paginatedResults && results[0].paginatedResults.length) {
                    return { result: results[0].paginatedResults, count: results[0].totalCount[0].count };
                }
                else {
                    return { result: [], count: 0 };
                }
            }
            catch (err) {
                // log.error({
                //     jsonObject: err,
                //     description: 'getLabVisitDetails: catch err',
                // });
            }
        });
    }
}
exports.orderService = new OrderService();
