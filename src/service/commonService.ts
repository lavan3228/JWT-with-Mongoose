// import { response } from '../utils/response';
// import * as moment from 'moment';
// // import { orderPaymentService } from '../service/orderPaymentService';
// import * as _ from "lodash";
// import * as _ from "lodash";
// import * as promise from "bluebird";
// import { Index } from './index';
// import * as request from 'request';
// import { Random } from 'random-js';
// import * as fs from 'fs';
// // import * as swig from 'swig-templates';
// import { Op } from 'sequelize';
// import { common } from '../utils/common';




// class CommonService extends Index {
//     clientOutstanding = async (req, res, next) => {
//         try {
//             const payload = req.body.attributes;

//             const clientOutstandingUrl: any = process.env.CLIENT_OUTSTANDING;
//             const method = "POST";

//             if (!common.isValid(payload.invoice_account))
//                 return response.error(req, res, { message: "Missing invoice account" }, 'INVALID-REQUEST');

//             const clientOutstandingApiKey: any = process.env.CLIENT_OUTSTANDING_API_KEY;
//             const headers = { "Content-Type": "application/json", "x-api-key": clientOutstandingApiKey };
//             const body = { "AccountNum": payload.invoice_account };

//             const auditObj = {};
//             auditObj['order_id'] = payload.invoice_account;
//             auditObj['service'] = 'client_outstanding';
//             auditObj['http_method'] = 'POST';
//             auditObj['request'] = body;
//             auditObj['request_time'] = Date.now();

//             // const clientOustandingResponse: any = await helperMethod.requestThirdPartyAPI(method, clientOutstandingUrl, headers, body);
//             // log.info({ jsonObject: clientOustandingResponse, description: 'Client Outstanding API: Response of Client Outstanding API' });

//             // if (common.isObject(clientOustandingResponse) && clientOustandingResponse.status === true) {
//             //     auditObj['response'] = clientOustandingResponse.data;
//             //     auditObj['response_time'] = Date.now();
//             //     auditObj['error'] = false;
//             //     const auditRes: any = await couponService.thirdPartyAudit(req, auditObj);
//             //     return response.send(req, res, clientOustandingResponse.data.Data, 'SUCCESS');
//             // } else {
//             //     auditObj['response'] = clientOustandingResponse;
//             //     auditObj['response_time'] = Date.now();
//             //     auditObj['error'] = true;
//             //     const auditRes: any = await couponService.thirdPartyAudit(req, auditObj);

//             //     log.error({ jsonObject: clientOustandingResponse, description: 'Third Party API is failing' });
//             //     let responseError = 'FAILED';
//             //     if (clientOustandingResponse.data.Message !== null && clientOustandingResponse.data.Message !== undefined)
//             //         responseError = clientOustandingResponse.data.Message
//             //     return response.error(req, res, {}, responseError);

//             // }
//         } catch (error) {
//             // log.error({ jsonObject: error, description: 'Erron in catch block' });
//             return response.error(req, res, { message: error }, 'SOME-THING-WENT-WRONG');
//         }
//     }

//     /**
//      * Generate a Random number
//      */
//     randomNumber() {
//         const random = new Random(); // uses the nativeMath engine
//         const value = random.integer(100, 10000);
//         return value.toString();
//     }

//     /**
//      * Function to get email template 
//      * @param key 
//      * @param data_area_id 
//      */
//     async getEmailTemplate(fileName, data_area_id) {
//         try {
//             const templatePath = process.env.EMAIL_TEMPLATE_PATH;
//             // log.info('GetEmailTemplate', fileName, data_area_id, templatePath);
//             let defaultTemplateName = fileName;
//             let templateName = fileName;
//             if (data_area_id !== undefined)
//                 templateName = fileName + '_' + data_area_id;

//             templateName = (templateName + '.html').toLocaleLowerCase();

//             // log.info('EmailTemplate FileName', fileName);

//             let htmlPath = __dirname + templatePath + templateName;

//             const isExists = await this.isFileExists(htmlPath);

//             if (isExists) {
//                 return htmlPath;
//             } else {
//                 // log.error('EmailTemplate not exists', htmlPath);
//                 defaultTemplateName = (defaultTemplateName + '.html').toLocaleLowerCase();
//                 htmlPath = __dirname + templatePath + defaultTemplateName;
//                 // log.error('Default Template', htmlPath);
//                 return htmlPath;
//             };

//         } catch (err) {
//             // log.error('Erron in common service getEmailTemplate', err);
//         };
//     };

//     isFileExists(path) {
//         return new Promise(function (resolve, resject) {
//             if (fs.existsSync(path)) {
//                 return resolve(true);
//             } else {
//                 return resolve(false);
//             };
//         });
//     };

//     /**
//      * SMS Sendind
//      */
//     sendSMS = (method: string, url: string, headers = {}, data: any, authorization = {}) => {
//         return new Promise(async (resolve, reject) => {
//             const options: any = {};

//             options['method'] = method;
//             options['uri'] = url;
//             options['headers'] = headers;
//             options['auth'] = authorization;
//             options['json'] = true;

//             if ((method === 'POST' || method === 'PUT') && Object.keys(data).length > 0) {
//                 options['body'] = data;
//             }

