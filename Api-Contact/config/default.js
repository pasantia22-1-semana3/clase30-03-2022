import dotenv from 'dotenv';

const env = dotenv.config();

export const config={
    api:{
        hostname: process.env.HOSTNAME ||'127.0.0.1',
        port: process.env.PORT || 3000,
        name: process.env.NAME || 'Api-Contact'
    },
    doc:{
        definition:{
          openapi: "3.0.0",
          info:{
            title:process.env.NAME || 'Api-Contact',
            version:"1.0.0"
          },
          server:[
            {
                url:"http://localhost:4000"
            }
            ]
        },
        apis:[`api/contact/routes/*.js`],
    }
}