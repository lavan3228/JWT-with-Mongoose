// import * as _ from 'lodash';
// import * as AWS from 'aws-sdk';
// import * as fs from 'fs';
// import * as pdf from 'html-pdf';
// import * as pkgcloud from 'pkgcloud';
// import * as swig from 'swig-templates';
// import * as moment from 'moment';
// import * as momentTimeZone from 'moment-timezone';
// import * as numberToWords from 'number-to-words';
// import { Op } from 'sequelize';
// import { Index } from '../service/index';
// import { constants } from '../utils/constants';
// import { commonComponent } from 'common-component/lpl';
// const common = commonComponent.common;
// const shortUrlType = common.enumValues.shortUrlType;
// // const invoiceSource = common.enumValues.invoiceSource;
// const enums = common.enums.enums;
// const commonMethod = commonComponent.common;
// const mail = commonMethod.mailHelper;
// const helperMethods = common.helperMethods;
// const mongoModels = commonComponent.mongo;
// const shortUrlMappingModel = mongoModels.shortUrlMappingModel;
// const notificationModel = mongoModels.notificationModel;
// const log = common.loggerFactory.getLogger('CreateInvoice');
// import { validator } from './validator';
// import { redisService } from '../service/redisService';
// import { generateInvoiceService } from '../service/generateInvoiceService'
// import { supplemenataryTestService } from '../service/supplementaryTestService'
// import { requestService as thirdPartyAPIService } from '../service/thirdPartyAPI';
// import { auditThirdpartyService } from '../service/auditThirdpartyService';
// import { commonService } from '../service/commonService';
// import { whatsAppService } from '../service/whatsAppService';
// const notificationType = common.enumValues.notificationType;
// const paymentMethodEnum = common.enumValues.payment_method;
// const sourceKeysEnum = common.enumValues.sourceKeysEnum;
// const orderStatusEnum = common.enumValues.order_status;

// let awsAccessKey = '';
// let awsSecretKey = '';
// const awsRegion = process.env.BUCKET_REGION_NAME;
// const bucketName: any = process.env.INVOICE_PDF_BUCKET;
// // const commonUtils = common.helperMethods;


// AWS.config.getCredentials(function (err) {
//     if (err) {
//         log.error('Invoice - Error in fetching credentials', err)
//     }
//     else {
//         const awsCredentials: any = AWS.config.credentials;
//         awsAccessKey = awsCredentials.accessKeyId;
//         awsSecretKey = awsCredentials.secretAccessKey;
//     }
// });

// const config = {
//     provider: 'amazon',
//     keyId: awsAccessKey,
//     key: awsSecretKey,
//     region: awsRegion
// }

// log.info("Config", JSON.stringify(config));

// const credentials = pkgcloud.storage.createClient(config);
// class CreateInvoice extends Index {

//     /**
//      * 
//      * @param orderData 
//      */
//     async invoice(orderData) {
//         // const orderId = '5eec5f12fb15c90007735a29'
//         const orderId = orderData.order_id;

//         try {

//             log.info('Generate Invoice for ', orderData);

//             const invoiceInfo: any = {};


//             // Order Info

//             const orderCondition = {
//                 '_id': orderId
//             };

//             const orderInfoData: any = await generateInvoiceService.orderInfo(orderCondition);
//             invoiceInfo.orderInfoData = orderInfoData.toJSON();
//             const dataAreaID = (invoiceInfo.orderInfoData.data_area_id) ? invoiceInfo.orderInfoData.data_area_id : process.env.DATAAREAID;

//             /** Invoice account validation */
//             let invoiceRestriction = false;
//             if (invoiceInfo.orderInfoData.invoice_account) {
//                 const invoiceAcc = invoiceInfo.orderInfoData.invoice_account;

//                 const getInvoiceAccountDetails = await generateInvoiceService.getInvoiceAccountDetails(invoiceAcc, dataAreaID);
//                 log.info('Invoice account details from the customer -Payments: ', getInvoiceAccountDetails);

//                 if (getInvoiceAccountDetails && getInvoiceAccountDetails.length > 0) {
//                     invoiceInfo.orderInfoData.corporate_name = getInvoiceAccountDetails[0].NAME;

//                     if (getInvoiceAccountDetails[0].is_invoice_blocked !== 0)
//                         invoiceRestriction = true;
//                 } else {
//                     invoiceRestriction = true;
//                 }
//             }

//             if (invoiceRestriction === true) {
//                 log.info({
//                     description: 'Invoice account has restricted-Payments: ',
//                     jsonObject: {
//                         status: false, message: 'Invoice has restricted', orderUniqueId: invoiceInfo.orderInfoData.order_unique_id,
//                         invoiceAccount: invoiceInfo.orderInfoData.invoice_account
//                     }
//                 });
//                 return {
//                     status: false, message: 'Invoice has restricted', orderUniqueId: invoiceInfo.orderInfoData.order_unique_id,
//                     invoiceAccount: invoiceInfo.orderInfoData.invoice_account
//                 };
//             }

//             // Order amount
//             if (invoiceInfo.orderInfoData.coupon_info !== undefined &&
//                 invoiceInfo.orderInfoData.coupon_info !== null &&
//                 invoiceInfo.orderInfoData.coupon_info.is_free_hcc !== undefined &&
//                 invoiceInfo.orderInfoData.coupon_info.is_free_hcc === true) {
//                 invoiceInfo.orderInfoData.home_collection_charges = 0;
//             }

//             let orderTotalAmount = invoiceInfo.orderInfoData.amount_after_discount;
//             let orderTotalPayableAmount = invoiceInfo.orderInfoData.amount_after_discount + invoiceInfo.orderInfoData.home_collection_charges;
//             const miscellaneousCharges = invoiceInfo.orderInfoData.home_collection_charges;
//             invoiceInfo.orderInfoData.balance_amount = orderTotalPayableAmount - invoiceInfo.orderInfoData.paid_amount;
//             invoiceInfo.orderInfoData.order_total_amount = orderTotalAmount;
//             invoiceInfo.orderInfoData.miscellaneousCharges = miscellaneousCharges;
//             // User paying amount (In sms we are sending the net payable amount)
//             let netPayableAmount = invoiceInfo.orderInfoData.amount_after_discount + invoiceInfo.orderInfoData.home_collection_charges;

//             // Actual amount Calculation for (Coupons, Discounts, SwasthPoints)
//             if (dataAreaID === 'live' || dataAreaID === 'apl') {
//                 orderTotalAmount = invoiceInfo.orderInfoData.actual_amount;
//                 orderTotalPayableAmount = invoiceInfo.orderInfoData.actual_amount + invoiceInfo.orderInfoData.home_collection_charges;
//                 // miscellaneousCharges = invoiceInfo.orderInfoData.home_collection_charges;
//                 invoiceInfo.orderInfoData.balance_amount =
//                     (invoiceInfo.orderInfoData.amount_after_discount + invoiceInfo.orderInfoData.home_collection_charges) - invoiceInfo.orderInfoData.paid_amount;
//                 invoiceInfo.orderInfoData.order_total_amount = orderTotalAmount;
//                 invoiceInfo.orderInfoData.miscellaneousCharges = miscellaneousCharges;
//             }

//             const isRSR = (invoiceInfo.orderInfoData && invoiceInfo.orderInfoData.rsr_info && invoiceInfo.orderInfoData.rsr_info.lab_number) ? true : false;

//             /* If patient is credit customer. In sms payable amount dispalying 
//              [(invoiceInfo.orderInfoData.amount_after_discount + invoiceInfo.orderInfoData.home_collection_charges) - 
//              invoiceInfo.orderInfoData.amount_after_discount] */
//             if (invoiceInfo.orderInfoData.is_credit_customer || isRSR) {
//                 orderTotalPayableAmount = orderTotalPayableAmount - orderTotalAmount;
//                 netPayableAmount = netPayableAmount - invoiceInfo.orderInfoData.amount_after_discount;
//             }

//             // Order amount -- End

//             // Fixed value for precision values
//             orderTotalPayableAmount = Number.isInteger(orderTotalPayableAmount) ? orderTotalPayableAmount : orderTotalPayableAmount.toFixed(2);
//             netPayableAmount = Number.isInteger(netPayableAmount) ? netPayableAmount : netPayableAmount.toFixed(2);

//             const orderUniqueId = invoiceInfo.orderInfoData.order_unique_id;
//             if (invoiceInfo.orderInfoData.external_order_id !== undefined) {
//                 invoiceInfo.orderInfoData.order_unique_id = invoiceInfo.orderInfoData.external_order_id;
//             }

//             // Patient Info

//             const patientCondition = {
//                 '_id': orderInfoData.patient_id
//             };

//             let patientInfoData: any = await generateInvoiceService.patientInfo(patientCondition);
//             patientInfoData = patientInfoData.toJSON();
//             invoiceInfo.patientInfoData = patientInfoData;

