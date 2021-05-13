import { ReturnServices } from "../Interfaces/Services";
import { Merchant } from "../Models";
import { defaultTypeStatus } from "../common/constants";

export default class MerchantService {
  constructor() {}
  public createMerchant = async (
    body: any
  ): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.find({FK_createUser: body.FK_createUser, status: {$ne : defaultTypeStatus.deleted}});
      if (merchant.length == 0) {
        const newMerchant = await Merchant.create(body);
        if (!newMerchant) {
          return {
            message: 'Create merchant failure',
            success: false,
          };
        }
        return {
          message: 'Create merchant successfully',
          success: true,
          data: newMerchant,
        }
      }else {
        return {
          message: 'Your store already',
          success: false,
          status: 400,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateMerchant = async (
    body: any
  ): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.findOneAndUpdate({_id: body.id, FK_createUser: body.FK_createUser}, body, {new: true});
      if (!merchant) {
        return {
          message: 'Merchant does not exists',
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
      const merchant = await Merchant.findOne({FK_createUser: idUser, status: {$ne : defaultTypeStatus.deleted}});
      if (!merchant) {
        return {
          message: 'You don\'t have a store',
          success: false,
        };
      }else {
        return {
          message: 'Get merchant info successfully',
          success: true,
          data: merchant,
        };
      }
      
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
