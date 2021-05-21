import { PaymentPath } from "../common/RoutePath";
import { Response, NextFunction } from "express";
import Controller, { Methods } from "./Controller";
import { IValidateRequest } from "../common/DefineRequest";
import PaypalServices from "../Services/Paypal.Services";
import VnpayServices from "../Services/VNPay.Services";
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
      handler: this.handleCancel,
      localMiddleware: [],
    },
    {
      path: `/${PaymentPath.VNPAY_RETURN}`,
      method: Methods.GET,
      handler: this.handleVnpayReturn,
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
      const paymentServices: PaypalServices = new PaypalServices();
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
  async handleCancel(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const paymentServices: PaypalServices = new PaypalServices();
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

  async handleVnpayReturn(
    req: IValidateRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.query;
      const vnpayServices: VnpayServices = new VnpayServices();
      const result = await vnpayServices.vpnReturn(body);
      if (result.success) {
        res.render("success", { code: "00"});
        console.log(result);
      } else {
        res.render("success", { code: "97" });
      }
    } catch (e) {
      console.log(e);
      super.sendError(res);
    }
  }
}