//             if (patientInfoData.name === undefined) {
//                 const firstName = patientInfoData.first_name === undefined ? '' : patientInfoData.first_name;
//                 const middleName = patientInfoData.middle_name === undefined ? '' : patientInfoData.middle_name;
//                 const lastName = patientInfoData.last_name === undefined ? '' : patientInfoData.last_name;
//                 let full_name = firstName + ' ' + middleName + ' ' + lastName;
//                 full_name = full_name.replace(/\s\s+/g, ' ');
//                 invoiceInfo.patientInfoData.name = full_name;
//             }

//             invoiceInfo.reportLocationInfo = {};

//             if (orderInfoData.registration_lab) {
//                 const reportLocationInfoCondition = {
//                     attributes: ['NAME', 'SUNDAYOPENTIMING', 'CITY', 'LOCALINVENTLOCATIONID', 'INVOICEACCOUNT'],
//                     where: { INVENTLOCATIONID: orderInfoData.registration_lab }
//                 };

//                 const reportLocationInfo: any = await generateInvoiceService.reportLocationInfo(reportLocationInfoCondition);

//                 if (reportLocationInfo !== null)
//                     invoiceInfo.reportLocationInfo = reportLocationInfo.dataValues;
//             } else {
//                 createInvoice.errorEmail(orderId, 'registration_lab is not available to this order..');
//                 return { isGenerated: false };
//             }

//             const testCondition = {
//                 '_id': { '$in': orderInfoData.order_test_id }
//             };
//             const testInfoData: any = await generateInvoiceService.testInfo(testCondition);
//             invoiceInfo.testInfoData = testInfoData;


//             await createInvoice.supplementaryTestList(invoiceInfo);

//             /** Get ETR Information */
//             let ETRRes: any = (constants.invoiceConfig.etr_based_on_auth_token) ?
//                 await createInvoice.ETRInfoBasedOnAuthToken(invoiceInfo, orderId) : await createInvoice.ETRInfo(invoiceInfo, orderId);
//             log.info('ETRRes', ETRRes);

//             if (_.isEmpty(ETRRes)) {
//                 ETRRes = { etrInfo: {} };
//             }

//             const orderPaymentCondition = {
//                 order_id: String(orderId),
//                 payment_status: 2
//             };

//             let orderPaymentInfoData: any = await generateInvoiceService.paymentInfo(orderPaymentCondition);

//             // Credit custgroups from ENV
//             if (orderPaymentInfoData.length === 0) {
//                 let creditCustGroup: any = process.env.CREDIT_CORPORATE_CUST_GROUPS;
//                 creditCustGroup = creditCustGroup.split(",").map(Number);

//                 if (invoiceInfo.orderInfoData.custgroup && creditCustGroup.includes(Number(invoiceInfo.orderInfoData.custgroup))) {
//                     orderPaymentInfoData = [{ payment_method: 'Credit' }];
//                 }
//             }

//             invoiceInfo.orderPaymentInfoData = orderPaymentInfoData;
//             invoiceInfo.centerDetails = {};

//             /* Getting x_center_details based on invoice_account_phlebo from order collection 
//                If invoice_account_phlebo not exist taking INVOICEACCOUNT from warehouse table based on INVENTLOCATIONID=order.registration_lab when source is Patient Lab App
//              */
//             if (invoiceInfo.orderInfoData.invoice_account_phlebo) {
//                 const phleboInfoCondition = {
//                     attributes: ['center_name', 'center_address', 'lab_code', 'center_state', 'center_contact'],
//                     where: {
//                         [Op.or]: [{
//                             invoice_code: invoiceInfo.orderInfoData.invoice_account_phlebo
//                         }, {
//                             invoice_account_home_collection: invoiceInfo.orderInfoData.invoice_account_phlebo
//                         }, {
//                             invoice_code_walkin: invoiceInfo.orderInfoData.invoice_account_phlebo
//                         }]
//                     }
//                 };

//                 const centerDetails: any = await generateInvoiceService.phleboInfo(phleboInfoCondition);

//                 if (centerDetails !== null)
//                     invoiceInfo.centerDetails = centerDetails.dataValues;
//             } else if (invoiceInfo.reportLocationInfo && invoiceInfo.reportLocationInfo.INVOICEACCOUNT) {
//                 const phleboInfoCondition = {
//                     attributes: ['center_name', 'center_address', 'lab_code', 'center_state', 'center_contact'],
//                     where: {
//                         [Op.or]: [
//                             { invoice_code: invoiceInfo.reportLocationInfo.INVOICEACCOUNT },
//                             { invoice_code_walkin: invoiceInfo.reportLocationInfo.INVOICEACCOUNT }
//                         ]
//                     }
//                 };

//                 const centerDetails: any = await generateInvoiceService.phleboInfo(phleboInfoCondition);

//                 if (centerDetails !== null)
//                     invoiceInfo.centerDetails = centerDetails.dataValues;
//             }

//             log.info('Invoice Info ', invoiceInfo);


//             // Validating invoice object

//             const validationRes = validator.invoiceLPL(invoiceInfo);

//             if (validationRes !== true) {
//                 const subject = `LPL 1xview (${process.env.ENVIRONMENT}) - Error in Generate Invoice`;
//                 const toMail = process.env.LPL_ADMINS;
//                 let body = '<b>Error in Generate Invoice:</b> <pre>' + JSON.stringify(validationRes, null, 2) + '</pre>';
//                 body += `<b>Order Id: </b> ${orderId} <br/> <b> Invoice account phlebo: </b> 
//                 ${(invoiceInfo.orderInfoData.invoice_account_phlebo) ? invoiceInfo.orderInfoData.invoice_account_phlebo : '-'}`;
//                 const respp = await mail.send(toMail, subject, body);
//                 log.info('Email sent', respp)
//                 log.error('Invoice - Error in send email', validationRes)
//                 let missed_params: any = '';
//                 for (const data of validationRes) {
//                     if (data.context && data.context.key)
//                         missed_params += data.context.key;
//                 }
//                 const saveObject = {
//                     order_id: String(orderId),
//                     order_unique_id: orderUniqueId,
//                     invoice_account_phlebo: (invoiceInfo.orderInfoData.invoice_account_phlebo) ? invoiceInfo.orderInfoData.invoice_account_phlebo
//                         : ((invoiceInfo.reportLocationInfo && invoiceInfo.reportLocationInfo.INVOICEACCOUNT) ? invoiceInfo.reportLocationInfo.INVOICEACCOUNT : ''),
//                     lab_number: invoiceInfo.orderInfoData.lab_number,
//                     missed_params,
//                     created_date_time: new Date()
//                 };

//                 generateInvoiceService.saveInfo(saveObject);

//                 return { 'isGenerated': false };
//             }

//             const htmlContent = await createInvoice.HTML(invoiceInfo, orderId, orderData, orderTotalPayableAmount);
//             const pdfResponse: any = await createInvoice.PDF(htmlContent, invoiceInfo.orderInfoData.lab_number, orderId);
//             log.info('PDF create response', pdfResponse);
//             if (pdfResponse.isPdfCreated) {
//                 // Uploading to s3
//                 const uploadedFile: any = await createInvoice.uploadInvoiceToS3(pdfResponse.fileName, pdfResponse.invoceFilePath)
//                 if (uploadedFile.isUploaded === true) {
//                     const uploadedInvoiceName = uploadedFile.file.name;
//                     log.info('Uploaded invoice name', uploadedInvoiceName);
//                     // const url = await invoice.saveToshortURL(process.env.INVOICE_AWS_BASE_URL + uploadedInvoiceName);
//                     const urlCode = await createInvoice.saveToshortURL(uploadedInvoiceName, orderUniqueId);

//                     /** Sending message to WhatsApp or SMS */
//                     let whatsAppSMSSend = false;
//                     let isSMSSend = false;
//                     let patientPhoneNumber = (invoiceInfo.orderInfoData.patient_phone_number) ? invoiceInfo.orderInfoData.patient_phone_number : invoiceInfo.patientInfoData.phone_number;

//                     if (Number(process.env.WHATSAPP_SMS_ENABLE) === 1 &&
//                         (orderData.data_area_id && orderData.data_area_id.toLowerCase() === 'live')) {
//                         whatsAppSMSSend = await whatsAppService.sendTemplateMessage(patientInfoData.phone_code, patientPhoneNumber,
//                             invoiceInfo.patientInfoData.name, urlCode, orderData, invoiceInfo.patientInfoData.email,
//                             invoiceInfo.orderInfoData.lab_number, invoiceInfo.orderInfoData.order_unique_id, netPayableAmount);
//                     } else {
//                         isSMSSend = await createInvoice.sendSMS(patientInfoData.phone_code, patientPhoneNumber,
//                             invoiceInfo.patientInfoData.name, urlCode, orderData, invoiceInfo.patientInfoData.email,
//                             invoiceInfo.orderInfoData.lab_number, invoiceInfo.orderInfoData.order_unique_id,
//                             netPayableAmount);
//                     }

