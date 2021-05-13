import { CategoryPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import Validate from "../Validates/Validate";
import schemaCategory from "../Validates/Category.Validate";
import { IValidateRequest } from "../common/DefineRequest";
import CategoryServices from "../Services/Category.Services";
export default class CategoryController extends Controller {
  path = "/Category";
  routes = [
    {
      path: `/${CategoryPath.CREATE}`,
      method: Methods.POST,
      handler: this.handleCreate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaCategory.createCategory),
      ],
    },
    {
      path: `/${CategoryPath.UPDATE}`,
      method: Methods.PUT,
      handler: this.handleUpdate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaCategory.updateCategory),
      ],
    },
    {
      path: `/${CategoryPath.GET_INFO}`,
      method: Methods.GET,
      handler: this.handleGetAll,
      localMiddleware: [],
    },
    {
      path: `/${CategoryPath.DELETE}`,
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
      let category = req.value.body;
      const categoryServices: CategoryServices = new CategoryServices();
      const result = await categoryServices.createCategory(idUser, category);
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
      const category = req.value.body;
      const categoryServices: CategoryServices = new CategoryServices();
      const result = await categoryServices.updateCategory(idUser, category);
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
      const categoryServices: CategoryServices = new CategoryServices();
      const result = await categoryServices.getAllCategory();
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
      const categoryServices: CategoryServices = new CategoryServices();
      const result = await categoryServices.deleteCategory(idUser, id);
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
