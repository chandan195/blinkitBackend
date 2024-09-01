import AdminJS from "adminjs";
import AdminJSFastify from "adminjs/fastify";
import * as AdminJsMongoose from "@adminjs/mongoose";
import * as Models from "../model/index.js";
import { Store } from "@fastify/session";
import { authenticate, COOKIE_PASSWORD } from "./config.js";
AdminJS.registerAdapter(AdminJsMongoose);

export const admin = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    { resource: Models.Branch },
  ],
  branding: {
    companyName: "Blinkit",
    withMadeWithLove: false,
  },
  rootPath: "/admin",
});

export const buildAdminRoter = async (app) => {
  await AdminJSFastify.buildAutheticatedRoter(admin, {
   authenticate,
   cookiePassword :COOKIE_PASSWORD,
   cookieName:"adminjs", 
  }, app, {
    Store: session,
    saveUnintialized :true,
    secret :COOKIE_PASSWORD,
    cookie:{
        httpOnly:process.env.NODE_ENV !== 'production',
        secure:process.env.NODE_ENV !== 'production',
    }
  });
};