//                     let isEmailSend: any = false;
//                     if (invoiceInfo.patientInfoData.email) {
//                         isEmailSend = await createInvoice.sendEmail(invoiceInfo, pdfResponse.fileName, orderData);
//                     }
//                     const orderUpdateCondition = {
//                         '_id': orderId
//                     };
//                     await generateInvoiceService.updateOrder(orderUpdateCondition, pdfResponse.fileName, ETRRes.ETRResponse,
//                         isSMSSend, isEmailSend, ETRRes.etrInfo, whatsAppSMSSend);
//                     log.info('Removing PDF', pdfResponse.invoceFilePath);
//                     helperMethods.removeTemporaryFile(pdfResponse.invoceFilePath);
//                     return { 'isGenerated': true };
//                 } else {
//                     helperMethods.removeTemporaryFile(pdfResponse.invoceFilePath);
//                     return { 'isGenerated': false };
//                 }
//                 // }
//             } else {
//                 helperMethods.removeTemporaryFile(pdfResponse.invoceFilePath);
//                 return { 'isGenerated': false };
//             }
//         } catch (err) {
//             log.error('Invoice - Error in invoice ', err);
//             createInvoice.errorEmail(orderId, err);
//             return { 'isGenerated': false };
//         }
//     }


//     /**
//      * Preparing invoice HTML
//      * @param invoiceInfo 
//      * @param orderId 
//      */
//     async HTML(invoiceInfo, orderId, orderData, orderTotalPayableAmount) {

//         try {
//             log.info('In Generate HML');

//             let ageGender = '- / ' + enums.gender[invoiceInfo.patientInfoData.gender];
//             const isRSR = (invoiceInfo.orderInfoData && invoiceInfo.orderInfoData.rsr_info && invoiceInfo.orderInfoData.rsr_info.lab_number) ? true : false;

//             /* if (invoiceInfo.patientInfoData.age === undefined && invoiceInfo.patientInfoData.dob !== undefined) {
//                  const age = createInvoice.getAge(invoiceInfo.patientInfoData.dob);
//                  invoiceInfo.patientInfoData.age = age;
//              } */

//             /** Patient age */
//             if (invoiceInfo.patientInfoData.dob) {
//                 const age = createInvoice.getAge(invoiceInfo.patientInfoData.dob);

//                 invoiceInfo.patientInfoData.age = age;
//             }

//             if (invoiceInfo.patientInfoData.age) {
//                 const patientAgeInfo = invoiceInfo.patientInfoData.age;
//                 const patientAge = (patientAgeInfo.years) ? patientAgeInfo.years + ' year(s) / ' :
//                     ((patientAgeInfo.months) ? patientAgeInfo.months + ' month(s) / ' : ((patientAgeInfo.days) ? (patientAgeInfo.days) + ' day(s) / ' : ', '));
//                 ageGender = patientAge + enums.gender[invoiceInfo.patientInfoData.gender];
//             }

//             let timezone: any = process.env.X_TIMEZONE_VALUE;
//             if (invoiceInfo.orderInfoData.timezone)
//                 timezone = invoiceInfo.orderInfoData.timezone;

//             let doctorName = 'Self';
//             if (invoiceInfo.orderInfoData.doctor_info !== undefined) {
//                 doctorName = invoiceInfo.orderInfoData.doctor_info.name;
//             }

//             // checking both level 1 and level 2 LPL EMPLOYEE discount applied or not
//             let isLPLEmpL1L2DiscApplied = false;

//             if (invoiceInfo.orderInfoData && invoiceInfo.orderInfoData.discount_info &&
//                 invoiceInfo.orderInfoData.discount_info.level_one_discount &&
//                 invoiceInfo.orderInfoData.discount_info.level_two_discount) {
//                 isLPLEmpL1L2DiscApplied = true;
//             }

//              // finding whether LPL EMPLOYEE WALLET APPLIED OR NOT
//              let isLPLEmpL1DiscApplied = false;
//             const LPLEmployeeDiscountApplied: any = invoiceInfo.orderPaymentInfoData.filter((value) => value.payment_method === Number(paymentMethodEnum['LPL_EMPLOYEE_WALLET']));

//             if (LPLEmployeeDiscountApplied && LPLEmployeeDiscountApplied.length) {
//                 isLPLEmpL1DiscApplied = true;
//             }

//             // Coupon, Wallet, Discount amount
//             const couponAmount = (invoiceInfo.orderInfoData.coupon_info && invoiceInfo.orderInfoData.coupon_info.discounted_amount) ? invoiceInfo.orderInfoData.coupon_info.discounted_amount : 0;
//             const walletAmount = (invoiceInfo.orderInfoData.wallet_info && invoiceInfo.orderInfoData.wallet_info.redeemed_from_wallet) ? invoiceInfo.orderInfoData.wallet_info.redeemed_from_wallet : 0;
//             let discountAmount = (invoiceInfo.orderInfoData.discount_info && invoiceInfo.orderInfoData.discount_info.amount && !(isLPLEmpL1L2DiscApplied && isLPLEmpL1DiscApplied)) ? invoiceInfo.orderInfoData.discount_info.amount : invoiceInfo.orderInfoData.discount_info.level_two_discount;
//             discountAmount = discountAmount ? discountAmount : 0;  // applied when only coupon is applied
//             const totalDiscountsFixedVal = (isLPLEmpL1DiscApplied && !isLPLEmpL1L2DiscApplied) ? couponAmount : couponAmount + discountAmount;
//             const totalDiscounts = Number.isInteger(totalDiscountsFixedVal) ? totalDiscountsFixedVal : totalDiscountsFixedVal.toFixed(2);
//             const netPayableAmountVal = orderTotalPayableAmount - totalDiscounts;

//             if (invoiceInfo.orderInfoData.is_franchise === false) {
//                 // const htmlPath = __dirname + process.env.INVOICE_LPL_PATH;
//                 const htmlPath = await commonService.getEmailTemplate('pdf_invoice', orderData.data_area_id);

//                 log.info('Invoice htmlPath', htmlPath);

//                 let gst_no: any = 'NA';
//                 // if (invoiceInfo.centerDetails.center_state) {
//                 //     invoiceInfo.centerDetails.center_state = invoiceInfo.centerDetails.center_state.toLowerCase();
//                 //     if (invoiceInfo.centerDetails.center_state.includes('delhi'))
//                 //         gst_no = process.env.INVOICE_DELHI_GST
//                 // }
//                 if (invoiceInfo.reportLocationInfo.CITY) {
//                     invoiceInfo.reportLocationInfo.CITY = invoiceInfo.reportLocationInfo.CITY.toLowerCase();
//                     if (invoiceInfo.reportLocationInfo.CITY.includes('delhi'))
//                         gst_no = process.env.INVOICE_DELHI_GST;
//                 }

//                 let corporateCode = 'NA';

//                 if (invoiceInfo.patientInfoData.patient_type === 2) {
//                     corporateCode = invoiceInfo.orderInfoData.invoice_account;
//                     corporateCode = (invoiceInfo.orderInfoData.corporate_name) ? corporateCode + ' / ' + invoiceInfo.orderInfoData.corporate_name : corporateCode;
//                 }

//                 const payment_method: any = [];
//                 // const formatAddress = await createInvoice.formatAddress(invoiceInfo.orderInfoData.address);
//                 let creditCustGroup: any = process.env.CREDIT_CORPORATE_CUST_GROUPS; // Credit custgroups from ENV
//                 creditCustGroup = creditCustGroup.split(",").map(Number);

//                 // Payment methods
//                 if (invoiceInfo.orderInfoData.custgroup && creditCustGroup.includes(Number(invoiceInfo.orderInfoData.custgroup)) &&
//                     (invoiceInfo.orderPaymentInfoData.length === 0 || (invoiceInfo.orderPaymentInfoData.length === 1 && invoiceInfo.orderPaymentInfoData[0].payment_method === 'Credit'))) {
//                     payment_method.push('Credit');
//                 } else if (invoiceInfo.orderPaymentInfoData.length > 0) {
//                     // Filter only payment methods
//                     const paymentDetailsExceptDiscount = _.filter(invoiceInfo.orderPaymentInfoData, (paymentData) => {
//                         return (Number(paymentData.payment_method) !== Number(paymentMethodEnum['DISCOUNT'])
//                             && Number(paymentData.payment_method) !== Number(paymentMethodEnum['LPL_EMPLOYEE_WALLET'])
//                             && Number(paymentData.payment_method) !== Number(paymentMethodEnum['COUPON'])
//                             && Number(paymentData.payment_method) !== Number(paymentMethodEnum['WALLET_PROMO_CASH']));
//                     });

//                     if (paymentDetailsExceptDiscount && paymentDetailsExceptDiscount.length) {
//                         await paymentDetailsExceptDiscount.map(async (payment: any) => {
//                             if (payment.payment_method === paymentMethodEnum.PAY_THROUGH_LINK) {
//                                 const juspayPayment = (payment.juspay_payment_details && payment.juspay_payment_details.payment_method_type)
//                                     ? payment.juspay_payment_details.payment_method_type + '/' + payment.juspay_payment_details.payment_method : '';

