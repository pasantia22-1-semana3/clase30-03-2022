import {response} from "../../../response/response.js";
import { HttpStatusCode } from "../../../utils/httpStatusCode.js";
import { verifyApiToken } from "../../midleware/Autorization.js";

export class ContactRouter{
    constructor(express,controller){
        this.router = express.Router();
        this._ctl = controller;
        this.setRoutes();
    }
    setRoutes(){
/**
 * @swagger
 * components:
 *  schemas:
 *      Contact:
 *          type: object
 *          properties:
 *              name: 
 *                type: string
 *                description: name of contact
 *              lastname: 
 *                type: string
 *                description: lastname of contact
 *              address: 
 *                type: string
 *                description: addres of contact
 *              phone:
 *                type: string
 *                description: phone of contact
 *              email:
 *                type: string
 *                description: email of contact
 *              birthday:
 *                type: string
 *                description: birthday of contact
 *              avatar:
 *                type: string
 *                description: avatar of contact
 *              profile:
 *                type: string
 *                description: profile of contact 
 *          required:
 *              - name
 *              - lastname
 *              - address
 *              - phone
 *              - email
 *              - birthday
 *              - avatar
 *              - profile
 *          example:
 *              name: Juan
 *              lastname: Perez
 *              address: Calle 123
 *              phone: 123456789
 *              email: correo@gmail.com
 *              birthday: 12/12/12
 *              avatar: https://www.google.com
 *              profile: https://www.google.com
 */


/**
 * @swagger
 * /api/v1/contact:
 *  get:
 *    summary: return all contacts
 *    tags: [Contact]   
 *    responses:
 *      200:
 *        description: all contacts!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Contact'
 *                    
 */
        this.router.get("/", verifyApiToken,this.getAllContacts.bind(this));
/**
 * @swagger
 * /api/v1/contact:
 *  post:
 *    summary: create a new contact
 *    tags: [Contact]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Contact'
 *    responses:
 *      200:
 *        description: new contact created!
 *      500: 
 *        description: Inter Server Error
 *                    
 */
        this.router.post("/", this.createNewContact.bind(this));
/**
 * @swagger
 * /api/v1/contact/{id}:
 *  get:
 *    summary: return one contact
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the contact id   
 *    responses:
 *      200:
 *        description: one contact!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Contact'
 *      404:
 *        description: note not found                 
 */
        this.router.get("/:id", this.getContactFindById.bind(this));
/**
 * @swagger
 * /api/v1/contact/{id}:
 *  put:
 *    summary: update one contact
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the contact id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Contact'   
 *    responses:
 *      200:
 *        description: contact updated!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Contact'
 *      404:
 *        description: contact not found                 
 */
        this.router.put("/:id", this.updateContact.bind(this));
/**
 * @swagger
 * /api/v1/contact/{id}:
 *  delete:
 *    summary: return one contact
 *    tags: [Contact]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the contact id   
 *    responses:
 *      200:
 *        description: contact is deleted!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/Contact'
 *      404:
 *        description: contact not found and not deleted                
 */
        this.router.delete("/:id", this.deleteContact.bind(this));
    }

    getAllContacts(req,res){
        try {
            let result = this._ctl.getAll();
            return response.success(req,res,result,HttpStatusCode.OK);
        } catch (error) {
            console.error(error);
            let message = 'No contacts found';
            return response.error(req,res,message,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    createNewContact(req,res){
        try {
            let result = this._ctl.createNew(req.body);
            if(result){
                let message = 'Contact created';
                return response.success(req,res,message,HttpStatusCode.OK);
            }else{
                return response.error(req,res,'Contact not created',HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            console.error(error);
            let message = 'Contact not created';
            return response.error(req,res,message,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    getContactFindById(req,res){
        try {
            let result = this._ctl.getFindById(req.params.id);
            if(result){
                return response.success(req,res,result,HttpStatusCode.OK);
            }else{
                return response.error(req,res,'Contact not found',HttpStatusCode.NOT_FOUND);
            }
        } catch (error) {
            console.error(error);
            let message = 'Contact not found';
            return response.error(req,res,message,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    updateContact(req,res){
        try {
            let result = this._ctl.updateOneContact(req.params.id,req.body);
            if(result){
                let message = 'Contact updated';
                return response.success(req,res,message,HttpStatusCode.OK);
            }else{
                return response.error(req,res,'Contact not updated',HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            console.error(error);
            let message = 'Contact not updated';
            return response.error(req,res,message,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    deleteContact(req,res){
        try {
            let result = this._ctl.deleteOneContact(req.params.id);
            if(result){
                let message = 'Contact deleted';
                return response.success(req,res,message,HttpStatusCode.OK);
            }else{
                return response.error(req,res,'Contact not deleted',HttpStatusCode.INTERNAL_SERVER_ERROR);
            }
        } catch (error) {
            console.error(error);
            let message = 'Contact not deleted';
            return response.error(req,res,message,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}

