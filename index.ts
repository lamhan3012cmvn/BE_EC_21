import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import {urlencoded} from "body-parser";
import cors from "cors";
// express
import express, { Application, RequestHandler } from "express";
// important typings
import Server from "./common/Server";

import Controller from "./Controllers/Controller";
import AuthController from "./Controllers/Auth.Controller";
import TransportController from "./Controllers/Transport.Controller";

const controllers: Array<Controller> = [new AuthController(),new TransportController()];
const globalMiddleware: Array<RequestHandler> = [
  express.json(),
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
    const httpServer = server.run();
  });
