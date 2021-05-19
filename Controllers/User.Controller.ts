import { UserPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import Validate from "../Validates/Validate";
import schemaUser from "../Validates/User.Validate";
import { IValidateRequest } from "../common/DefineRequest";
import UserServices from "../Services/User.Services";
export default class UserController extends Controller {
  path = "/User";
  routes = [
    {
      path: `/${UserPath.UPDATE}`,
      method: Methods.PUT,
      handler: this.handleUpdate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaUser.updateUser),
      ],
    },
    {
      path: `/${UserPath.GET_INFO}`,
      method: Methods.GET,
      handler: this.handleGetInfo,
      localMiddleware: [TokenServices.verify],
    },
    {
      path: `/${UserPath.FAVORITE}`,
      method: Methods.POST,
      handler: this.handleFavorite,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaUser.favorite),
      ],
    },
    {
      path: `/${UserPath.GET_FAVORITES}`,
      method: Methods.GET,
      handler: this.handleGetFavorites,
      localMiddleware: [TokenServices.verify],
    },
    {
      path: `/${UserPath.ADD_ADDRESS}`,
      method: Methods.POST,
      handler: this.handleAddAddress,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaUser.addAddress),
      ],
    },
    {
      path: `/${UserPath.DELETE_ADDRESS}`,
      method: Methods.DELETE,
      handler: this.handleDeleteAddress,
      localMiddleware: [TokenServices.verify],
    },
  ];
  constructor() {
    super();
  }

  async handleUpdate(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const user = req.value.body;
      const userServices: UserServices = new UserServices();
      const result = await userServices.updateInfo(idUser, user);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleFavorite(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const { id } = req.value.body;
      const userServices: UserServices = new UserServices();
      const result = await userServices.favorite(id, idUser);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (error) {
      super.sendError(res);
    }
  }

  async handleGetFavorites(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const userServices: UserServices = new UserServices();
      const result = await userServices.getListFavorites(idUser);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }

  async handleGetInfo(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const userServices: UserServices = new UserServices();
      const result = await userServices.getInfo(idUser);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }

  async handleAddAddress(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const address = req.value.body;
      const userServices: UserServices = new UserServices();
      const result = await userServices.addAddress(idUser, address);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }

  async handleDeleteAddress(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const { id } = req.query;
      const userServices: UserServices = new UserServices();
      const result = await userServices.deleteAddress(idUser, id);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }
}
