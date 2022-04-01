import {response} from "../../../response/response.js";
import { HttpStatusCode } from "../../../utils/httpStatusCode.js";
import { jwtToken } from "../../../utils/jsonWT.js";

/**
 * class Route
 */
export class AuthRoutes{
    constructor(express,controller){
        this.router = express.Router();
        this._ctl = controller;
        this.registerRoutes();
    }

    registerRoutes(){
        this.router.post('/',this.login.bind(this));
    }

    login(req,res){
        let {username,email,password} = req.body;
        if(username || email && password){
            try {
                let user = this._ctl.authUser(req.body);
                if(user){
                    return response.success(req,res,user,HttpStatusCode.OK);
                }else{
                    let result={
                        auth:false,
                        id:0,
                        username:'',
                        token:'',
                        rol:'',	
                        message: 'Invalid username or password'
                    }
                    return response.error(req,res,result,HttpStatusCode.UNAUTHORIZED);
                }
            } catch (error) {
                let message = error.message;
                return response.error(req,res,message,HttpStatusCode.BAD_REQUEST);
            }
        }else{
            let message = 'Username and password are required';
            return response.error(req,res,message,HttpStatusCode.BAD_REQUEST);
        }
    }
}