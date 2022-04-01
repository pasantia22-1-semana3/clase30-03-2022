import express from "express";
import morgan from 'morgan';
import cors from 'cors';
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { root } from '../utils/constRoutes.js';


/**
 * Create the server
 * @param {string} hostname // The hostname of the server
 * @param {string} port // The port of the server
 * @param {string} name // The name of the server
 * @returns {express.Application}
 */
export default class Server{
    constructor(config,routes){
      this._api = express();
      this._hostname = config.api.hostname;
      this._port = config.api.port;
      this._name = config.api.name;
      this._contact = routes.contact;
      this._user = routes.user;
      this._auth = routes.auth;
      this._swaggerSpec = config.doc;
      this.setMiddleware();
      this.setRoutes();
    }

    // Set the middleware
    setMiddleware(){
      this._api.use(express.json());
      this._api.use(express.urlencoded({extended:true}));
      this._api.use(morgan('dev'));
      this._api.use(cors());
    }
    // Set the routes
    setRoutes(){
      this._api.use(root.CONTACT,this._contact);
      this._api.use(root.USER,this._user);
      this._api.use(root.DOCS,swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(this._swaggerSpec)))
      this._api.use(root.LOGIN,this._auth);
    }
    // Start the server
    start(){
      try {
        this._api.set('trust proxy', this._hostname);
        this._api.listen(this._port,()=>{
          console.log(`${this._name} is running at http://${this._hostname}:${this._port}`);
        })
      } catch (error) {
        let errorMessage = error.message;
        return errorMessage;      
      }
    }   
}