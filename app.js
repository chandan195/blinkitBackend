import "dotenv/config";
import AdminJS from "adminjs";
import fastify from "fastify";

import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { buildAdminRouter } from "./src/config/setup.js";
import { registerRoute } from "./src/routes/index.js";

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = fastify();


await registerRoute(app);

  const admin = new AdminJS({})
  await buildAdminRouter(app);




  app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    // app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `Blink it start on http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });
};

start();