//                                 if (juspayPayment)
//                                     payment_method.push(juspayPayment);
//                             } else if (enums.payment_method[payment.payment_method]) {
//                                 payment_method.push(enums.payment_method[payment.payment_method]);
//                             } else if (enums.ecommerce_payment_method[payment.payment_method]) {
//                                 payment_method.push(enums.ecommerce_payment_method[payment.payment_method]);
//                             }
//                         });
//                     }
//                 } else {
//                     payment_method.push('Pending'); // Present this scenario to Franchise users from Patient Web Reg
//                 }
//                 log.info('Payment method', payment_method);

//                 const covertedToWords = createInvoice.amountInWords(invoiceInfo.orderInfoData.paid_amount, orderId);
//                 const logoPath: any = __dirname + "/images/logo.png";

//                 const htmlData: any = {
//                     patient_name: _.upperCase(invoiceInfo.patientInfoData.name),
//                     home_collection_date: (invoiceInfo.orderInfoData.collection_date_time) ? momentTimeZone(invoiceInfo.orderInfoData.collection_date_time).tz(timezone).format('DD-MM-YYYY HH:mm:ss') : '',
//                     invoice_account: invoiceInfo.orderInfoData.order_unique_id,
//                     // home_collection_address: formatAddress,
//                     age_gender: ageGender,
//                     phone_number: (invoiceInfo.orderInfoData.patient_phone_number) ? invoiceInfo.orderInfoData.patient_phone_number : invoiceInfo.patientInfoData.phone_number,
//                     payment_mode: (payment_method && payment_method.length) ? _.uniq(payment_method).join(', ') : '',
//                     test_details: invoiceInfo.testInfoData,
//                     reg_center_address: invoiceInfo.centerDetails.center_address,
//                     order_total: invoiceInfo.orderInfoData.order_total_amount,
//                     paid_amount: invoiceInfo.orderInfoData.paid_amount,
//                     miscellaneous_charges: invoiceInfo.orderInfoData.miscellaneousCharges,
//                     balance_amount: invoiceInfo.orderInfoData.balance_amount,
//                     patient_unique_id: invoiceInfo.patientInfoData.patient_unique_id,
//                     salutation: invoiceInfo.patientInfoData.salutation,
//                     doctor_name: doctorName,
//                     lab_number: invoiceInfo.orderInfoData.lab_number,
//                     amount_in_words: covertedToWords,
//                     lab_code: invoiceInfo.centerDetails.lab_code,
//                     sunday_open_timing: invoiceInfo.reportLocationInfo.SUNDAYOPENTIMING,
//                     gst_no,
//                     customer_care_phone: process.env.INVOICE_CUSTOMER_CARE_NUMBER,
//                     customer_care_email: process.env.INVOICE_CUSTOMER_CARE_EMAIL,
//                     fax: process.env.INVOICE_FAX,
//                     patient_app_link: process.env.PATIENTAPP_LINK,
//                     corporate_code: corporateCode,
//                     logo_path: logoPath,
//                     coupon_amount: couponAmount,
//                     discount_amount: discountAmount,
//                     wallet_amount: walletAmount,
//                     total_discounts: totalDiscounts,
//                     net_payable_amount: Number.isInteger(netPayableAmountVal) ? netPayableAmountVal : netPayableAmountVal.toFixed(2),
//                     is_LPL_emp_l1_applied : isLPLEmpL1DiscApplied,
//                     level_one_discount : invoiceInfo.orderInfoData.discount_info.level_one_discount,
//                     is_LPL_emp_l1_l2_applied : isLPLEmpL1L2DiscApplied
//                 };

//                 /** If Patient is Credit corporate set the prices with zero */
//                 if ((invoiceInfo.orderInfoData.is_credit_customer || isRSR) && invoiceInfo.testInfoData) {
//                     const creditTestPrices = _.each(invoiceInfo.testInfoData, test => { test.net_amount = 0; test.unit_price = 0; });
//                     log.info('Credit corporate - test details after set with zero: ', creditTestPrices);

//                     htmlData.test_details = creditTestPrices;
//                     htmlData.order_total = 0;
//                     htmlData.coupon_amount = 0; htmlData.wallet_amount = 0; htmlData.discount_amount = 0; htmlData.total_discounts = 0;  // TODO now Credit coporate set values are 0
//                     htmlData.net_payable_amount = orderTotalPayableAmount;
//                     /* invoiceInfo.orderInfoData.balance_amount = 
//                      * (orderTotalPayableAmount - invoiceInfo.orderInfoData.paid_amount) - invoiceInfo.orderInfoData.amount_after_discount;
//                      */
//                     htmlData.balance_amount = invoiceInfo.orderInfoData.balance_amount - invoiceInfo.orderInfoData.amount_after_discount;

//                     if (isRSR) {
//                         htmlData.paid_amount = (invoiceInfo.orderInfoData.paid_amount - invoiceInfo.orderInfoData.amount_after_discount) < 0 ? 0 : invoiceInfo.orderInfoData.paid_amount - invoiceInfo.orderInfoData.amount_after_discount;
//                         htmlData.balance_amount  = invoiceInfo.orderInfoData.home_collection_charges - htmlData.paid_amount;
//                     }
//                 }

//                 if (invoiceInfo.orderInfoData.status === orderStatusEnum.CANCELLED) {
//                     const cancelledOrderTestPrices = _.each(invoiceInfo.testInfoData, test => { test.net_amount = 0; test.unit_price = 0; });
//                     log.info('Cancelled Orders - test details after set with zero: ', cancelledOrderTestPrices);

//                     htmlData.order_total = 0;
//                     htmlData.paid_amount = 0;
//                     htmlData.coupon_amount = 0;
//                     htmlData.wallet_amount = 0;
//                     htmlData.balance_amount = 0;
//                     htmlData.discount_amount = 0;
//                     htmlData.total_discounts = 0;
//                     htmlData.level_one_discount = 0;                    
//                     htmlData.net_payable_amount = 0;
//                     htmlData.miscellaneous_charges = 0;
//                     htmlData.is_cancelled_order = true;
//                     htmlData.test_details = cancelledOrderTestPrices;                    
//                 }

//                 const htmlContent = swig.renderFile(htmlPath, htmlData);
//                 // console.log(htmlContent);
//                 log.info('HTML Generated');
//                 return htmlContent;
//             } else {
//                 // const htmlPath = __dirname + process.env.INVOICE_FRANCHISE_PATH;
//                 const htmlPath = await commonService.getEmailTemplate('pdf_invoice_franchise', orderData.data_area_id);

//                 log.info('Franchise Invoice htmlPath', htmlPath);
//                 // let payment_method = 'Multiple'
//                 // if (invoiceInfo.orderPaymentInfoData.length === 1) {
//                 //     payment_method = enums.payment_method[invoiceInfo.orderPaymentInfoData[0].payment_method]
//                 // }
//                 const logoPath: any = __dirname + "/images/logo.png";

//                 const htmlData: any = {
//                     salutation: invoiceInfo.patientInfoData.salutation,
//                     patient_name: _.upperCase(invoiceInfo.patientInfoData.name),
//                     invoice_account: invoiceInfo.orderInfoData.order_unique_id,
//                     lab_number: invoiceInfo.orderInfoData.lab_number,
//                     // gender: enums.gender[invoiceInfo.patientInfoData.gender],
//                     // dob: moment(invoiceInfo.patientInfoData.dob).format('DD-MM-YYYY'),
//                     age_gender: ageGender,
//                     lpl_client_code: invoiceInfo.orderInfoData.registration_lab,
//                     home_collection_date: (invoiceInfo.orderInfoData.collection_date_time) ? momentTimeZone(invoiceInfo.orderInfoData.collection_date_time).tz(timezone).format('DD-MM-YYYY HH:mm:ss') : '',
//                     registration_lab: invoiceInfo.orderInfoData.registration_lab,
//                     phone_number: (invoiceInfo.orderInfoData.patient_phone_number) ? invoiceInfo.orderInfoData.patient_phone_number : invoiceInfo.patientInfoData.phone_number,
//                     test_details: invoiceInfo.testInfoData,
//                     // order_total: invoiceInfo.orderInfoData.paid_amount, Old
//                     order_total: invoiceInfo.orderInfoData.order_total_amount,
//                     reg_center_address: invoiceInfo.centerDetails.center_address,
//                     report_location: invoiceInfo.reportLocationInfo.NAME,
//                     doctor_name: doctorName,
//                     center_name: invoiceInfo.centerDetails.center_name,
//                     center_contact: (invoiceInfo.centerDetails.center_contact &&
//                         (Number(invoiceInfo.orderInfoData.source) === Number(sourceKeysEnum['1X-PL']) || Number(invoiceInfo.orderInfoData.source) === Number(sourceKeysEnum['1X-PWA']))) ?
//                         invoiceInfo.centerDetails.center_contact : '',
//                     logo_path: logoPath,
//                     miscellaneous_charges: invoiceInfo.orderInfoData.miscellaneousCharges,
//                     paid_amount: invoiceInfo.orderInfoData.paid_amount,
//                     balance_amount: invoiceInfo.orderInfoData.balance_amount,
//                     customer_care_phone: process.env.INVOICE_CUSTOMER_CARE_NUMBER,
//                     customer_care_email: process.env.INVOICE_CUSTOMER_CARE_EMAIL,
//                     coupon_amount: couponAmount,
//                     discount_amount: discountAmount,
//                     wallet_amount: walletAmount,
//                     total_discounts: totalDiscounts,
//                     net_payable_amount: Number.isInteger(netPayableAmountVal) ? netPayableAmountVal : netPayableAmountVal.toFixed(2),
//                     is_LPL_emp_l1_applied : isLPLEmpL1DiscApplied,
//                     level_one_discount : invoiceInfo.orderInfoData.discount_info.level_one_discount,
//                     is_LPL_emp_l1_l2_applied : isLPLEmpL1L2DiscApplied                };

