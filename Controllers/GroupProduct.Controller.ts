import { GroupProductPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import Validate from "../Validates/Validate";
import schemaGroupProduct from "../Validates/GroupProduct.Validate";
import { IValidateRequest } from "../common/DefineRequest";
import GroupProductServices from "../Services/GroupProduct.Services";
export default class CategoryController extends Controller {
  path = "/GroupProduct";
  routes = [
    {
      path: `/${GroupProductPath.CREATE}`,
      method: Methods.POST,
      handler: this.handleCreate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaGroupProduct.createCategory),
      ],
    },
    {
      path: `/${GroupProductPath.UPDATE}`,
      method: Methods.PUT,
      handler: this.handleUpdate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaGroupProduct.updateCategory),
      ],
    },
    {
      path: `/${GroupProductPath.GET_INFO}`,
      method: Methods.GET,
      handler: this.handleGetAll,
      localMiddleware: [],
    },
    {
      path: `/${GroupProductPath.DELETE}`,
      method: Methods.DELETE,
      handler: this.handleDelete,
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
      let groupProduct = req.value.body;
      groupProduct.FK_createUser = idUser;
      const categoryServices: GroupProductServices = new GroupProductServices();
      const result = await categoryServices.createGroupProduct(groupProduct);
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
      let groupProduct = req.value.body;
      groupProduct.FK_createUser = idUser;
      const categoryServices: GroupProductServices = new GroupProductServices();
      const result = await categoryServices.updateGroupProduct(groupProduct);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }
  async handleGetAll(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { idMerchant } = req.query;
      const categoryServices: GroupProductServices = new GroupProductServices();
      const result = await categoryServices.getAllGroupProduct(idMerchant);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleDelete(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      let { id } = req.query;
      const categoryServices: GroupProductServices = new GroupProductServices();
      const result = await categoryServices.deleteGroupProduct(idUser, id);
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
