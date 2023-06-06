import jwt from "jsonwebtoken";
import { userService } from "../service/userService";


const VerifyRefreshToken = async (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    console.log(refreshToken, "jdjtoken");

    const userToken = await userService.findToken({ token: refreshToken });
    console.log(userToken, "mddkdk")
    if (!userToken) {
        console.log("dmdd")
        return ({ error: true, message: "Invalid refresh token" });
    }

    return jwt.verify(refreshToken, privateKey, (error, payload) => {
        console.log("mani")
        if (error) {
            console.log(error, "jdj")
            return ({
                error: true,
                message: "Invalid refresh token"
            })
        } else {
            console.log("dhddhj")
            return {
                payload,
                error: false,
                message: "Valid refresh token"
            }
        }

    });
};

export default VerifyRefreshToken;