//             request(options, (error, res) => {
//                 if (error) reject(error);
//                 resolve(res.body);
//             });
//         });
//     }


//     /**
//      * Method for calling third part API 
//      * @param method 
//      * @param url 
//      * @param headers 
//      * @param body 
//      * @returns 
//      * When throwing exceptional error, using reject
//      * While sending success response or any failure case like getting 400,401 status codes, using resolve to send the repsonse
//      */
//     requestThirdPartyAPI = (method: string, url: string, headers: any = {}, body?: any, restrictEmailStatusCode: number[] = []) => {
//         return new Promise((resolve, reject) => {
//             log.info("requestThirdPartyAPI: API " + url);

//             // Building API Content
//             let options = { method, url, headers };
//             if (this.isValid(headers.is_allow_gzip) && headers.is_allow_gzip === true)
//                 options['gzip'] = true;

//             if (!this.isValid(headers.is_remove_json))
//                 options['json'] = true;

//             if (this.isObject(headers) && this.isValid(headers.is_remove_json))
//                 headers = _.omit(headers, ['is_remove_json'])

//             if (this.isObject(headers) && this.isValid(headers.is_allow_gzip))
//                 headers = _.omit(headers, ['is_allow_gzip']);

//             options['headers'] = headers;
//             // options["json"] = true;
//             options["timeout"] = enumValues.apiTimeoutInMillisec;
//             if (method === 'POST' || method === 'PUT') {
//                 if (body) {
//                     options["body"] = body;
//                 }
//             }
//             // API Request
//             request(options, (error, response) => {
//                 if (error) {
//                     let apiResponseDetails: any = {
//                         status: (response) ? response.statusCode : "No status code",
//                         response: (response && response.body) ? response.body : "No resposne",
//                         errTrace: (error) ? error : "No error",
//                     };

//                     if (response && this.isValid(response.statusCode) && _.isNumber(response.statusCode) && !restrictEmailStatusCode.includes(Number(response.statusCode))) {
//                         // sending mail asynchronously
//                         this.sendApiExceptionMail(url, apiResponseDetails);
//                     }

//                     reject(error);
//                 }

//                 if (this.isObject(response) && this.isObject(response.body) && (response.statusCode === 201 || response.statusCode === 200)) {
//                     resolve({ status: true, status_code: response.statusCode, data: response.body });
//                 } else {
//                     log.error({
//                         jsonObject: {
//                             api_request: options,
//                             api_error: error
//                         },
//                         description: "requestThirdPartyAPI: Error occurred"
//                     });

//                     let apiResponseDetails: any = {
//                         status: (response) ? response.statusCode : "No status code",
//                         response: (response && response.body) ? response.body : "No resposne",
//                         errTrace: (error) ? error : "No error",
//                     };
//                     if (response && this.isValid(response.statusCode) && _.isNumber(response.statusCode) && !restrictEmailStatusCode.includes(Number(response.statusCode))) {
//                         // sending mail asynchronously
//                         this.sendApiExceptionMail(url, apiResponseDetails);
//                     }

//                     if (this.isObject(response) && response.statusCode >= 500)
//                         resolve({ status: false, status_code: apiResponseDetails.status, data: apiResponseDetails.response, error, message: 'Internal Server Error' });

//                     resolve({ status: false, status_code: apiResponseDetails.status, data: apiResponseDetails.response, error });
//                 }
//             });
//         });
//     }
//     /**
//      * Method for sending mail saying so and so API got failed
//      * @param url 
//      * @param apiRes 
//      */
//     sendApiExceptionMail(url: string, apiRes: any) {
//         log.info({
//             jsonObject: { url, apiResMailContent: JSON.stringify(apiRes) },
//             description: "sendApiExceptionMail: Method inputs"
//         });
//         let apiResMailContent = JSON.stringify(apiRes);

//         const sub = `LPL 1xview(${process.env.ENVIRONMENT}) - Error in API`;
//         const emailMsg = `<html><head></head><body>
//                 Hello Team, <br /><br />

//                 Error occured when below API got triggered <br /><br />

//                 <b>API Details: </b> <br /><br />

//                 <b>API URL</b>: ${url}, <br />
//                 <b>API Response</b>: ${apiResMailContent} <br /><br />
                
//                 <b>Thanks & Regards</b> <br />
//                 Lalpath Team
//                 </body><html/>`;
//         mailHelper.send(process.env.LPL_ADMINS, sub, emailMsg);
//     }


// removeTemporaryFile(filePath) {
//     try {
//         if (filePath && fs.existsSync(filePath)) {
//             fs.unlink(filePath, (err) => {
//                 if (err) {
//                     const errorInfo = {
//                         jsonObject: err,
//                         description: 'Error in remove removeTemporaryFile in if'
//                     };
//                     log.error(errorInfo);
//                     return false;
//                 }
//                 log.info('Prescription Removed' + filePath);
//                 return true;
//             });
//         }
//     }
//     catch (error) {
//         const errorInfo = {
//             jsonObject: error,
//             description: 'Error in remove removeTemporaryFile'
//         };
//         log.error(errorInfo);
//     }
// }

// }

// export const commonService = new CommonService();