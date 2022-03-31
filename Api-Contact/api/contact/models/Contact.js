export class Contact{
    constructor(item){
        this.id = 0;
        this.name = item.name;
        this.lastname = item.lastname;
        this.address = item.address;
        this.phone = item.phone;
        this.birthday = item.birthday;
        this.email = item.email;
        this.Avatar = item.avatar;
        this.profile = item.profile;
    }

    get getId(){
        return this.id;
    }
    get getName(){
        return this.name;
    }
    get getLastName(){
        return this.lastname;
    }
    get getAddress(){
        return this.address;
    }
    get getPhone(){
        return this.phone;
    }


}

