

import "dotenv/config";
import fastify from "fastify";

import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = fastify();
 

  
  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Blink it start on http://localhost:${PORT}`);
    }
  });
};

start();
