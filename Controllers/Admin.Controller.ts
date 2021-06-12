import { AdminPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import TokenServices from "../Services/Token.Services";
import { IValidateRequest } from "../common/DefineRequest";
import schemaAdmin from "../Validates/Admin.Validate";
import MerchantServices from "../Services/Merchant.Services";
import { defaultTypeStatus } from "../common/constants";
import Validate from "../Validates/Validate";
export default class AdminController extends Controller {
  path = "/Admin";
  routes = [
    {
      path: `/${AdminPath.APPROVE_MERCHANT}`,
      method: Methods.POST,
      handler: this.handleApproveMerchant,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaAdmin.updateMerchant),
      ],
    },
    {
      path: `/${AdminPath.REJECT_MERCHANT}`,
      method: Methods.POST,
      handler: this.handleRejectMerchant,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaAdmin.updateMerchant),
      ],
    },
    {
      path: `/${AdminPath.CANCEL_MERCHANT}`,
      method: Methods.POST,
      handler: this.handleCancelMerchant,
      localMiddleware: [
        TokenServices.verify,
        Validate.body(schemaAdmin.updateMerchant),
      ],
    },
    {
      path: `/${AdminPath.GET_MERCHANT_BY_STATUS}`,
      method: Methods.GET,
      handler: this.handleGetMerchantByStatus,
      localMiddleware: [
        TokenServices.verify,
      ],
    },
    {
      path: `/${AdminPath.GET_TRANSPORT_BY_ADDRESS}`,
      method: Methods.GET,
      handler: this.handleRejectMerchant,
      localMiddleware: [
        TokenServices.verify,
      ],
    }
  ];
  constructor() {
    super();
  }

  async handleApproveMerchant(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      let merchantInfo = req.value.body;
      merchantInfo.status = defaultTypeStatus.active;
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.adminUpdateMerchant(
        idUser,
        merchantInfo
      );
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleRejectMerchant(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      let merchantInfo = req.value.body;
      merchantInfo.status = defaultTypeStatus.deleted;
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.adminUpdateMerchant(
        idUser,
        merchantInfo
      );
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleCancelMerchant(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      let merchantInfo = req.value.body;
      merchantInfo.status = defaultTypeStatus.inActive;
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.adminUpdateMerchant(
        idUser,
        merchantInfo
      );
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  async handleGetMerchantByStatus(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const idUser = req.value.body.token.data;
      const status = req.query.status;
      const merchantServices: MerchantServices = new MerchantServices();
      const result = await merchantServices.getMerchantByStatus(idUser, status);
      if (result.success) {
        super.sendSuccess(res, result.data, result.message);
      } else {
        super.sendError(res, result.message);
      }
    } catch {
      super.sendError(res);
    }
  }

  //   async handleDelete(
  //     req: IValidateRequest | any,
  //     res: Response,
  //     next: NextFunction
  //   ): Promise<void> {
  //     try {
  //       const idUser = req.value.body.token.data;
  //       let { id } = req.query;
  //       const categoryServices: MerchantServices = new MerchantServices();
  //       const result = await categoryServices.deleteCategory(idUser, id);
  //       if (result.success) {
  //         super.sendSuccess(res, result.data, result.message);
  //       } else {
  //         super.sendError(res, result.message);
  //       }
  //     } catch {
  //       super.sendError(res);
  //     }
  //   }
}
