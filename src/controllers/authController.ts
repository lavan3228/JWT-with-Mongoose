import { loggerFactory } from '../utils/logger/loggerFactory';
const log = loggerFactory.getLogger('orderController');
// import express, { Application } from "express";
// import { orderModel } from "../models/order";
// import validation from "../joiValidation";
// import Author from "../models/category";
// import { any } from "joi";
// import { userModel } from '../models/user';
import { response } from '../utils/response';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomstring } from 'randomstring';
import { userService } from '../service/userService';
import generateTokens from "../utils/generateToken";
import VerifyRefreshToken from "../utils/verifyRefreshToken";
import UserToken from '../models/userToken';
import * as fs from 'fs';

// import * as AWS from 'aws-sdk';
// import chalk from 'chalk';
// const chalk = require('chalk');
// const awsRegion = process.env.BUCKET_REGION_NAME;

// AWS.config.getCredentials((err) => {
//     if (err) {
//         console.log('Error in fetching credentials', err);
//     } else {
//         AWS.config.credentials;
//     }
//   });
//   AWS.config.update({ region: awsRegion });
//   const s3 = new AWS.S3({});
class AuthController {

    /**
     * Upload s3 and sending email(new)
     * @param fileName 
     * @param csvFileCreate 
     * @param misAudit 
     */
    // uploadS3SendEmail = async (fileName, csvFileCreate, misAudit) => {
    //     try {
    //         const toMailId = misAudit.email;

    //         /** Upload file to S3 */
    //         const uploadedFile: any = await this.uploadFileToS3(fileName, csvFileCreate.csv_file_name, csvFileCreate.csv_file_name);
    //         // log.info('uploadedFile info:', uploadedFile);

    //         if (uploadedFile.isUploaded === false)
    //             return { status: false, isUploaded: false, message: 'File upload to S3 Failed' };

    //         /** Get Signed url */
    //         const signedURL: any = await this.getSignedUrl(fileName, Number(signedUrlExpiry), misReportBucketName);
    //         // log.info('signedURL', signedURL);

            
    //     } catch (err) {
    //         return err;
    //     }
    // }

    /**
     * 
     * @param fileName 
     * @param dataAreaId 
     * @returns 
     */
    // async getMailTemplateFromDataBaseOld(fileName, template_url) {
    //     let htmlPath: any = '';
    //     try {
    //         log.info({ jsonObject: fileName, description: 'getMailTemplateFromDataBase: start' });
    //         const templatePath: any = process.env.EMAIL_TEMPLATE_PATH;
    //         const s3BucketName: any = process.env.EMAIL_TEMPLATES_BUCKET;

    //         const params = {
    //             Bucket: s3BucketName,
    //             Key: template_url,
    //         };
    //         try {
    //             const data = await s3.getObject(params).promise();
    //             // Save the binary content to a file
    //             // await fs.writeFile(htmlPath, data.Body, () => null);
    //             log.info({ jsonObject: { fileName, htmlPath }, description: 'getMailTemplateFromDataBase: File saved successfully.' });
    //         } catch (err) {
    //             console.error('getMailTemplateFromDataBase: Catch Error ', err);
    //         }
                
    //     } catch (err) {
    //         // log.error('Error in common service getSmsTextFromDataBase', err);
    //         return '';
    //     }
    // }

    // /**
    //  * Get presigned url for etrf file
    //  */
    // getPreSignedUrl = async (accesskey, secretKey, awsRegionName, key, expiry, bucketName) => {
    //     const credentialss: any = {
    //         accessKeyId: accesskey,
    //         secretAccessKey: secretKey,
    //     };

    //     AWS.config.update({ credentials: credentialss, region: awsRegionName });
    //     var s3Bucket = new AWS.S3();

    //     const params = {
    //         Bucket: bucketName,
    //         Key: key,
    //         Expires: expiry, // validity of the link in seconds
    //     };

    //     const url = await new Promise((resolve, reject) => {
    //         s3Bucket.getSignedUrl('getObject', params, (err, url) => {
    //             if (err) reject(err)

    //             resolve(url)
    //         })
    //     });

    //     return url
    // }

    // deleteUrl = async (key, bucketName) => {
    //     const params = {
    //         Bucket: bucketName,
    //         Key: key
    //     };

    //     const data = await new Promise((resolve, reject) => {
    //         s3.deleteObject(params, (err, data) => {
    //             if (err) reject(err);

    //             resolve(data);
    //         })
    //     })
    //     return data;
    // }


    // getSignedUrl = async (key, expiry, bucketName) => {
    //     const params = {
    //         Bucket: bucketName,
    //         Key: key,
    //         Expires: expiry, // validity of the link in seconds
    //     }
    //     const url = await new Promise((resolve, reject) => {
    //         s3.getSignedUrl('getObject', params, (err, url) => {
    //             if (err) reject(err)

    //             resolve(url)
    //         })
    //     })
    //     return url
    // }

