import { AuthJsonModel } from "../models/Auth.models.js";
import {encryptOption} from "../../../utils/bcrypt.js";
import {jwtToken} from "../../../utils/jsonWT.js";

const model = new AuthJsonModel();

export class AuthController{
    constructor(){}
    authUser(user){
        if(user.username){
            let data = model.getUserByUsername(user.username);
            if(data){
                if(encryptOption.comparePassword(user.password,data.password)){
                    let token= jwtToken.generateToken(user);
                    let result = {
                        auth: true,
                        id: data.id,
                        username: data.username,
                        token: token,
                        rol: data.rol||'user',	
                        message: 'Login success'
                    }
                    return result;
                }
            }
            return null;
        }else if(user.email){
            let data = model.gerUserByEmail(user.email);
            if(data){
                if(encryptOption.comparePassword(user.password,data.password)){
                    let token= jwtToken.generateToken(user);
                    let result = {
                        auth: true,
                        id: data.id,
                        username: data.username,
                        token: token,
                        rol: data.rol||'user',	
                        message: 'Login success'
                    }
                    return result;
                }
            }
            return null;
        }else{
            return null;
        }
    }
}