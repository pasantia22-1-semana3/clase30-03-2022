import { HttpStatusCode } from "../utils/httpStatusCode.js";

export const response = {
    success: (req,res, message,status) => {
        let statusCode = status || HttpStatusCode.OK;
        let data = message ||'';
        res.status(200).json({
            error: false, 
            status: statusCode,
            body: data,
        });
    },
    
    error: (req,res, message,status) => {
        let statusCode = status || HttpStatusCode.INTERNAL_SERVER_ERROR;
        let data = message ||'Internal server error';
        res.status(statusCode).json({
            error: true, 
            status: statusCode,
            body: data,
        });
    }
}