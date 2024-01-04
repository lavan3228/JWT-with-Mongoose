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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
// import { condition } from "sequelize";
const user_1 = require("../models/user");
const userToken_1 = __importDefault(require("../models/userToken"));
const index_1 = require("./index");
class UserService extends index_1.Index {
    constructor() {
        super(...arguments);
        this.find = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(user_1.userModel, condition);
        });
        this.delete = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.deleteOne(user_1.userModel, condition);
        });
        this.findToken = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(userToken_1.default, condition);
        });
        this.mongoFind = (condition) => __awaiter(this, void 0, void 0, function* () {
            return yield this.mongoFindAll(user_1.userModel, condition);
        });
        // /**
        //  * @condition
        //  * To get all patient details
        //  */
        // patientDetails = async (condition, projection = {}) => {
        //     const result: any = await this.find(patientModel, condition, projection);
        //     return result;
        // }
        this.save = (record) => __awaiter(this, void 0, void 0, function* () {
            return yield this.create(user_1.userModel, record);
        });
        this.saveUserToken = (record) => __awaiter(this, void 0, void 0, function* () {
            return yield this.create(userToken_1.default, record);
        });
        this.update = (whereCondition, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.updateOne(user_1.userModel, whereCondition, updateData);
        });
        this.countAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.count(user_1.userModel);
        });
        //  To get payment details
        this.findPayment = (condition) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOne(user_1.userModel, condition);
            return result;
        });
        // To update task details
        this.findAndUpdateTask = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdate(user_1.userModel, condition, data);
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
            const result = yield this.create(user_1.userModel, statusData);
            return result;
        });
        // Update patient detail if already exist otherwise save the patient details
        this.patientFindOneAndUpdateUpsert = (condition, data) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.findOneAndUpdateUpsert(user_1.userModel, condition, data);
            return result;
        });
        this.getDtae = (reqbody) => __awaiter(this, void 0, void 0, function* () {
            const respObj = [];
            const result = 50;
            reqbody.resultt = result;
            return respObj;
        });
    }
}
exports.userService = new UserService();
