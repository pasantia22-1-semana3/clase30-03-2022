import { encryptOption } from '../../../utils/bcrypt.js';

export class User{
    constructor(user){
        this.id = 0;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.created_at = this.getDateNow();
    }
    
    getDateNow(){
        let time = Date.now();
        let date = new Date(time);
        return date.toDateString();
    }

    encryptPassword(password){
        this.password = encryptOption.encrypt(password);
    }
}