import { ContactJsonFileModel } from "../models/JsonFileModel.js";
import { Contact } from "../models/Contact.js";
/**
 * Instance of model
 * @param {object} Contact // The contact object
 */
const model = new ContactJsonFileModel();
/**
 * Contact controller
 */
export class ContactController{
    constructor(){}
    
    createNew(contact){
        let newContact = new Contact(contact);
        return model.save(newContact);
    }
    getAll(){
        let data = model.all();
        if(data){
            return data;
        }
        return null;
    }

    getFindById(id){
        if(id){
            let data = model.findById(id);
            if(data){
                return data;
            }
            return null;
        }
        return null;
    }

    updateOneContact(id,contact){
        if(id && contact){
            let result = model.update(id,contact);
            if(result){
                return 'Contact updated successfully';
            }
            return 'Contact not updated';
        }
        return 'Contact not updated';
    }

    deleteOneContact(id){
        if(id){
            let result = model.destroy(id);
            if(result){
                return 'Contact deleted successfully';
            }
            return'Contact not deleted';
        }
        return 'Contact not deleted';
    }
}
