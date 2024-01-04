import jwt from "jsonwebtoken";
import { userService } from "../service/userService";

const generateTokens = async (user) => {
    try {
        const payload = { _id: user._id, roles: user.roles };

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "15000m" }
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "1d" }
        );

        const userToken: any = await userService.findToken({ userId: user._id });
        if (userToken) await userToken.remove();

        await userService.saveUserToken({ userId: user._id, token: refreshToken });
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateTokens;
