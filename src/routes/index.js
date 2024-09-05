 
import { authRoutes } from "./auth.js";

 const prefix ="/api";


 export const registerRoute = async (fastify) =>{
fastify.register(authRoutes ,{prefix:prefix});
 }