import { ReturnServices } from "../Interfaces/Services";
import { defaultTypeOder } from "../common/constants";
import paypal from "paypal-rest-sdk";
import { User } from "../Models";

export default class PaypalService {
  constructor() {}

  public payment = async (transactions: number, body: any, next: any) => {
    const dollar = transactions / 23050;
    const dollar2f = Math.round(dollar * 100) / 100;
    const dollar3f = Math.round(dollar * 1000) / 1000;
    const formatTransactions =
      dollar % dollar2f == 0
        ? dollar2f
        : dollar2f > dollar3f
        ? dollar2f
        : dollar3f + 0.01;
    const return_url =
      body.typeOrder == defaultTypeOder.POINT
        ? `http:///localhost:3000/Payment/Paypal/success?price=${formatTransactions}&idUser=${body.idUser}&point=${body.point}&typeOrders=${body.typeOrders}`
        : `http:///localhost:3000/Payment/Paypal/success?price=${formatTransactions}&idUser=${body.idUser}`;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: return_url,
        cancel_url: "http://localhost:3000/Payment/Paypal/Cancel",
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
          if (body.typeOrders === defaultTypeOder.POINT) {
            await User.findOneAndUpdate(
              { _id: body.idUser },
              { $inc: { point: ~~body.point } },
              { new: true }
            );
          } else {
            // Type ORDER
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

  public functionInit = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
}
