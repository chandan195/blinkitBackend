import "dotenv/config";
import AdminJS from "adminjs";
import fastify from "fastify";

import { connectDB } from "./src/config/connect.js";
import { PORT } from "./src/config/config.js";
import { buildAdminRouter } from "./src/config/setup.js";
import { registerRoute } from "./src/routes/index.js";
import fastifySocketIO from "fastify-socket.io";

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = fastify();

  app.register(fastifySocketIO, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
    transports: ["websocket"],
  });

  await registerRoute(app);

  const admin = new AdminJS({});
  await buildAdminRouter(app);

  app.listen({ port: PORT }, (err, addr) => {
    // app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `Blink it start on http://localhost:${PORT}${admin.options.rootPath}`
      );
    }
  });

  app.ready().then(() => {
    app.io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("joinRoom", (orderId) => {
        socket.join(orderId);
        console.log(`User Joined room ${orderId}`);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected ");
      });
    });
  });
};

start();