    /**
     * Method for building the URL for an alternate of S3 Signed URL
     * @param bucket 
     * @param path 
     * @param token 
     * @param appId 
     * @param subBucket 
     * @returns 
     */
    // mappingS3Url = async (bucket, path, token, appId, subBucket: any = "", S: any = "") => {

    //     const VAPT_LOGIC_ENABLED = true;
    //     const VAPT_ALLOWED_APP_IDS_FOR_S3 = (process.env.VAPT_ALLOWED_APP_IDS_FOR_S3) ? (process.env.VAPT_ALLOWED_APP_IDS_FOR_S3).split(',').map(appId => appId.trim()) : [];
    //     if (VAPT_LOGIC_ENABLED && VAPT_ALLOWED_APP_IDS_FOR_S3.includes(appId)) {
    //         // bucket = (this.isValid(subBucket)) ? bucket + "/" + subBucket : bucket;

    //         // Generating the signature
    //         const requestInObj: any = {
    //             "B": bucket,
    //             "K": path,
    //             "x-auth-token": token,
    //             "x-app-id": appId
    //         };

    //         // if (this.isValid(S)) {
    //         //     requestInObj["S"] = S;
    //         // }

    //         // sort the object keys in asc order
    //         let sortedByKeys = {};
    //         Object.keys(requestInObj).sort().forEach(key => {
    //             sortedByKeys[key] = requestInObj[key];
    //         });

    //         log.info({
    //             jsonObject: { sortedMethodInputs: JSON.stringify(sortedByKeys) }, description: 'mappingS3Url: Sorted method inputs'
    //         });

    //         // const signature = md5(JSON.stringify(sortedByKeys));

    //         // let mappingUrl: any = process.env.S3_IMAGE_RENDER_BASE_URL + '?B=' + bucket + '&K=' + path + '&x-auth-token=' + token + '&x-app-id=' + appId + '&x-signature=' + signature;

    //         // if (this.isValid(S)) {
    //         //     mappingUrl = mappingUrl + '&S=' + S;
    //         // }

    //         // return mappingUrl;
    //     } else {
    //         const SIGNED_URL_EXPIRY_IN_SECONDS = 3600; // 1 hour
    //         if (S && S.toLowerCase() === 'p') {
    //             // return await this.getPpSignedUrl(path, SIGNED_URL_EXPIRY_IN_SECONDS, bucket);
    //         } else {
    //             return await this.getSignedUrl(path, SIGNED_URL_EXPIRY_IN_SECONDS, bucket);
    //         }
    //     }
    // }



    /**
     * save user details
     * @param req 
     * @param res 
     * @returns 
     */
    registerUser = async (req, res) => {
        try {
            const payload = req.body.attributes;
            console.log(payload.email, 'payload');

            const condition = { email: payload.email };

            const userexist = await userService.find(condition);

            console.log(userexist, "jdhfh");
            if (userexist) {
                return res.status(400).send({
                    message: 'User with given email already exist',
                });
            }

            // if(payload.password !== payload.confirmpassword) {
            //     return response.send(req, res, {}, "Passwords are not matching");
            // }

            const salt = await bcrypt.genSalt(Number(process.env.SALT));

            // Encrypt password
            const hashedPassword = await bcrypt.hash(payload.password, salt);

            console.log(hashedPassword, "fff")
            const saveUserData = {
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                password: hashedPassword,
                mobileNumber: payload.mobileNumber,
                saltKey: salt
            }

            // saveUserData["age"] = 21;

            // saving user details here
            const newUser = await userService.save(saveUserData);
            log.info({ jsonObject: newUser, description: "Save User data" });

            if (!newUser) {
                return response.error(req, res, {}, "NOT able to save user in DB")
            }

            return response.send(req, res, {}, "Registered Sucessfully")
        } catch (err: any) {
            console.log(err, "*******")
            return response.error(req, res, {}, 'Registered Internal Server Error')
        }
    }


    /**
     * sign in user
     * @param req 
     * @param res 
     * @returns 
     */
    loginUser = async (req, res) => {
        log.info("sign in method start");
        try {
            // console.log(chalk.blue("login started!"));
            const payload = req.body.attributes;
            log.info({ jsonObject: payload, description: "123 User data" });
            log.error({ jsonObject: payload, description: "456 User data" });
            console.log(payload, "sai payload");
            log.info("sign in method start");
            const userCondition = {
                email: payload.email
            }

            // const hashedPassword = await bcrypt.compare(payload.password, 10);

            const user: any = await userService.find(userCondition);
            log.info({ jsonObject: user, description: "get User data" });

            if (!user) {
                console.log("sai jdjdj")
                return response.error(req, res, {}, "User Not Found");
            }

            const checkAPassword = await bcrypt.compare(payload.password, user.password);

            console.log(checkAPassword, "chack")
            if (!checkAPassword) {
                log.error("jjdj");
                log.error({ jsonObject: {}, description: "error invalid credentials" });
                return response.error(req, res, {}, "Invalid credentials")
            }

            const { accessToken, refreshToken } = await generateTokens(user);

            // //create token 
            // const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
            // // put token in cookie 
            // res.cookie('token', accessToken, { expires: new Date(Date.now() + 1000 * 600) })

            // //create refreshToken token 
            // const refreshToken = jwt.sign({ _id: user._id } + Date.now().toString(), process.env.REFRESH_TOKEN_SECRET);
            // // put refreshToken in cookie 
            // res.cookie('token', refreshToken, { expires: new Date(Date.now() + 999999) })


            // res.cookie('jwt', newRefreshToken, {
            //     httpOnly: true, 
            //     secure: true,
            //     sameSite: 'Strict',  // or 'Lax', it depends
            //     maxAge: 604800000,  // 7 days
            // });


            //         //create token
            // const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            // //put token in cookie
            // res.cookie("token", token, { expire: new Date() + 9999 });

            // //send response to front end
            // const { _id, name, email, role } = user;
            // return res.json({ token, user: { _id, name, email, role } });

            // send response to front end 
            const { _id, name, email, role } = user;
            return response.send(req, res, { accessToken, refreshToken, user: { _id, name, email, role } }, "Logged in sucessfully")

        } catch (err: any) {
            console.log(err, "**********")
            return response.error(req, res, {}, 'Internal Server Error')
        }

    }

