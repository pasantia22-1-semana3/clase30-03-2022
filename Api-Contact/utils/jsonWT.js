import jwt from 'jsonwebtoken';
import { config } from '../config/default.js';

export const jwtToken = {
    generateToken: (user) => {
        return jwt.sign({
            id: user.id,
            username: user.username,
            rol: user.rol
        }, config.jwt.secret, {
            expiresIn: '1h'
        });
    },
    verifyToken: (token) => {
        return jwt.verify(token, config.jwt.secret);
    }
}