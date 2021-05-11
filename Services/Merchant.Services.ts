import { ReturnServices } from "../Interfaces/Services";
import { Merchant, User } from "../Models";
import { defaultTypeStatus } from "../common/constants";

export default class MerchantService {
  constructor() {}
  public createMerchant = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (user!.FK_merchant == "") {
        const merchant = await Merchant.create(body);
        if (!merchant) {
          return {
            message: "Create merchant failure",
            success: false,
            status: 300,
          };
        } else {
          user!.FK_merchant = merchant._id;
          await user!.save();
          return {
            message: "Successfully create merchant",
            success: true,
            data: merchant,
          };
        }
      } else {
        const oldMerchant = await Merchant.findById(user!.FK_merchant);
        if (oldMerchant!.status == defaultTypeStatus.deleted) {
          const newMerchant = await Merchant.create(body);
          if (!newMerchant) {
            return {
              message: "Create merchant failure",
              success: false,
              status: 300,
            };
          } else {
            user!.FK_merchant = newMerchant._id;
            await user!.save();
            return {
              message: "Successfully create merchant",
              success: true,
              data: newMerchant,
            };
          }
        } else {
          return {
            message: "Your merchant already",
            success: false,
            status: 400,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateMerchant = async (
    idMerchant: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const device = await Merchant.findOneAndUpdate(
        {
          _id: idMerchant,
        },
        body
      );
      if (!device) {
        return {
          message: "Merchant already does not exists",
          success: false,
        };
      }
      return { message: "Successfully update merchant", success: true };
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
