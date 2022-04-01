import { User } from "../models/User.js";
import { UserJsonFileModel } from "../models/User.model.js";

const model = new UserJsonFileModel();
export class UserController{
    constructor(){}

    getAll(){
        return model.all();
    }

    getById(id){
        return model.findById(id);
    }

    create(user){
        let newUser = new User(user);
        newUser.encryptPassword(user.password);
        return model.save(newUser);
    }

    update(id, user){
        return model.update(id, user);
    }

    delete(id){
        return model.delete(id);
    }
}