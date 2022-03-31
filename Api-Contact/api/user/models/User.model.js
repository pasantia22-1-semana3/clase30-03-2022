import fs from 'fs';

export class UserJsonFileModel{
    constructor(){
        this._dataPath = './db/UserData.json';
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

    update(id,user){
        user.id = parseInt(id);
        newUser.id = parseInt(id);
        let data = this.readJsonFile();
        let updateItems = data.map(item => {
            if(item.id == parseInt(id)){
                return item = user;
            }
            return item;
            }
        );
        this.writeJsonFile(updateItems);
    }
}