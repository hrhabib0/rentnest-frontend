import jwt from "jsonwebtoken";

// verify token
const verifyToken = (token: string, secret: string) => {

    try {
        const verifiedToken = jwt.verify(token, secret);
        // console.log(verifiedToken, "util theke")
        // return verifiedToken;
        return {
            success: true,
            data: verifiedToken
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // throw new Error(error.message)
        console.log("Token verification failed:", error);
        return {
            success: false,
            error: error.message
        }
    }
}
export const jwtUtils = {
    verifyToken
}