//                 /** If Franshisee is Credit corporate set the prices with zero */
//                 if ((invoiceInfo.orderInfoData.is_credit_customer || isRSR) && invoiceInfo.testInfoData) {
//                     const creditTestPrices = _.each(invoiceInfo.testInfoData, test => { test.net_amount = 0; test.unit_price = 0; });
//                     log.info('Credit corporate - test details after set with zero: ', creditTestPrices);

//                     htmlData.test_details = creditTestPrices;
//                     htmlData.order_total = 0;
//                     htmlData.coupon_amount = 0; htmlData.wallet_amount = 0; htmlData.discount_amount = 0; htmlData.total_discounts = 0;  // TODO now Credit coporate set values are 0
//                     htmlData.net_payable_amount = orderTotalPayableAmount;
//                     /* invoiceInfo.orderInfoData.balance_amount = 
//                      * (orderTotalPayableAmount - invoiceInfo.orderInfoData.paid_amount) - invoiceInfo.orderInfoData.amount_after_discount;
//                      */
//                     htmlData.balance_amount = invoiceInfo.orderInfoData.balance_amount - invoiceInfo.orderInfoData.amount_after_discount;

//                     if (isRSR) {
//                         htmlData.paid_amount = (invoiceInfo.orderInfoData.paid_amount - invoiceInfo.orderInfoData.amount_after_discount) < 0 ? 0 : invoiceInfo.orderInfoData.paid_amount - invoiceInfo.orderInfoData.amount_after_discount;
//                         htmlData.balance_amount  = invoiceInfo.orderInfoData.home_collection_charges - htmlData.paid_amount;
//                     }
//                 }

//                 // For Live CGHS Franshise users showing common address
//                 if (invoiceInfo.orderInfoData.is_cghs_customer && (orderData.data_area_id && orderData.data_area_id.toLowerCase() === 'live')) {
//                     htmlData.reg_center_address = constants.center_address_for_cghs_live;
//                 }

//                 if (invoiceInfo.orderInfoData.status === orderStatusEnum.CANCELLED) {
//                     const cancelledOrderTestPrices = _.each(invoiceInfo.testInfoData, test => { test.net_amount = 0; test.unit_price = 0; });
//                     log.info('Cancelled Orders - test details after set with zero: ', cancelledOrderTestPrices);

//                     htmlData.order_total = 0;
//                     htmlData.paid_amount = 0;
//                     htmlData.coupon_amount = 0;
//                     htmlData.wallet_amount = 0;
//                     htmlData.balance_amount = 0;
//                     htmlData.discount_amount = 0;
//                     htmlData.total_discounts = 0;
//                     htmlData.level_one_discount = 0;                    
//                     htmlData.net_payable_amount = 0;
//                     htmlData.miscellaneous_charges = 0;
//                     htmlData.is_cancelled_order = true;
//                     htmlData.test_details = cancelledOrderTestPrices;                    
//                 }
                
//                 const htmlContent = swig.renderFile(htmlPath, htmlData);
//                 // log.info('HTML Generated');
//                 return htmlContent;
//             }
//         } catch (err) {
//             createInvoice.errorEmail(orderId, err)
//             log.error('Invoice - Error while generating invoice HTML', err);
//         }
//     }

//     /**
//      * Preparing invoice PDF using generated HTML content
//      * @param htmlContent 
//      * @param order_id 
//      */
//     async PDF(htmlContent, lab_number, order_id) {
//         try {
//             return new Promise(async (resolve, reject) => {
//                 log.info('In Generate PDF');
//                 const options = {
//                     format: 'A4',
//                     orientation: 'portrait',
//                     // header: { "height": "5mm" },
//                     // footer: { "height": "5mm" }
//                     timeout: 60000,  // The default time out to convert the html to pdf is 30 seconds, increasing it to 1min
//                     border: {
//                         top: "0.5cm",
//                         bottom: "0.8cm",           // default is 0, units: mm, cm, in, px
//                         right: "0.5cm",
//                         left: "0.5cm"
//                     }
//                 };
//                 const tempInvoicePath = process.env.INVOICE_TEMP_PATH;
//                 // const fileName = 'invoice' + '_' + String(helperMethods.epochTime()) + '_temp';
//                 const fileName = lab_number + '_' + String(helperMethods.epochTime()) + '.pdf';
//                 const invoceFilePath = tempInvoicePath + fileName;
//                 pdf.create(htmlContent, options).toFile(invoceFilePath, async function (err, data) {
//                     if (err) {
//                         log.error('Invoice - Error in pdf create ', err);
//                         createInvoice.errorEmail(order_id, err);
//                         resolve({ isPdfCreated: false })
//                     } else {
//                         log.info("File created successfully", invoceFilePath, fileName);
//                         resolve({ isPdfCreated: true, invoceFilePath, fileName });
//                     }
//                 });
//             })
//         }
//         catch (error) {
//             createInvoice.errorEmail(order_id, error);
//             log.error('Error while generating invoice PDF', error);
//         }
//     }



//     /**
//      * Uploading invoice to S3 bucket
//      * @param fileName 
//      * @param filePath 
//      */
//     async uploadInvoiceToS3(fileName, filePath) {
//         try {
//             log.info('Uploading to S3');
//             return new Promise(async (resolve, reject) => {
//                 const readStream = fs.createReadStream(filePath);

//                 const client = credentials;
//                 const writeStream = client.upload({
//                     container: bucketName,
//                     remote: fileName, // file.originalFilename
//                     acl: 'private',
//                     contentType: 'application/pdf'
//                 });
//                 // handle your error case
//                 await writeStream.on('error', function (wsErr) {
//                     log.error('Error in upload', wsErr);
//                     return resolve({ 'isUploaded': false });
//                 });
//                 // success, file will be a File model
//                 await writeStream.on('success', function (file) {
//                     resolve({ 'isUploaded': true, file });
//                 });

//                 readStream.pipe(writeStream);
//             })
//         } catch (error) {
//             const errorInfo = {
//                 jsonObject: error,
//                 description: 'Error while upload invoice - uploadInvoiceToS3'
//             };
//             log.error(errorInfo);
//             return { isUploaded: false };
//         }
//     }


//     /**
//      * Getting singed URL
//      * @param fileName 
//      */
//     async saveToshortURL(fileName, orderUniqueId) {
//         try {
//             log.info('Saving to short_url_mapping')
//             const urlCode = await createInvoice.generateURLCode(orderUniqueId);
//             log.info('Short URL:', urlCode);
//             const urlObject = {
//                 code: urlCode,
//                 redirect_url: fileName,
//                 type: shortUrlType.invoice
//             };
//             await this.create(shortUrlMappingModel, urlObject);
//             return urlObject.code;
//         } catch (err) {
//             log.error('Invoice - Error in insertInShortUrlMapping', err);
//         }
//     }

//     /**
//      * Generating short URL code
//      */

//     async generateURLCode(orderUniqueId) {
//         try {
//             log.info('OrderUniqueId', orderUniqueId)
//             const orderDigits = orderUniqueId.substring(4);
//             const urlCode = Math.random().toString(36).substr(2, 8) + orderDigits;
//             return urlCode;
//         } catch (err) {
//             log.error('Invoice - Error in generateURLCode', err)
//         }
//     }

//     /**
//      * Sending sms with invoice link
//      * @param phoneCode 
//      * @param mobileNumber 
//      * @param name 
//      * @param urlCode 
//      * @param orderData 
//      * @param email 
//      * @param labNumber 
//      * @param order_unique_id 
//      */
//     async sendSMS(phoneCode, mobileNumber, name, urlCode, orderData, email, labNumber, order_unique_id, orderTotalAmount) {
//         try {
//             const short_url = process.env.INVOICE_SHORT_URL + 'i/';
//             let message: any = '';
//             let appLink: any = (process.env.PATIENTAPP_LINK) ? process.env.PATIENTAPP_LINK : 'http://bit.ly/lpl_app';

//             // app link for pdpl in SMS
//             if ((orderData.data_area_id && orderData.data_area_id.toLowerCase() === 'pdpl')) {
//                 appLink = constants.app_link.pdpl;
//             }

