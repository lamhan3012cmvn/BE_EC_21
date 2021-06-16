import { ReturnServices } from "../Interfaces/Services";
import {
  defaultStatusPackage,
  defaultTypeOrders,
  defaultTypeStatus,
} from "../common/constants";
import paypal from "paypal-rest-sdk";
import { User } from "../Models";
import MerchantCartServices from "./MerchantCart.Services";
import PackageService from "./Package.Services";
import ClientCartServices from "./ClientCart.Services";
import PackageClientTemp from "../Models/PackageClientTemp";
import PackageMerchantTemp from "../Models/PackageMerchantTemp";

export default class PaypalService {
  constructor() {}

  public payment = async (transactions: number, body: any, next: any) => {
    const dollar = transactions / 23050;
    const dollar2f = parseFloat(dollar.toFixed(2));
    const dollar3f = parseFloat(dollar.toFixed(3));
    const formatTransactions =
      dollar % dollar2f == 0
        ? dollar2f
        : dollar2f >= dollar3f
        ? dollar2f
        : dollar2f + 0.01;
    console.log(formatTransactions + " PAYPAL");
    const return_url =
      body.typeOrders == defaultTypeOrders.POINT
        ? `?price=${formatTransactions}&idUser=${body.idUser}&point=${body.point}&typeOrders=${body.typeOrders}`
        : `?price=${formatTransactions}&idUser=${body.idUser}&typeOrders=${body.typeOrders}&typeCart=${body.typeCart}&idPackageTemp=${body.idPackageTemp}`;
    console.log(return_url);
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
                name: "Phi van chuyen",
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
          description: "Phi van chuyen Van Transport",
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

    const idPackageTemp = body.idPackageTemp;
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
        console.log("success");
        console.log(typeCart);
        if (error == null) {
          if (body.typeOrders === defaultTypeOrders.POINT) {
            await User.findOneAndUpdate(
              { _id: body.idUser },
              { $inc: { point: ~~body.point } },
              { new: true }
            );
            next(error, payment);
          } else {
            const user = await User.findById(body.idUser);
            if (!user) {
              next(error, payment);
            } else {
              if (typeCart == "MERCHANT") {
                const packageMerchantTemp =
                  await PackageMerchantTemp.findOneAndUpdate(
                    { _id: idPackageTemp, status: defaultTypeStatus.active },
                    { status: defaultTypeStatus.deleted },
                    { new: true }
                  );
                if (!packageMerchantTemp) {
                  next(error, payment);
                }
                const dataPackage = JSON.parse(
                  JSON.stringify(packageMerchantTemp)
                );
                console.log(dataPackage);
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
                } = dataPackage;
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
                    name: user.fullName,
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
                next(error, payment);
              } else {
                const packageClientTemp =
                  await PackageClientTemp.findOneAndUpdate(
                    { _id: idPackageTemp, status: defaultTypeStatus.active },
                    { status: "DELETED" },
                    { new: true }
                  );
                if (!packageClientTemp) {
                  next(error, payment);
                }
                const dataPackage = JSON.parse(
                  JSON.stringify(packageClientTemp)
                );
                console.log(dataPackage);
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
                } = dataPackage;
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
                    name: user.fullName,
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
                next(error, payment);
              }
            }
          }
        }
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

  public functionInit = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
}
