import request from "request";

export default class NotificationService {
  async pushNotification(
    title: string,
    body: string,
    image: any,
    fcmToken: any,
    data: any
  ) {
    const tokenReceive =
      "cZT4YFnhQ3aA4NneITw8Mk:APA91bFpHzDWWubODgR7oFXOJuUiZqliWbxG3KSwTNakCoONDDt9MFIyf6z_MA2tgRpZJo0s1NOWENQUyBlxLaQgGjG5jarUUBP5af-7f9acplYGoRIw5Roxma9o8QcHBXgT7Odj7GHy";
    const fcmServerKey = process.env.FCM_KEY;
    const notification = Object.create({
      title: title,
      body: body,
      image: image,
    });
    if (image == null) {
      delete notification.image;
    }
    const options = {
      uri: "https://fcm.googleapis.com/fcm/send",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${fcmServerKey}`,
      },
      body: JSON.stringify({
        to: tokenReceive,
        priority: "high",
        notification: notification,
        data: data,
      }),
    };

    request(options, function (error, response) {
      if (response.statusCode == 200) {
          console.log("Push notification successfully");
      }else {
          console.log(error);
      }
    });
  }
}
