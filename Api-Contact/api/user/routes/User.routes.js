import {response} from "../../../response/response.js";
import { HttpStatusCode } from "../../../utils/httpStatusCode.js";


export class UserRoutes{
    constructor(express,controller){
        this.router = express.Router();
        this._ctl = controller;
        this.registerRoutes();
    }
    
    

    registerRoutes(){
        this.router.get('/', this.getAllUser.bind(this));
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this.newUser.bind(this));
        this.router.put('/:id', this.updateUser.bind(this));
       // this.router.delete('/:id', this._ctl.delete);
    }
    async getAllUser(req,res){
        try {
            let result = await this._ctl.getAll();
            response.success(req,res,result,HttpStatusCode.OK);
        } catch (error) {
            console.log(error);
            response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserById(req,res){
        try {
            let result = await this._ctl.getById(req.params.id);
            response.success(req,res,result,HttpStatusCode.OK);
        } catch (error) {
            console.log(error);
            response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async newUser(req,res){
        try {
            let result = await this._ctl.create(req.body);
            if(result){
                let message = `User ${result.username} has been created`;
                response.success(req,res,message,HttpStatusCode.OK);
            }
        } catch (error) {
            console.log(error);
            response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(req,res){
        try {
          let result = this._ctl.update(req.params.id,req.body);
          response.success(req,res,result,HttpStatusCode.OK);  
        } catch (error) {
            console.log(error);
            response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}