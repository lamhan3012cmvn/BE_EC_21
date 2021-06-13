import { ReturnServices } from "../Interfaces/Services";
import { Merchant, User } from "../Models";
import { defaultTypeStatus } from "../common/constants";
import { IAddress } from "../Models/User/User.Interface";
import { defaultRoleAccount } from "../common/constants";

export default class MerchantService {
  constructor() {}
  public createMerchant = async (body: any): Promise<ReturnServices> => {
    try {
      const user = await User.findById(body.FK_createUser);
      if (!user) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      const address: IAddress = {
        id: user.email + new Date().toISOString(),
        fullAddress: body.fullAddress,
        coordinates: {
          lat: body.lat,
          lng: body.lng,
        },
        phoneNumber: body.phone,
      };
      body.address = address;
      const merchant = await Merchant.find({
        FK_createUser: body.FK_createUser,
        status: { $ne: defaultTypeStatus.deleted },
      });
      if (merchant.length == 0) {
        const newMerchant = await Merchant.create(body);
        if (!newMerchant) {
          return {
            message: "Create merchant failure",
            success: false,
          };
        }
        return {
          message: "Create merchant successfully",
          success: true,
          data: newMerchant,
        };
      } else {
        return {
          message: "Your store already",
          success: false,
          status: 400,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateMerchant = async (body: any): Promise<ReturnServices> => {
    try {
      const user = await User.findById(body.FK_createUser);
      if (!user) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      const address: IAddress = {
        id: user.email + new Date().toISOString(),
        fullAddress: body.fullAddress,
        coordinates: {
          lat: body.lat,
          lng: body.lng,
        },
        phoneNumber: body.phone,
      };
      const merchantInfo = {
        name: body.name,
        description: body.description,
        image: body.image,
        address: address,
        FK_category: body.FK_category,
      };
      const merchant = await Merchant.findOneAndUpdate(
        { _id: body.id, FK_createUser: body.FK_createUser },
        merchantInfo,
        { new: true }
      );
      if (!merchant) {
        return {
          message: "Merchant does not exists",
          success: false,
        };
      }
      return {
        message: "Update merchant successfully",
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public adminUpdateMerchant = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      if (user.role != defaultRoleAccount.ADMIN) {
        return {
          message: "Your role does not ADMIN",
          success: false,
        };
      }
      const merchant = await Merchant.findOneAndUpdate(
        { _id: body.idMerchant },
        { status: body.status },
        { new: true }
      );
      if (!merchant) {
        return {
          message: "Merchant does not exists",
          success: false,
        };
      }
      return {
        message: "Update merchant successfully",
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getMerchant = async (idUser: string): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.findOne({
        FK_createUser: idUser,
        status: { $ne: defaultTypeStatus.deleted },
      });
      if (!merchant) {
        return {
          message: "You don't have a store",
          success: false,
        };
      } else {
        return {
          message: "Get merchant info successfully",
          success: true,
          data: merchant,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getMerchantByStatus = async (idUser: string, status: string): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: 'User does not exists',
          success: false,
        };
      }
      if (user.role != defaultRoleAccount.ADMIN) {
        return {
          message: 'Your role does not ADMIN',
          success: false,
        };
      }
      const merchant = await Merchant.find({
        status: status,
      });
      return {
        message: "Get merchant info successfully",
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getCoordinate = async (senderIdMerchant:string): Promise<any> => {
    try {
      const merchant=await Merchant.findById(senderIdMerchant)
      return merchant
    } catch (e) {
      console.log(e);
      return null
    }
  };
}