//             /* const message = `Dear ${name}, The invoice for your order ${order_unique_id} has been generated successfully. You can instantly 
//             download the invoice using the link: ${short_url}${urlCode} Thank you for trusting Dr.Lal PathLabs. Have a nice day! 
//             You can download our app http://bit.ly/lpl_app`*/

//             // Fetching SMS Text from language file  
//             if ((orderData.source && (Number(orderData.source) === Number(sourceKeysEnum['1X-PL']) || Number(orderData.source) === Number(sourceKeysEnum['1X-PWA']))) &&
//                 (orderData.data_area_id && orderData.data_area_id.toLowerCase() === 'live')) {
//                 message = await commonService.getSMSTextFromLanguageFile('INVOICE_SMS_PL', orderData.data_area_id, orderData.language);
//                 //  const apLink = 'http://bit.ly/lpl_app';
//                 message = message.replace('<lab_number>', labNumber);
//                 message = message.replace('<app_link>', appLink);
//             } else {
//                 message = await commonService.getSMSTextFromLanguageFile('INVOICE_SMS', orderData.data_area_id, orderData.language);
//                 message = message.replace('<name>', name);
//                 message = message.replace('<order_unique_id>', order_unique_id);
//                 message = message.replace('<lab_number>', labNumber);
//                 message = message.replace('<order_amount>', orderTotalAmount);
//                 message = message.replace('<short_url>', short_url);
//                 message = message.replace('<urlCode>', urlCode);
//                 message = message.replace('<app_link>', appLink);
//             }

//             const notiObj = {};
//             notiObj['user_id'] = orderData.to_user_id;
//             notiObj['sender_id'] = orderData.user_id;
//             notiObj['type'] = notificationType.sms;
//             notiObj['type_description'] = 'sms';
//             notiObj['to_user_type'] = 'patient';
//             notiObj['module_type'] = 'order';
//             notiObj['module_id'] = orderData.order_id;
//             notiObj['sub_module_type'] = 'invoice';
//             notiObj['source'] = Number(orderData.source);
//             notiObj['phone_number'] = mobileNumber;
//             notiObj['email'] = email;
//             notiObj['lab_number'] = labNumber;
//             notiObj['created_by'] = orderData.user_id;
//             notiObj['request'] = { mobileNumber, phoneCode };

//             // const smsGatewayData: any = await commonService.getActiveSMSGateWay();
//             // let responseMessage: any = {};
//             // if (smsGatewayData.name === 'SMSGateway1') {
//             //     log.info('Sending sms from SMSGateway1');
//             //     responseMessage = await helperMethods.sendSms(mobileNumber, message, phoneCode);
//             // } else if (smsGatewayData.name === 'SMSGateway2') {
//             //     log.info('Sending sms from SMSGateway2');
//             //     responseMessage = await helperMethods.sendSms2(mobileNumber, message, phoneCode);
//             // };

//             const responseMessage: any = await commonService.sms(mobileNumber, message, phoneCode, orderData.data_area_id);
//             notiObj['response'] = responseMessage;

//             let isSent = true;
//             if (responseMessage && (responseMessage.transactionId || responseMessage.messages)) {
//                 notiObj['is_sent'] = true;
//             } else {
//                 isSent = false;
//                 notiObj['is_sent'] = false;
//                 commonService.triggerEmailForFailedSMS('Invoice', order_unique_id, responseMessage, labNumber);
//             }

//             /** Split the message content and  templateId */
//             const splitMessage: any = await helperMethods.splitMessageAndTemplateId(message);
//             message = (splitMessage.message_content) ? splitMessage.message_content : message;

//             notiObj['body'] = { message };

//             createInvoice.saveNotification(notiObj);
//             return isSent
//         } catch (err) {
//             log.error('Invoice - Error in sendSMS', err);
//             return false;
//         };
//     };

//     /**
//      * Sending invoice email
//      * @param invoiceInfo 
//      * @param fileName 
//      * @param orderData 
//      */
//     async sendEmail(invoiceInfo, fileName, orderData) {
//         try {
//             const order_id = orderData.order_id;
//             const tempInvoicePath = process.env.INVOICE_TEMP_PATH;

//             const attachments: any = [
//                 {
//                     filename: fileName,
//                     path: tempInvoicePath + fileName,
//                     contentType: 'application/pdf'
//                 }
//             ]
//             const patientName = invoiceInfo.patientInfoData.name;
//             // const orderAmount = invoiceInfo.orderInfoData.paid_amount;
//             const orderDate = (invoiceInfo.orderPaymentInfoData && invoiceInfo.orderPaymentInfoData.length && invoiceInfo.orderPaymentInfoData[0].created_date_time) ?
//                 moment(invoiceInfo.orderPaymentInfoData[0].created_date_time).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY'); // Bill date

//             const labNumber = invoiceInfo.orderInfoData.lab_number;
//             // const subject = "Dr.Lal PathLabs Invoice - " + invoiceInfo.orderInfoData.order_unique_id;
//             let subject: any = await commonService.getSMSTextFromLanguageFile('INVOICE_SUBJECT', orderData.data_area_id, orderData.language);
//             subject = subject.replace('<order_unique_id>', invoiceInfo.orderInfoData.order_unique_id);
//             // const body = `Dear ${patientName},
//             // <br/><br/>Thank you for choosing Dr.Lal PathLabs. 
//             // Please find your invoice attached with this email.
//             // <br/>
//             // <br/>
//             // <b>Bill Date:</b> ${orderDate}<br/>
//             // <b>Lab Number:</b> ${labNumber}<br/><br/>
//             // For any queries/assistance you can reach out to us on our Helpline Number: 01139885050
//             // <br/><br/>Regards,<br/>
//             // Team Dr.Lal PathLabs.`

//             const emailHtmlPath = await commonService.getEmailTemplate('email_invoice', orderData.data_area_id);

//             const body = swig.renderFile(emailHtmlPath, {
//                 patient_name: patientName,
//                 order_date: orderDate,
//                 lab_number: labNumber
//             });

//             const notiObj = {};
//             notiObj['user_id'] = orderData.to_user_id;
//             notiObj['sender_id'] = orderData.user_id;
//             notiObj['type'] = notificationType.email;
//             notiObj['type_description'] = 'email';
//             notiObj['to_user_type'] = 'patient';
//             // notiObj['body'] = { message: body };
//             notiObj['module_type'] = 'order';
//             notiObj['module_id'] = order_id;
//             notiObj['sub_module_type'] = 'invoice';
//             notiObj['source'] = Number(orderData.source);
//             notiObj['email'] = invoiceInfo.patientInfoData.email;
//             notiObj['phone_number'] = (invoiceInfo.orderInfoData.patient_phone_number) ? invoiceInfo.orderInfoData.patient_phone_number : invoiceInfo.patientInfoData.phone_number;
//             notiObj['lab_number'] = invoiceInfo.orderInfoData.lab_number;
//             notiObj['created_by'] = orderData.user_id;
//             notiObj['request'] = { email: invoiceInfo.patientInfoData.email, subject, attachments };

//             const emailResponse = await mail.send(invoiceInfo.patientInfoData.email, subject, body, orderData.data_area_id, attachments);


//             notiObj['response'] = emailResponse;


//             let isSent = true;
//             if (emailResponse.messageId) {
//                 notiObj['is_sent'] = true;
//                 const infoObject = {
//                     logHttpReq: true,
//                     jsonObject: emailResponse,
//                     description: 'Email sent successfully'
//                 }
//                 log.info(infoObject);
//             }
//             else {
//                 notiObj['is_sent'] = false;
//                 const errorInfo = {
//                     jsonObject: emailResponse,
//                     description: 'EMAIL SENDING FAILED'
//                 }
//                 log.error('Invoice - Error in sendEmail', errorInfo);
//                 isSent = false;
//             };

//             createInvoice.saveNotification(notiObj);

//             return isSent;

//         } catch (err) {
//             log.error('Invoice - Error in sendEmail', err);
//             createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], err);
//             return false;
//         }
//     }


//     /**
//      * 
//      * @param notificationObj 
//      */
//     async saveNotification(notificationObj) {
//         log.info('Invoice - notification', notificationObj);
//         try {
//             log.info('Saving into notification ', notificationObj.type_description);
//             this.create(notificationModel, notificationObj);
//         } catch (err) {
//             log.error('Invoice - Error in saving notification', err)
//         }
//     }


//     /**
//      * Fromatting address
//      * @param address 
//      */
//     async formatAddress(address) {
//         try {
//             let formattedAddress = '';
//             if (address.pincode === undefined) {
//                 address.pincode = '';
//             }
//             formattedAddress += (address.address === undefined) ? '' : address.address
//             formattedAddress += (address.address === undefined) ? address.locality : ', ' + address.locality
//             formattedAddress += (address.locality === undefined) ? address.city : ', ' + address.city
//             formattedAddress += (address.city === undefined) ? address.state : ', ' + address.state
//             formattedAddress += (address.state === undefined) ? address.pincode : ', ' + address.pincode
//             formattedAddress += '.'
//             return formattedAddress
//         } catch (err) {
//             log.error('Invoice - Error in formatAddress', err);
//             return '';
//         }
//     }

