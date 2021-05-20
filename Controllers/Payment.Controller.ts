import { PaymentPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import { IValidateRequest } from "../common/DefineRequest";
import PaymentServices from "../Services/Paypal.Services";
export default class PaymentController extends Controller {
  path = "/Payment";
  routes = [
    {
      path: `/${PaymentPath.PAYPAL_SUCCESS}`,
      method: Methods.GET,
      handler: this.handleSuccess,
      localMiddleware: [],
    },
    {
      path: `/${PaymentPath.PAYPAL_CANCEL}`,
      method: Methods.GET,
      handler: this.handleUpdate,
      localMiddleware: [],
    },
  ];
  constructor() {
    super();
  }

  async handleSuccess(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let paymentInfo = req.query;
      const paymentServices: PaymentServices = new PaymentServices();
      await paymentServices.paymentSuccess(
        paymentInfo,
        (error: any, payment: any) => {
          {
            if (error) {
              super.sendError(res, "Payment failure");
            } else {
              super.sendSuccess(res, payment, "Successfully payment");
            }
          }
        }
      );
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
      const paymentServices: PaymentServices = new PaymentServices();
      const result = await paymentServices.cancelPayment();
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
