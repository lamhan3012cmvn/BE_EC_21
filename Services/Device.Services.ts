import { ReturnServices } from "../Interfaces/Services";
import { Device } from "../Models";
import { defaultTypeStatus } from "../common/constants";

export default class DeviceService {
  constructor() {}
  public createDevice = async (body: any): Promise<ReturnServices> => {
    try {
      const device = await Device.findOneAndUpdate(
        {
          deviceUUid: body.deviceUUid,
          status: defaultTypeStatus.active,
        },
        body,
        { new: true }
      );
      if (!device) {
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

  public deleteDevice = async (body: any): Promise<ReturnServices> => {
    try {
      const device = await Device.findOneAndUpdate(
        {
          FK_createUser: body.FK_createUser,
          deviceUUid: body.deviceUUid,
          status: defaultTypeStatus.active,
        },
        { status: defaultTypeStatus.deleted }
      );
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