//     /**
//      * Sending Error Email
//      * @param order_id 
//      * @param err 
//      */
//     async errorEmail(order_id, err) {
//         const subject = `LPL 1xview (${process.env.ENVIRONMENT}) - Error in Generate Invoice`;
//         const toMail = process.env.LPL_ADMINS;
//         let body = '<b>Order ID:</b> ' + order_id;
//         body += '<br/><b>Error:</b> <pre>' + JSON.stringify(err, null, 2) + '</pre>';
//         const respp = await mail.send(toMail, subject, body);
//         log.info('Email sent', respp)
//         log.error('Invoice - Error in errorEmail', err)
//     }

//     /**
//      * Converting number to words
//      * @param amount 
//      * @param orderId 
//      */
//     amountInWords(amount, orderId) {
//         // ex 34044 - thirty-four thousand, forty-four
//         try {
//             log.info("Amount", amount)
//             let amountInWords = numberToWords.toWords(amount);
//             if (amountInWords === undefined)
//                 return ''
//             amountInWords = amountInWords.replace(/[^\w\s]/g, ' ').split(' ');
//             for (let i = 0, x = amountInWords.length; i < x; i++) {
//                 if (amountInWords[i] !== '' && amountInWords[i][0] !== undefined)
//                     amountInWords[i] = amountInWords[i][0].toUpperCase() + amountInWords[i].slice(1);
//             }
//             amountInWords = amountInWords.join(" ");
//             return amountInWords + ' Only';
//         } catch (error) {
//             createInvoice.errorEmail(orderId, error)
//             log.error('Invoice - Error while generating invoice PDF', error);
//         }
//     }

//     /**
//      * Getting supplementary list if any
//      * @param invoiceInfo 
//      */

//     async supplementaryTestList(invoiceInfo) {
//         try {
//             const testCodes = _.map(invoiceInfo.testInfoData, 'test_code');
//             const DATAAREAID = (invoiceInfo.orderInfoData.data_area_id) ? invoiceInfo.orderInfoData.data_area_id : process.env.DATAAREAID;
//             const supplementaryIDs: any = [...testCodes];
//             const isLabVistOrder = (invoiceInfo.orderInfoData.is_lab_visit) ? true : false;
//             log.info('supplementaryIDs', supplementaryIDs);

//             const testArr: any = [];
//             for (const [ind, testCode] of testCodes.entries()) {
//                 testArr.push(invoiceInfo.testInfoData[ind]);
//                 const supplementaryResults: any = await supplemenataryTestService.getSupplementary(testCode, DATAAREAID, isLabVistOrder);
//                 log.info('Supplementary Results', supplementaryResults);

//                 if (supplementaryResults.status === true) {
//                     for (const supplementary of supplementaryResults.supplementary_tests) {
//                         const supplementaryTestObject = {};
//                         const suppID: any = supplementary.suppitem_id;

//                         // if (supplementaryIDs.indexOf(suppID) === -1) {
//                         supplementaryTestObject['test_code'] = suppID;
//                         supplementaryTestObject['name'] = supplementary.supp_name;
//                         supplementaryTestObject['net_amount'] = 0;
//                         supplementaryTestObject['unit_price'] = 0;
//                         testArr.push(supplementaryTestObject);
//                         // invoiceInfo.testInfoData.splice(ind + 1, 0, supplementaryTestObject);
//                         supplementaryIDs.push(suppID);
//                         // }
//                     }
//                 }
//             }
//             invoiceInfo.testInfoData = testArr;
//         } catch (err) {
//             log.error('Invoice - Error in supplementaryTestList', err);
//             createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], err)
//         }
//     }

//     /**
//      * 
//      * @param invoiceInfo 
//      */

//     async ETRInfo(invoiceInfo, orderId) {
//         try {
//             const testCodes = _.map(invoiceInfo.testInfoData, 'test_code');

//             const url: any = process.env.INVOICE_ETR_API;
//             const method = 'POST';
//             const headers = { "Content-Type": "application/json" };

//             let timezone = process.env.X_TIMEZONE_VALUE;
//             if (invoiceInfo.orderInfoData.timezone)
//                 timezone = invoiceInfo.orderInfoData.timezone;

//             const payload = {
//                 rasclient_id: invoiceInfo.orderInfoData.registration_lab,
//                 lab_number: invoiceInfo.orderInfoData.lab_number,
//                 group_codes: testCodes,
//                 date_received: createInvoice.convertToTimeZone(invoiceInfo.orderInfoData.collection_date_time, timezone),
//                 agent: "1xview",
//                 r_lab: invoiceInfo.reportLocationInfo.LOCALINVENTLOCATIONID,
//                 request_time: Date.now()
//             }

//             const options = {};
//             options['method'] = method;
//             options['uri'] = url;
//             options['headers'] = headers;
//             options['json'] = true;
//             options['body'] = payload;

//             log.info('ETR Payload', options);

//             const auditObj = {};
//             auditObj['order_id'] = orderId;
//             auditObj['service'] = 'ETR_INFO';
//             auditObj['http_method'] = method;
//             auditObj['request'] = { headers, payload };
//             auditObj['request_url'] = url;
//             auditObj['request_time'] = Date.now();
//             auditObj['created_by'] = '';
//             auditObj['source'] = 'IVOICE';
//             const ETRResponse: any = await thirdPartyAPIService.ETRAPI(method, url, headers, payload);
//             auditObj['response'] = ETRResponse;
//             auditObj['response_time'] = Date.now();
//             auditObj['duration'] = auditObj['response_time'] - auditObj['request_time'];
//             auditObj['error'] = false;
//             auditThirdpartyService.create(auditObj);

//             if (ETRResponse && ETRResponse.statusCode && ETRResponse.statusCode !== 200)
//                 createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], { request: payload, response: ETRResponse, url });

//             const newTestDataInfo: any = [];
//             const etrTestList: any = [];
//             let etrDatetime: any = [];
//             let etrDatetimeWithoutBuffer: any = [];
//             for (const test of invoiceInfo.testInfoData) {
//                 const testObj = {};
//                 testObj['etr_datetime'] = '-'
//                 testObj['test_code'] = test.test_code
//                 testObj['name'] = test.name
//                 testObj['net_amount'] = test.net_amount
//                 testObj['unit_price'] = test.unit_price;
//                 const testDoc: any = {};
//                 if (ETRResponse && ETRResponse.data && ETRResponse.data.detailed_etr) {
//                     for (const data of ETRResponse.data.detailed_etr) {
//                         if (data.group_code === test.test_code) {
//                             log.info('ETR Data ' + test.test_code, data)
//                             testDoc.group_code = data.group_code
//                             testDoc.test_name = data.test_name
//                             if (data.etr_datetime === undefined) {
//                                 testDoc.etr_datetime = '';
//                             }
//                             else {
//                                 testDoc.etr_datetime = data.etr_datetime;
//                                 etrDatetime.push(testDoc.etr_datetime);
//                             }
//                             if (data.etr_datetime_without_buffer === undefined) {
//                                 testDoc.etr_datetime_without_buffer = ''
//                             } else {
//                                 testDoc.etr_datetime_without_buffer = data.etr_datetime_without_buffer;
//                                 etrDatetimeWithoutBuffer.push(testDoc.etr_datetime_without_buffer)
//                             }
//                             if (data.etr_datetime !== undefined)
//                                 testObj['etr_datetime'] = createInvoice.roundTime(data.etr_datetime, timezone);
//                             break;
//                         }
//                     }
//                 }
//                 newTestDataInfo.push(testObj);
//                 if (Object.keys(testDoc).length !== 0)
//                     etrTestList.push(testDoc);

//             };

//             invoiceInfo.testInfoData = newTestDataInfo;
//             etrDatetime = etrDatetime.sort().reverse();
//             etrDatetimeWithoutBuffer = etrDatetimeWithoutBuffer.sort().reverse();
//             const maxEtrDatetime = (etrDatetime.length === 0) ? '' : etrDatetime[0];
//             const maxEtrDatetimeWithoutBuf = (etrDatetimeWithoutBuffer.length === 0) ? '' : etrDatetimeWithoutBuffer[0];

//             return {
//                 ETRResponse, etrInfo: {
//                     tests: etrTestList, max_etr_datetime: maxEtrDatetime,
//                     max_etr_datetime_without_buffer: maxEtrDatetimeWithoutBuf
//                 }
//             };

//             // const responseObject = await auditThirdpartyService.createObject(options, ETRResponse, url, method, false, 'ETR INFO');
//             // auditThirdpartyService.create(responseObject);
//         }
//         catch (err) {
//             log.error('Invoice - Error in supplementaryTestList', err);
//             createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], err)
//         }
//     }

