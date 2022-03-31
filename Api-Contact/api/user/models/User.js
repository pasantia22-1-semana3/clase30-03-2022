import bcrypt from 'bcrypt';
import { encryptOption } from '../../../utils/bcrypt.js';

export class User{
    constructor(user){
        this.id = 0;
        this.username = user.username;
        this.email = user.email;
        this.password = this.encryptPassword(user.password);
        this.created_at = new Date().getDate();
    }
    
    encryptPassword(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
}