import {jwtToken} from "../../utils/jsonWT.js";
import {response} from "../../response/response.js";
import {HttpStatusCode} from "../../utils/httpStatusCode.js";
export  const verifyApiToken = async (req,res,next)=>{
    let token = req.headers['authorization'];
    if(token){
        let result= await jwtToken.verifyToken(token);
        if(result){
            req.user = result;
            next();
        }else{
            return response.error(req,res,'Token invalid',HttpStatusCode.UNAUTHORIZED);
        }
        
    }else{
        return response.error(req,res,'Token is required',HttpStatusCode.UNAUTHORIZED);
    }
}   