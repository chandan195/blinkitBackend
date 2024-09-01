import "dotenv/config"
import fastifySession from "@fastify/session"
import ConnectMongoDBSession from "connect-mongodb-session"
import {Admin} from "../model/index.js";

const MongoDBStore = ConnectMongoDBSession(fastifySession);

export const  sessionStore = new  MongoDBStore({
    uri:process.env.MONGO_URI,
    collection :"sessions",
});

sessionStore.on("error",(error)=>{
    console.log("sessionStore error", error)
});``

export const authenticate = async (email , password)=>{
    if(email == "chandan@gmail.com" && password == "12345678"){
 return Promise.resolve({email: email, password: password});
    } else{
        return null;
    }};

    export const PORT = process.env.PORT || 3000;
    export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;