    isSignedin = (req, res, next) => {
        // Check if user is signed in
        if (req.session && req.session.userId) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized. Please sign in.' });
        }
    };

    isAuthenticated = (req, res, next) => {
        let checker = (req.profile && req.auth && req.profile_id == req.auth._id);
        if (!checker) {
            return response.error(req, res, {}, "Failed")
        }
        next()

        // if (req.user) {
        //     // User is authenticated, allow access to the route
        //     next();
        //   } else {
        //     // User is not authenticated, respond with an error or redirect to login page
        //     res.status(401).json({ error: 'Unauthorized. Please log in.' });
        //   }
    }

    isAdmin = (req, res, next) => {
        if (req.profile.role === 0) {
            return response.error(req, res, { code: 403 }, "Failed")
        }
        next()

        // if (req.user && req.user.role === 'admin') {
        //     // User is an admin, allow access to the route
        //     next();
        //   } else {
        //     // User is not an admin, respond with an error or redirect
    }

    // get new access token
    verifyRefreshToken = async (req, res) => {
        const payload = req.body;
        console.log("verify refresh token start")
        const tokenDetails: any = await VerifyRefreshToken(payload.refreshToken);
        console.log(tokenDetails, "hdhdf")
        if (tokenDetails.error === false) {
            const payload = { _id: tokenDetails.payload._id, roles: tokenDetails.roles };
            const accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: "15m" }
            );
            const refreshToken = jwt.sign(
                payload,
                process.env.REFRESH_TOKEN_PRIVATE_KEY,
                { expiresIn: "1d" }
            );
            return res.status(200).json({
                status: true,
                accessToken, refreshToken,
                message: "Access token created successfully",
            });
        }
        return res.status(400).json(tokenDetails.message);
    }


    // logout
    logoutUser = async (req, res) => {
        log.info("sign out method start")
        try {
            const userToken = await userService.find({ token: req.body.refreshToken });
            if (!userToken) {
                console.log("dndd")
                return response.send(req, res, { status: true, message: "Logged Out Sucessfully" }, "Success")
            }

            //             es.clearCookie("token")
            //   res.json({
            //     message: "User signout successfully"
            //   });
            console.log("djjd")
            await userService.delete({ token: req.body.refreshToken });
            res.status(200).json({ status: true, message: "Logged Out Sucessfully lavan" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }

    /**
     * Uploading file to S3 bucket
     * @param fileName 
     * @param files 
     */
    uploadFileToS3(fileName, files, filePath) {
        try {
            return new Promise(async (resolve, reject) => {
                // log.info({"AWS Config-MIS-uploadFileToS3:":  JSON.stringify(config)});

                const readStream = fs.createReadStream(files);
                // const client = credentials;

                // const writeStream = client.upload({
                //     container: misReportBucketName, // Bucket name
                //     remote: fileName, // file.originalFilename
                //     acl: 'private'
                // });

                // await writeStream.on('error', (wsErr) => {
                //     log.error('Error in upload', wsErr);

                //     if (filePath && fs.existsSync(filePath))
                //         fs.unlinkSync(filePath);

                //     return resolve({ isUploaded: false });
                // });

                // await writeStream.on('success', (file) => {
                //     log.info('File Remove', files);

                //     if (filePath && fs.existsSync(filePath))
                //         fs.unlinkSync(filePath);

                //     resolve({ isUploaded: true, file });
                // });

                // readStream.pipe(writeStream);
            });
        } catch (error) {
            const errorInfo = {
                jsonObject: error,
                description: 'Error In uploadFileToS3 - FileUploadService'
            };
            log.error(errorInfo);

            if (filePath && fs.existsSync(filePath))
                fs.unlinkSync(filePath);

            return { isUploaded: false, message: 'SERVER-ERROR' };
        }
    }
}

export const authController = new AuthController();
