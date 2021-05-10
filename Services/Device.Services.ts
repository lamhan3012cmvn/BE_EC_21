import { ReturnServices } from "../Interfaces/Services";
import { Device } from "../Models";

export default class DeviceService {
  constructor() {}
  public createDevice = async (body: any): Promise<ReturnServices> => {
    try {
      const device = await Device.findOneAndUpdate(
        {
          deviceUUid: body.deviceUUid,
          status: "ACTIVE",
        },
        body,
        { new: true }
      );
      if (!device) {
        console.log("2");
        const newDevice = new Device(body);
        const save = await newDevice.save();
        if (!save) {
          return {
            message: "Create device failure",
            success: false,
            status: 300,
          };
        }
      } else {
        console.log("1");
		console.log(device._id);
        if (!device) {
          return {
            message: "Create device failure",
            success: false,
            status: 300,
          };
        }
      }

      return { message: "Successfully create device", success: true };
    } catch (e) {
      console.log(e);
      return { message: "An error occured", success: false };
    }
  };

  public updateDevice = async (body: any): Promise<ReturnServices> => {
    try {
      const oldDevice = await Device.findOne({
        FK_createUser: body.FK_createUser,
      });
      return { message: "An error occured", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occured", success: false };
    }
  };

  public functionInit = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occured", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occured", success: false };
    }
  };
}
