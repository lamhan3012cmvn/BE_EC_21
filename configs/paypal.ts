import paypal from "paypal-rest-sdk";

export default async (id: string, secret: string) => {
  try {
    await paypal.configure({
      mode: "sandbox",
      client_id: id,
      client_secret: secret,
    });
  } catch (error) {
    console.log("Connect Paypal Fail!");
  }
}


