import { MerchantPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import Validate from "../Validates/Validate";
import schemaMerchant from "../Validates/Merchant.Validate";
import { IValidateRequest } from "../common/DefineRequest";
import MerchantServices from "../Services/Merchant.Services";
export default class MerchantController extends Controller {
  path = "/Merchant";
  routes = [
    {
      path: `/${MerchantPath.CREATE}`,
      method: Methods.POST,
      handler: this.handleCreate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaMerchant.createMerchant),
      ],
    },
    {
      path: `/${MerchantPath.UPDATE}`,
      method: Methods.PUT,
      handler: this.handleUpdate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaMerchant.updateMerchant),
      ],
    },
    {
      path: `/${MerchantPath.GET_INFO}`,
      method: Methods.GET,
      handler: this.handleGet,
      localMiddleware: [TokenServices.verify],
    },
  ];
  constructor() {
    super();
  }

  async handleCreate(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      let device = req.value.body;
      device.FK_createUser = idUser;
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.createMerchant(idUser, device);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleUpdate(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const merchant = req.value.body;
      console.log(merchant);
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.updateMerchant(idUser, merchant);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleGet(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.getMerchant(idUser);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }
}
