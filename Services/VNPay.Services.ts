import { ReturnServices } from "../Interfaces/Services";
import {
  defaultStatusPackage,
  defaultTypeOrders,
  defaultTypeStatus,
} from "../common/constants";
import { User } from "../Models";
import dateFormat from "dateformat";
import PackageService from "./Package.Services";
import ClientCartServices from "./ClientCart.Services";
import MerchantCartServices from "./MerchantCart.Services";
import PackageMerchantTemp from "../Models/PackageMerchantTemp";
import PackageClientTemp from "../Models/PackageClientTemp";

export default class VNPayService {
  constructor() {}

  public payment = async (
    body: any,
    headers: any,
    connection: any,
    socket: any
  ): Promise<ReturnServices> => {
    try {
      var ipAddr =
        headers["x-forwarded-for"] ||
        connection.remoteAddress ||
        socket.remoteAddress ||
        connection.socket.remoteAddress;
      const transactions = body.amount * 100;
      const external_return_url =
        body.typeOrders == defaultTypeOrders.POINT
          ? `?price=${transactions}&idUser=${body.idUser}&point=${body.point}&typeOrders=${body.typeOrders}`
          : `?price=${transactions}&idUser=${body.idUser}&idPackageTemp=${body.idPackageTemp}&typeOrders=${body.typeOrders}&typeCart=${body.typeCart}`;

      var tmnCode = process.env.vnp_TmnCode;
      var secretKey = process.env.vnp_HashSecret;
      var vnpUrl = process.env.vnp_Url;
      var returnUrl = process.env.vnp_ReturnUrl;

      var date = new Date();

      var createDate = dateFormat(date, "yyyymmddHHmmss");
      var orderId = dateFormat(date, "HHmmss");
      var bankCode = body.bankCode;

      var orderInfo = body.orderDescription;
      var orderType = body.orderType;
      var locale = body.language;
      if (locale === null || locale === "") {
        locale = "vn";
      }
      var currCode = "VND";
      var vnp_Params: any = {};
      vnp_Params["vnp_Version"] = "2";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      // vnp_Params['vnp_Merchant'] = ''
      vnp_Params["vnp_Locale"] = locale;
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = orderInfo;
      vnp_Params["vnp_OrderType"] = orderType;
      vnp_Params["vnp_Amount"] = transactions;
      vnp_Params["vnp_ReturnUrl"] = returnUrl + external_return_url;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
      }

      vnp_Params = this.sortObject(vnp_Params);

      var querystring = require("qs");
      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

      var sha256 = require("sha256");

      var secureHash = sha256(signData);

      vnp_Params["vnp_SecureHashType"] = "SHA256";
      vnp_Params["vnp_SecureHash"] = secureHash;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });
      return {
        message: "Successfully redirect link payment",
        success: true,
        data: { code: "00", url: vnpUrl },
      };
    } catch (error) {
      console.log(error);
      return { message: "An error occurred", success: false };
    }
  };

  public vpnReturn = async (body: any): Promise<ReturnServices> => {
    try {
      var vnp_Params = {
        vnp_Amount: body.vnp_Amount,
        vnp_BankCode: body.vnp_BankCode,
        vnp_BankTranNo: body.vnp_BankTranNo,
        vnp_CardType: body.vnp_CardType,
        vnp_OrderInfo: body.vnp_OrderInfo,
        vnp_PayDate: body.vnp_PayDate,
        vnp_ResponseCode: body.vnp_ResponseCode,
        vnp_TmnCode: body.vnp_TmnCode,
        vnp_TransactionNo: body.vnp_TransactionNo,
        vnp_TransactionStatus: body.vnp_TransactionStatus,
        vnp_TxnRef: body.vnp_TxnRef,
        vnp_SecureHashType: body.vnp_SecureHashType,
        vnp_SecureHash: body.vnp_SecureHash,
      };

      const idPackageTemp = body.idPackageTemp;
      const typeCart = body.typeCart;

      var secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = this.sortObject(vnp_Params);

      var secretKey = process.env.vnp_HashSecret;

      var querystring = require("qs");
      var signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

      var sha256 = require("sha256");

      var checkSum = sha256(signData);

      if (secureHash === checkSum) {
        if (body.typeOrders === defaultTypeOrders.POINT) {
          await User.findOneAndUpdate(
            { _id: body.idUser },
            { $inc: { point: ~~body.point } },
            { new: true }
          );
        } else {
          // Update Package
          // await Package.findOneAndUpdate(
          //   { _id: body.idPackage, status: defaultStatusPackage.deleted },
          //   { status: defaultStatusPackage.waitForConfirmation },
          //   { new: true }
          // );
          const user = await User.findById(body.idUser);
          if (!user) {
            return {
              message: "Payment failure",
              success: false,
            };
          }
          if (typeCart == "MERCHANT") {
            const packageMerchantTemp = await PackageMerchantTemp.findOneAndUpdate(
              { _id: idPackageTemp, status: defaultTypeStatus.active },
              { status: defaultTypeStatus.deleted },
              {new: true},
            );
            if (!packageMerchantTemp) {
              return {
                message: "Payment failure",
                success: false,
              };
            }
            const dataPackage = JSON.parse(JSON.stringify(packageMerchantTemp));
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
            var result = await packageService.createPackage(obj);
            if (!result) {
              return {
                message: "Payment failure",
                success: false,
              };
            } else {
              return {
                message: "Payment successfully",
                success: true,
                data: { responseCode: vnp_Params["vnp_ResponseCode"] },
              };
            }
          } else {
            const packageClientTemp = await PackageClientTemp.findOneAndUpdate(
              { _id: idPackageTemp, status: defaultTypeStatus.active },
              { status: "DELETED" },
              { new: true }
            );
            if (!packageClientTemp) {
              return {
                message: "Payment failure",
                success: false,
              };
            }
            const dataPackage = JSON.parse(JSON.stringify(packageClientTemp));
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
            var result = await packageService.createPackage(obj, false);
            if (!result) {
              return {
                message: "Payment failure",
                success: false,
              };
            } else {
              return {
                message: "Payment successfully",
                success: true,
                data: { responseCode: vnp_Params["vnp_ResponseCode"] },
              };
            }
          }
        }
        return {
          message: "Payment successfully",
          success: true,
          data: { responseCode: vnp_Params["vnp_ResponseCode"] },
        };
      } else {
        return {
          message: "Payment failure",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  private sortObject = (o: any) => {
    var sorted: any = {},
      key,
      a = [];

    for (key in o) {
      if (o.hasOwnProperty(key)) {
        a.push(key);
      }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
      sorted[a[key]] = o[a[key]];
    }
    return sorted;
  };
}
