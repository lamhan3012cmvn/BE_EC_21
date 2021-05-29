import { CouponPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import Validate from "../Validates/Validate";
import schemaCoupon from "../Validates/Coupon.Validate";
import { IValidateRequest } from "../common/DefineRequest";
import CouponServices from "../Services/Coupon.Services";
export default class CouponController extends Controller {
  path = "/Coupon";
  routes = [
    {
      path: `/${CouponPath.CREATE}`,
      method: Methods.POST,
      handler: this.handleCreate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaCoupon.createCoupon),
      ],
    },
    {
      path: `/${CouponPath.UPDATE}`,
      method: Methods.PUT,
      handler: this.handleUpdate,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaCoupon.updateCoupon),
      ],
    },
    {
      path: `/${CouponPath.GET_INFO}`,
      method: Methods.GET,
      handler: this.handleGetAll,
      localMiddleware: [],
    },
    {
      path: `/${CouponPath.DELETE}`,
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
      let coupon = req.value.body;
      const couponServices: CouponServices = new CouponServices();
      const result = await couponServices.createCoupon(idUser, coupon);
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
      const coupon = req.value.body;
      const couponServices: CouponServices = new CouponServices();
      const result = await couponServices.updateCoupon(idUser, coupon);
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
      const couponServices: CouponServices = new CouponServices();
      const result = await couponServices.getAllCoupon()
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
      const couponServices: CouponServices = new CouponServices();
      const result = await couponServices.deleteCoupon(idUser, id);
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
