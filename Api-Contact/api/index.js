import express from "express";
import Server from "./Server.js";
import { config } from "../config/default.js";
import { ContactRouter } from "./contact/routes/Contact.routes.js";
import { ContactController } from "./contact/controller/Contact.ctl.js";
import { UserRoutes } from "./user/routes/User.routes.js";
import { UserController } from "./user/controller/User.ctl.js";
import { AuthRoutes } from "./auth/routes/Auth.routes.js";
import {AuthController} from "./auth/controller/Auth.ctl.js";





/**
 * @param {string} host // The hostname of the server
 * @param {string} port // The port of the server
 * @param {string} name // The name of the server
 */
function main(config) {
  try {
    const contactCtl = new ContactController();
    const userCtl = new UserController();
    const authCtl = new AuthController();
    const routes ={
      contact: new ContactRouter(express,contactCtl).router,
      user: new UserRoutes(express,userCtl).router,
      auth: new AuthRoutes(express,authCtl).router 
    } 
    const server = new Server(config,routes);
    server.start();
  } catch (error) {
    let message = error.message;
    console.error(message);
  }
}

main(config);

