 
import { authRoutes } from "./auth.js";
import { productRoutes ,categoryRoutes } from "./product.js";
 const prefix ="/api";


 export const registerRoute = async (fastify) =>{
fastify.register(authRoutes ,{prefix:prefix});
fastify.register(productRoutes ,{prefix:prefix});
fastify.register(categoryRoutes ,{prefix:prefix});
 }