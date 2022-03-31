import fs from 'fs';

/**
 * @class JsonFileModel
 * @description Model for JsonFile
 * @param {object} entity - Entity to be saved
 */

export class ContactJsonFileModel{ 
    constructor(){
        this._dataPath = './db/ContactData.json';
    }

    readJsonFile(){
        let fileContents = fs.readFileSync(this._dataPath, 'utf8');
        if(fileContents){
            return JSON.parse(fileContents);
        }
        return [];
    }

    writeJsonFile(data){
        let jsonData = JSON.stringify(data,null,'');
        fs.writeFileSync(this._dataPath, jsonData);
    }

    generateId(){
        let data = this.readJsonFile();
        let lastItem = data.pop();
        if(lastItem){
            return ++lastItem.id;
        }
        return 1;
    }

    save(item){
        try {
            let data = this.readJsonFile();
            item.id= this.generateId();
            data.push(item);
            this.writeJsonFile(data);
            return item;
        } catch (error) {
            return null;
        }
    }

    all(){
        return this.readJsonFile();
    }

    findById(id){
        let data = this.readJsonFile();
        return data.find(item => item.id == parseInt(id));
    }

    update(id,contact){
        contact.id = parseInt(id);
        let data = this.readJsonFile();
        let updateItems = data.map(item => {
            if(item.id == parseInt(id)){
                return item = contact;
            }
            return item;
        })
        this.writeJsonFile(updateItems);
        return id;
    }

    destroy(id){
        let data = this.readJsonFile();
        let updateItems = data.filter(item => item.id != parseInt(id));
        this.writeJsonFile(updateItems);
        return id;
    }
}

