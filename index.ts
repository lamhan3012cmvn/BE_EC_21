import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { urlencoded } from "body-parser";
import cors from "cors";
import path from "path";
// express
import express, { Application, RequestHandler } from "express";
// important typings
import Server from "./common/Server";

import Controller from "./Controllers/Controller";
import AuthController from "./Controllers/Auth.Controller";
import TransportController from "./Controllers/Transport.Controller";
import DeviceController from "./Controllers/Device.Controller";
import MerchantController from "./Controllers/Merchant.Controller";
import TransportSubController from "./Controllers/TransportSub.Controller";
import CategoryController from "./Controllers/Category.Controller";
import GroupProductController from "./Controllers/GroupProduct.Controller";
import ProductController from "./Controllers/Product.Controller";
import PackageController from "./Controllers/Package.Controller";
import UserController from "./Controllers/User.Controller";
import PaymentController from "./Controllers/Payment.Controller";

const controllers: Array<Controller> = [
  new AuthController(),
  new TransportController(),
  new TransportSubController(),
  new DeviceController(),
  new MerchantController(),
  new CategoryController(),
  new GroupProductController(),
  new ProductController(),
  new PackageController(),
  new UserController(),
  new PaymentController(),
];
const globalMiddleware: Array<RequestHandler> = [
  express.json(),
  express.static(path.join(__dirname, "public")),
  urlencoded({ extended: false }),
  cors({ origin: true }),
  morgan("combined"),
];

const PORT: number = Number(process.env.PORT!);
const server: Server = new Server(PORT, `${process.env.DB_URL}`);

Promise.resolve()
  .then(() => server.initDatabase())
  .then(() => {
    server.loadMiddleware(globalMiddleware);
    server.loadControllers(controllers);
    const httpServer = server.run(path.join(__dirname, "views"));
  });