//     /**
//      * ETR Info based on Token
//      * @param invoiceInfo 
//      * @param orderId 
//      */
//     async ETRInfoBasedOnAuthToken(invoiceInfo, orderId) {
//         try {
//             const method = 'POST';
//             const headers: any = { "Content-Type": "application/json" };
//             let token = '';

//             // STEP 1 - Get token api start
//             const redisKey = 'ETR_AUTHTOKEN';
//             let etrAuthenticationResponse: any = '';
//             const etrAuthenticationUrl: any = process.env.INVOICE_ETR_AUTHENTICATION;
//             const tokenExpireTime = constants.invoiceConfig.etr_redis_expire_time - 60; // 5min - 1min => 4min
//             let etrAuthTokenFromRedis = false;

//             // Checking token in redis
//             if (redisService.connect) {
//                 etrAuthenticationResponse = await redisService.connect['get'](String(redisKey));
//             }

//             if (etrAuthenticationResponse && etrAuthenticationResponse.statusCode && etrAuthenticationResponse.statusCode === 200 &&
//                 (etrAuthenticationResponse.data && etrAuthenticationResponse.data.token)) {
//                 token = etrAuthenticationResponse.data.token;
//                 etrAuthTokenFromRedis = true;
//             } else {
//                 const authenticationPayload = {
//                     etruser: process.env.INVOICE_ETR_USER,
//                     password: process.env.INVOICE_ETR_PASSWORD
//                 };

//                 etrAuthenticationResponse = await thirdPartyAPIService.ETRAPI(method, etrAuthenticationUrl, headers, authenticationPayload);

//                 if (etrAuthenticationResponse && etrAuthenticationResponse.statusCode && etrAuthenticationResponse.statusCode === 200 &&
//                     (etrAuthenticationResponse.data && etrAuthenticationResponse.data.token)) {
//                     // Storing token info in redis
//                     token = etrAuthenticationResponse.data.token;

//                     if (redisService.connect && Number(etrAuthenticationResponse.data.expires_in) > tokenExpireTime) {
//                         redisService.connect['ttl'](String(redisKey), JSON.stringify(etrAuthenticationResponse), tokenExpireTime);
//                     }
//                 }
//             }

//             if (!token) {
//                 log.error('ETR token not found error:', etrAuthenticationResponse);
//                 createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], { response: etrAuthenticationResponse, etrAuthenticationUrl });
//                 return { etrAuthenticationResponse, etrInfo: {} };
//             }
//             // Get token api end

//             // STEP 2 - Get ETR info start
//             const testCodes = _.map(invoiceInfo.testInfoData, 'test_code');
//             const url: any = process.env.INVOICE_ETR_AUTH_API;
//             let timezone = process.env.X_TIMEZONE_VALUE;

//             if (invoiceInfo.orderInfoData.timezone)
//                 timezone = invoiceInfo.orderInfoData.timezone;

//             // Request payload
//             const payload = {
//                 rasclient_id: invoiceInfo.orderInfoData.registration_lab,
//                 lab_number: invoiceInfo.orderInfoData.lab_number,
//                 group_codes: testCodes,
//                 date_received: createInvoice.convertToTimeZone(invoiceInfo.orderInfoData.collection_date_time, timezone),
//                 agent: "1xview",
//                 r_lab: invoiceInfo.reportLocationInfo.LOCALINVENTLOCATIONID,
//                 request_time: Date.now()
//             };

//             headers['Authorization'] = token;

//             //  Third party Auditing
//             const auditObj = {};
//             auditObj['order_id'] = orderId;
//             auditObj['service'] = 'ETR_INFO';
//             auditObj['http_method'] = method;
//             auditObj['request'] = { headers, payload, etr_auth_token: etrAuthenticationResponse, etr_auth_token_from_redis: etrAuthTokenFromRedis, service: 'Payments' };
//             auditObj['request_url'] = url;
//             auditObj['request_time'] = Date.now();
//             auditObj['created_by'] = '';
//             // auditObj['source'] = 'INVOICE';

//             // ETR Info api calling
//             const ETRResponse: any = await thirdPartyAPIService.ETRAPI(method, url, headers, payload);

//             auditObj['response'] = ETRResponse;
//             auditObj['response_time'] = Date.now();
//             auditObj['duration'] = auditObj['response_time'] - auditObj['request_time'];
//             auditObj['error'] = false;

//             auditThirdpartyService.create(auditObj);

//             if (ETRResponse && ETRResponse.statusCode && ETRResponse.statusCode !== 200) {
//                 createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], { request: payload, response: ETRResponse, url });

//                 return { ETRResponse, etrInfo: {} };
//             }

//             const newTestDataInfo: any = [];
//             const etrTestList: any = [];
//             let etrDatetime: any = [];
//             let etrDatetimeWithoutBuffer: any = [];

//             for (const test of invoiceInfo.testInfoData) {
//                 const testObj = {};
//                 testObj['etr_datetime'] = '-';
//                 testObj['test_code'] = test.test_code;
//                 testObj['name'] = test.name;
//                 testObj['net_amount'] = test.net_amount;
//                 testObj['unit_price'] = test.unit_price;
//                 const testDoc: any = {};

//                 if (ETRResponse && ETRResponse.data && ETRResponse.data.detailed_etr) {
//                     for (const data of ETRResponse.data.detailed_etr) {
//                         if (data.group_code === test.test_code) {
//                             log.info('ETR Data ' + test.test_code, data);
//                             testDoc.group_code = data.group_code;
//                             testDoc.test_name = data.test_name;

//                             if (data.etr_datetime === undefined) {
//                                 testDoc.etr_datetime = '';
//                             } else {
//                                 testDoc.etr_datetime = data.etr_datetime;
//                                 etrDatetime.push(testDoc.etr_datetime);
//                             }

//                             if (data.etr_datetime_without_buffer === undefined) {
//                                 testDoc.etr_datetime_without_buffer = '';
//                             } else {
//                                 testDoc.etr_datetime_without_buffer = data.etr_datetime_without_buffer;
//                                 etrDatetimeWithoutBuffer.push(testDoc.etr_datetime_without_buffer);
//                             }

//                             if (data.etr_datetime !== undefined)
//                                 testObj['etr_datetime'] = createInvoice.roundTime(data.etr_datetime, timezone);
//                             break;
//                         }
//                     }
//                 }

//                 newTestDataInfo.push(testObj);

//                 if (Object.keys(testDoc).length !== 0)
//                     etrTestList.push(testDoc);

//             }

//             invoiceInfo.testInfoData = newTestDataInfo;
//             etrDatetime = etrDatetime.sort().reverse();
//             etrDatetimeWithoutBuffer = etrDatetimeWithoutBuffer.sort().reverse();
//             const maxEtrDatetime = (etrDatetime.length === 0) ? '' : etrDatetime[0];
//             const maxEtrDatetimeWithoutBuf = (etrDatetimeWithoutBuffer.length === 0) ? '' : etrDatetimeWithoutBuffer[0];

//             return {
//                 ETRResponse, etrInfo: {
//                     tests: etrTestList, max_etr_datetime: maxEtrDatetime,
//                     max_etr_datetime_without_buffer: maxEtrDatetimeWithoutBuf
//                 }
//             };
//         } catch (err) {
//             log.error('Invoice - Error in ETR info', err);
//             createInvoice.errorEmail(invoiceInfo.orderInfoData['_id'], err);

//             return { etrInfo: {} };
//         }
//     }

//     /**
//      * 
//      * @param date 
//      */
//     convertToTimeZone(date, timezone) {
//         const utc: any = momentTimeZone(date);
//         return utc.tz(timezone).format('YYYY-MM-DD HH:mm:ss');
//     }

//     /**
//      * 
//      * @param date
//      * @param timezone 
//      */
//     roundTime(date, timezone) {
//         try {
//             const utc = moment(date);
//             date = utc.tz(timezone).format('YYYY-MM-DD HH:mm:ss');
//             // date = moment(date).format('YYYY-MM-DD HH:mm');
//             const m = moment(date.split(' ')[1], 'HH:mm');
//             const roundUp = m.minute() || m.second() || m.millisecond() ? m.add(1, 'hour').startOf('hour') : m.startOf('hour');
//             const roundedDate = moment(date).format('DD-MM-YYYY') + ' ' + moment(roundUp).format('HH:mm');
//             log.info('Actual data time', date);
//             log.info('Rounded data time', roundedDate);
//             return roundedDate;
//         }
//         catch (err) {
//             log.error('Invoice - Error in roundTime', err)
//             return moment(date).format('YYYY-MM-DD HH:mm');
//         }
//     }


//     /**
//      * 
//      * @param dob 
//      */
//     getAge(dob) {
//         try {
//             log.info('Invoice dob ', dob);
//             const years = moment().diff(moment(dob), 'years');
//             const months = moment().diff(moment(dob), 'months');
//             const days = moment().diff(moment(dob), 'days');
//             log.info('Age cal ', { years, months, days })
//             return { years, months, days };
//         } catch (err) {
//             log.error('Invoice - Error in getAge', err)
//         }
//     }
// }


// export const createInvoice = new CreateInvoice();
