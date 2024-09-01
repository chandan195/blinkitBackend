

import "dotenv/config";
import fastify from "fastify";

import { connectDB } from "./src/config/connect.js";

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = fastify();
  const Port = process.env.PORT || 3000;
  app.listen({ port: Port, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Blink it start on http://localhost:${Port}`);
    }
  });
};

start();
