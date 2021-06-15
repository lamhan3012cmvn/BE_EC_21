import { ReturnServices } from "../Interfaces/Services";
import { defaultStatusPackage, defaultTypeOrders } from "../common/constants";
import paypal from "paypal-rest-sdk";
import { User } from "../Models";
import { Package } from "../Models";
import StringifySafe from "json-stringify-safe";
import MerchantCartServices from "./MerchantCart.Services";
import PackageService from "./Package.Services";
import ClientCartServices from "./ClientCart.Services";

export default class PaypalService {
  constructor() {}

  public payment = async (
    transactions: number,
    body: any,
    data: any,
    next: any
  ) => {
    const dollar = transactions / 23050;
    const dollar2f = parseFloat(dollar.toFixed(2));
    const dollar3f = parseFloat(dollar.toFixed(3));
    const formatTransactions =
      dollar % dollar2f == 0
        ? dollar2f
        : dollar2f >= dollar3f
        ? dollar2f
        : dollar3f + 0.01;
    const encodeData = this.encodeQueryParameter(data);
    const return_url =
      body.typeOrders == defaultTypeOrders.POINT
        ? `?price=${formatTransactions}&idUser=${body.idUser}&point=${body.point}&typeOrders=${body.typeOrders}`
        : `?price=${formatTransactions}&idUser=${body.idUser}&data=${encodeData}&typeOrders=${body.typeOrders}&cartType=${body.cartType}`;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: process.env.paypal_success + return_url,
        cancel_url: process.env.paypal_cancel,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Phí vận chuyển",
                sku: "001",
                price: `${formatTransactions}`,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: `${formatTransactions}`,
          },
          description: "Phí vận chuyển Van Transport",
        },
      ],
    };
    paypal.payment.create(create_payment_json, (error: any, payment: any) =>
      next(error, payment)
    );
    try {
    } catch (error) {
      console.log(error);
      return { message: "An error occurred", success: false };
    }
  };

  public paymentSuccess = async (body: any, next: any) => {
    const payerId = body.PayerID;
    const paymentId = body.paymentId;
    const price = body.price;
    const data = this.decodeQueryParameter(body.data);
    const typeCart = body.typeCart;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: `${price}`,
          },
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async function (error, payment) {
        if (error == null) {
          if (body.typeOrders === defaultTypeOrders.POINT) {
            await User.findOneAndUpdate(
              { _id: body.idUser },
              { $inc: { point: ~~body.point } },
              { new: true }
            );
          } else {
            // await Package.findOneAndUpdate(
            //   { _id: body.idPackage, status: defaultStatusPackage.deleted },
            //   { status: defaultStatusPackage.waitForConfirmation },
            //   { new: true }
            // );
            if (typeCart == "MERCHANT") {
              const {
                title,
                description,
                estimatedDate,
                FK_Address,
                FK_Transport,
                FK_SubTransport,
                FK_SubTransportAwait,
                recipientAddress,
                recipientLat,
                recipientLng,
                recipientPhone,
                prices,
                distance,
                weight,

                senderName,
                senderPhone,
                senderAddress,
                senderLat,
                senderLng,
              } = data;
              const merchantCartServices: MerchantCartServices =
                new MerchantCartServices();
              const resMerchantCart = await merchantCartServices.paymentCart(
                body.idUser
              );

              const obj: any = {
                status: defaultStatusPackage.waitForConfirmation,
                title,
                description,
                estimatedDate,
                FK_Recipient: body.idUser,
                FK_Transport,
                FK_SubTransport,
                FK_SubTransportAwait,
                prices,
                distance,
                weight,
                FK_Product: resMerchantCart.data.products, //Get from cart
                FK_ProductType: "Standard", //Get from cart
                recipient: {
                  name: body.fullName,
                  location: {
                    address: recipientAddress,
                    coordinate: {
                      lat: recipientLat,
                      lng: recipientLng,
                    },
                  },
                  phone: recipientPhone,
                },
                sender: {
                  name: senderName,
                  location: {
                    address: senderAddress,
                    coordinate: {
                      lat: senderLat,
                      lng: senderLng,
                    },
                  },
                  phone: senderPhone,
                },
              };
              const packageService: PackageService = new PackageService();
              await packageService.createPackage(obj);
            } else {
              const {
                title,
                description,
                estimatedDate,

                FK_Transport,
                FK_SubTransport,
                FK_SubTransportAwait,

                recipientName,
                recipientAddress,
                recipientLat,
                recipientLng,
                recipientPhone,
                prices,
                distance,
                weight,

                senderPhone,
                senderAddress,
                senderLat,
                senderLng,
                typePayment,
              } = data;
              const clientCartServices: ClientCartServices =
                new ClientCartServices();
              const resClientCart = await clientCartServices.paymentCart(
                body.idUser
              );

              const obj: any = {
                status: defaultStatusPackage.waitForConfirmation,
                title,
                description,
                estimatedDate,
                FK_Recipient: body.idUser,
                FK_Transport,
                FK_SubTransport,
                FK_SubTransportAwait,
                prices,
                distance,
                weight,
                FK_Product: resClientCart.data.products, //Get from cart
                FK_ProductType: "Standard", //Get from cart
                recipient: {
                  name: recipientName,
                  location: {
                    address: recipientAddress,
                    coordinate: {
                      lat: recipientLat,
                      lng: recipientLng,
                    },
                  },
                  phone: recipientPhone,
                },
                sender: {
                  name: body.fullName,
                  location: {
                    address: senderAddress,
                    coordinate: {
                      lat: senderLat,
                      lng: senderLng,
                    },
                  },
                  phone: senderPhone,
                },
              };
              const packageService: PackageService = new PackageService();
              await packageService.createPackage(obj, false);
            }
          }
        }
        next(error, payment);
      }
    );
  };

  public cancelPayment = async (): Promise<ReturnServices> => {
    try {
      return {
        message: "Payment is canceled",
        success: false,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public refundPayment = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  encodeQueryParameter = (data: object): any => {
    return encodeURIComponent(StringifySafe(data)); // Use StringifySafe to avoid crash on circular dependencies
  };

  decodeQueryParameter = (query: string): any => {
    return JSON.parse(decodeURIComponent(query));
  };

  public functionInit = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
}
