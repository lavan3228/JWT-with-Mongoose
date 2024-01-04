"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.common = void 0;
const mongoose = __importStar(require("mongoose"));
const request = __importStar(require("request"));
const Url = __importStar(require("url-parse"));
const moment_1 = __importDefault(require("moment"));
const trackSecret = process.env.TRACK_SERCRET_KEY;
// import sha256 from 'crypto-js/sha256';
// import { commonService } from '../service/commonService';
class Common {
    constructor() {
        /**
         * Checking valid mongo id or not
         * @id
         */
        this.isMongoObjectId = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log("f544", id);
            // console.log(mongoose.Schema.Types.ObjectId, "fnhfj");
            // return 
            if (mongoose.Types.ObjectId.isValid(id))
                return true;
            else
                return false;
        });
        this.requestAPI = (method, url, data, headers = {}) => {
            return new Promise((resolve, reject) => {
                const options = {};
                options['method'] = method;
                options['uri'] = url;
                options['headers'] = headers;
                options['json'] = true;
                if (method === 'POST' || method === 'PUT') {
                    options['body'] = data;
                }
                request(options, (error, response, body) => {
                    if (error)
                        reject(error);
                    resolve(response.body);
                });
            });
        };
        this.headers = () => {
            const header = { 'Content-Type': 'application/json', 'Token': 'bc4ea4ab-0851-5aad-9d92-a796ea635b4f' };
            return header;
        };
        /**
         * To check valid payload
         * @payload
         */
        this.checkPayloadAttributes = (payload) => __awaiter(this, void 0, void 0, function* () {
            if ((payload !== undefined) && ("attributes" in payload) && (Object.keys(payload.attributes).length > 0))
                return true;
            else
                return false;
        });
        /**
         * To check request value is valid or not
         * @val
         */
        this.isValid = (val) => {
            if (val !== undefined && val !== null && val !== "")
                return true;
            else
                return false;
        };
        /**
         * Split message and template id
         */
        this.splitMessageAndTemplateId = (message) => __awaiter(this, void 0, void 0, function* () {
            let templateId = "";
            let messageContent = "";
            const splitMessage = message.split("###");
            // Message content
            if (splitMessage[0] !== undefined && splitMessage[0] !== null && splitMessage[0] !== "")
                messageContent = splitMessage[0];
            // Template Id
            if (splitMessage[1] !== undefined && splitMessage[1] !== null && splitMessage[1] !== "")
                templateId = splitMessage[1];
            return { message_content: messageContent, template_id: templateId };
        });
        /**
         * To check object is valid or not
         * @obj
         */
        this.isObject = (obj) => {
            if (obj !== undefined && obj !== null && Object.keys(obj).length > 0)
                return true;
            else
                return false;
        };
        this.distance = (sourceLat, sourceLong, targetLat, targetLong, unit) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if ((sourceLat === targetLat) && (sourceLong === targetLong)) {
                    resolve(0);
                }
                else {
                    const radlat1 = Math.PI * sourceLat / 180;
                    const radlat2 = Math.PI * targetLat / 180;
                    const theta = sourceLong - targetLong;
                    const radtheta = Math.PI * theta / 180;
                    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    if (dist > 1) {
                        dist = 1;
                    }
                    dist = Math.acos(dist);
                    dist = dist * 180 / Math.PI;
                    dist = dist * 60 * 1.1515; // 'M' is statute miles (default)
                    if (unit === "K") {
                        dist = dist * 1.609344;
                    } // 'K' is kilometers
                    if (unit === "N") {
                        dist = dist * 0.8684;
                    } // 'N' is nautical miles 
                    resolve(dist);
                }
            }));
        };
        this.getUrlPath = (reqUrl) => {
            const url = Url(reqUrl, true);
            return url.pathname;
        };
        /**
         * Difference between dates
         * @param fromDate
         * @param toDate
         * @param dateRange
         */
        this.differenceInTwoDates = (fromDate, toDate, dateRange) => __awaiter(this, void 0, void 0, function* () {
            try {
                const startDate = (0, moment_1.default)(fromDate, 'YYYY-MM-DD');
                const endDate = (0, moment_1.default)(toDate, 'YYYY-MM-DD');
                const diff = endDate.diff(startDate, 'days');
                if (diff < dateRange)
                    return true;
                else
                    return false;
            }
            catch (err) {
                // log.error("error in catch common:differenceInTwoDates", err);
                return false;
            }
        });
        /**
         * method to get patient full name
         * @param firstName
         * @param middleName
         * @param LastName
         */
        this.getPatienFullName = (firstName, middleName, LastName) => __awaiter(this, void 0, void 0, function* () {
            let patientName = '';
            if (this.isValid(firstName)) {
                patientName = patientName + firstName + ' ';
            }
            if (this.isValid(middleName)) {
                patientName = patientName + middleName + ' ';
            }
            if (this.isValid(LastName)) {
                patientName = patientName + LastName;
            }
            patientName = patientName.trim();
            return patientName;
        });
        // isMongoObjectId = async (id) => {
        //     if (mongoose.Types.ObjectId.isValid(id)) 
        //         return true;
        //     else
        //         return false;
        // }
        // checkEcommSource = (ecomSource) => {
        //     if (Number(ecomSource) === Number(sourceKeysEnum['ECOMMERCE']))   // 10 is the E-comm source
        //         return true;
        //     return false;
        // }
        // isValid = (val) => {
        //     if (val !== undefined && val !== null && val !== "")
        //         return true;
        //     else
        //         return false;
        // }
        // isObject = (obj) => {
        //     if (obj !== undefined && obj !== null && Object.keys(obj).length > 0)
        //         return true;
        //     else
        //         return false;
        // }
        /**
         * Method which converst UTC date to IST
         * @param date
         * @returns
         */
        this.utcIst = (date) => {
            const dateUTC = new Date(date);
            const dateUtcTime = dateUTC.getTime();
            let dateIST = new Date(dateUtcTime);
            //date shifting for IST timezone (+5 hours and 30 minutes)
            dateIST.setHours(dateIST.getHours() + 5);
            dateIST.setMinutes(dateIST.getMinutes() + 30);
            return dateIST;
        };
        /**
         * Difference between dates
         * @param fromDate
         * @param toDate
         * @param dateRange
         */
        // differenceInTwoDates = async (fromDate, toDate, dateRange) => {
        //     try {
        //         const startDate = moment(fromDate, 'YYYY-MM-DD');
        //         const endDate = moment(toDate, 'YYYY-MM-DD');
        //         const diff = endDate.diff(startDate, 'days');
        //         return diff < dateRange ? true : false;
        //     } catch (err) {
        //         return false;
        //     }
        // }
        /**
         * To parse the url
         * @param reqUrl
         * @returns
         */
        // getUrlPath = (reqUrl) => {
        //     const url = Url(reqUrl, true);
        //     return url.pathname;
        // }
        /**
         * Uploading file to s3 bucket
         * @param fileName
         * @param files
         * @param filePath
         * @returns
         */
        //  uploadFileToS3(fileName, files, filePath) {
        //     try {
        //         return new Promise(async (resolve, reject) => {
        //             log.info(`AWS ${fileName} uploadFileToS3:`, JSON.stringify(config));
        //             const readStream = fs.createReadStream(files);
        //             const client = credentials;
        //             const writeStream = client.upload({
        //                 container: process.env.PNP_BUCKET_COMMON, // Bucket name
        //                 remote: fileName, // file.originalFilename
        //                 acl: 'private'
        //             });
        //             await writeStream.on('error', (wsErr) => {
        //                 log.error('Error in upload', wsErr);
        //                 if (filePath && fs.existsSync(filePath)) {
        //                     fs.unlinkSync(filePath);
        //                 }
        //                 return resolve({ isUploaded: false });
        //             });
        //             await writeStream.on('success', (file) => {
        //                 log.info('File Remove', files);
        //                 if (filePath && fs.existsSync(filePath)) {
        //                     fs.unlinkSync(filePath);
        //                 }
        //                 resolve({ isUploaded: true, file });
        //             });
        //             readStream.pipe(writeStream);
        //         });
        //     } catch (error) {
        //         const errorInfo = {
        //             jsonObject: error,
        //             description: 'Error In uploadFileToS3 - FileUploadService'
        //         };
        //         log.error(errorInfo);
        //         if (filePath && fs.existsSync(filePath)) {
        //             fs.unlinkSync(filePath);
        //         }
        //         return { isUploaded: false, message: 'SERVER-ERROR' };
        //     }
        // }
        this.sendMail = (statCode, reqObj, apiResult) => __awaiter(this, void 0, void 0, function* () {
            const toMail = process.env.MAIL;
            const sub = `- Error in Internal Order  API`;
            const emailMsg = `<html><head></head><body>
                        Hello Team, <br /><br />
    
                        Getting below error in Internal Order  API while making online payment. So, Please check it once. <br /><br />
    
                        <b>Below are the details: </b> <br /><br />
    
                        <b>Status Code</b>: ${statCode}, <br /><br />
                        <b>Request Payload: </b>: ${JSON.stringify(reqObj)}, <br /><br />
                        <b>Response</b>: ${JSON.stringify(apiResult)}, <br /><br />
                        
                        <b>Thanks & Regards</b> <br />
                        Lalpath Team
                        </body><html/>`;
            // const mailResponse: any = await mail.send(toMail, sub, emailMsg, dataAreaId);
            // log.info({ jsonObject: mailResponse, description: 'Mail Response-Internal Order Payment API' });
            // return mailResponse;
        });
    }
    /**
     * To generate unique id
     */
    generateUniqueId(input) {
        const uid = input + (new Date()).getTime() + '' + Math.trunc(365 * Math.random());
        return uid;
    }
    /**
     * To get milli seconds
     */
    getMilliseconds() {
        return new Date().getTime();
    }
    // generateHash(base64_key) {
    //     base64_key += trackSecret;
    //     const sha = sha256(base64_key).toString();
    //     return sha;
    // }
    addMinsTo24HrsTime(time, durationInMins) {
        return (0, moment_1.default)(time, 'HH:mm').add(durationInMins, 'minutes').format('HH:mm');
    }
    getTimeDiffInSeconds(endDate, startDate) {
        let seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
        return seconds;
    }
    /**
     * Returns the current unix timestamp
     */
    epochTime() {
        return (Math.round(new Date().getTime() / 1000));
    }
    removeWhiteSpaces(text) {
        if (text !== undefined)
            return (text.replace(/\s+/gm, ''));
        else {
            return text;
        }
    }
    /**
     * Convert to int
     * @param  {} values
     */
    convert(value) {
        return value !== undefined ? parseInt(value, 10) : undefined;
    }
    /**
     * Convert environment variable to string
     * @param  {} values
     */
    converted(value) {
        return value === undefined ? '' : value;
    }
}
exports.common = new Common();
