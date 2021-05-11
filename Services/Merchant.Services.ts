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
      if (!!user) {
        if (user.FK_merchant == "") {
          const merchant = await Merchant.create(body);
          if (!merchant) {
            return {
              message: "Create merchant failure",
              success: false,
              status: 300,
            };
          } else {
            user.FK_merchant = merchant._id;
            await user.save();
            return {
              message: "Successfully create merchant",
              success: true,
              data: merchant,
            };
          }
        } else {
          const oldMerchant = await Merchant.findById(user.FK_merchant);
          if (!oldMerchant) {
          } else {
            if (oldMerchant.status == defaultTypeStatus.deleted) {
              const newMerchant = await Merchant.create(body);
              if (!newMerchant) {
                return {
                  message: "Create merchant failure",
                  success: false,
                  status: 300,
                };
              } else {
                user.FK_merchant = newMerchant._id;
                await user.save();
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
        }
      }
      return {
        message: "User not exists",
        success: false,
        status: 400,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateMerchant = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!!user) {
        if (user.FK_merchant == "") {
          return {
            message: "You don't have a store",
            success: false,
            status: 300,
          };
        } else {
          const merchant = await Merchant.findOneAndUpdate(
            { _id: user.FK_merchant },
            body,
            { new: true }
          );
          if (!merchant) {
            return {
              message: "You don't have a store",
              success: false,
              status: 300,
            };
          } else {
            if (merchant.status == defaultTypeStatus.deleted) {
              return {
                message: "You don't have a store",
                success: false,
                status: 300,
              };
            } else {
              return {
                message: "Successfully update merchant",
                success: true,
                status: 400,
                data: merchant,
              };
            }
          }
        }
      }
      return {
        message: "User not exists",
        success: false,
        status: 400,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getMerchant = async (idUser: string): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!!user) {
        const merchant = await Merchant.findById(user.FK_merchant);
        if (!merchant) {
          return {
            message: "Merchant already does not exists",
            success: false,
          };
        } else {
          if (merchant!.status == defaultTypeStatus.deleted) {
            return {
              message: "Merchant already does not exists",
              success: false,
            };
          }
          return {
            message: "Successfully get merchant",
            success: true,
            data: merchant,
          };
        }
      }
      return {
        message: "User not exists",
        success: false,
        status: 400,
      };
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
