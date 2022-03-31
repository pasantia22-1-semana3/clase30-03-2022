import bcrypt from 'bcrypt';

export const encryptOption={
    encrypt:function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    comparePassword:function(password,hash){
        return bcrypt.compareSync(password, hash);
    }
}