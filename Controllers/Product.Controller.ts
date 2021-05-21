import { ProductPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import Validate from "../Validates/Validate";
import schemaProduct from "../Validates/Product.Validate";
import { IValidateRequest } from "../common/DefineRequest";
import ProductServices from "../Services/Product.Services";
export default class ProductController extends Controller {
  path = "/Product";
  routes = [
    {
      path: `/${ProductPath.CREATE}`,
      method: Methods.POST,
      handler: this.handleCreate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaProduct.createProduct),
      ],
    },
    {
      path: `/${ProductPath.UPDATE}`,
      method: Methods.PUT,
      handler: this.handleUpdate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaProduct.updateProduct),
      ],
    },
    {
      path: `/${ProductPath.GET_BY_MERCHANT}`,
      method: Methods.GET,
      handler: this.handleGetByMerchant,
      localMiddleware: [],
    },
    {
      path: `/${ProductPath.GET_BY_GROUP_PRODUCT}`,
      method: Methods.GET,
      handler: this.handleGetByGroup,
      localMiddleware: [],
    },
    {
      path: `/${ProductPath.FILTER_ALL}`,
      method: Methods.GET,
      handler: this.handleFilterAll,
      localMiddleware: [],
    },
    {
      path: `/${ProductPath.FILTER_BY_CATEGORY}`,
      method: Methods.GET,
      handler: this.handleFilterByCategory,
      localMiddleware: [],
    },
    {
      path: `/${ProductPath.DELETE}`,
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
      const product = req.value.body;
      const productServices: ProductServices = new ProductServices();
      const result = await productServices.createProduct(product);
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
      const product = req.value.body;
      const productServices: ProductServices = new ProductServices();
      const result = await productServices.updateProduct(product);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }
  async handleGetByMerchant(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query;
      const productServices: ProductServices = new ProductServices();
      const result = await productServices.getProductByMerchant(query);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleGetByGroup(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query;
      const productService: ProductServices = new ProductServices();
      const result = await productService.getProductByGroup(query);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleFilterAll(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query;
      const productService: ProductServices = new ProductServices();
      const result = await productService.filterAllProducts(query);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleFilterByCategory(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query;
      const productService: ProductServices = new ProductServices();
      const result = await productService.filterProductByCategory(query);
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
      let { id } = req.query;
      const categoryServices: ProductServices = new ProductServices();
      const result = await categoryServices.deleteProduct(id);
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
