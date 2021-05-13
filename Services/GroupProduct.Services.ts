import { ReturnServices } from "../Interfaces/Services";
import { GroupProduct, User } from "../Models";
import { defaultTypeStatus, defaultRoleAccount } from "../common/constants";

export default class GroupProductService {
  constructor() {}
  public createGroupProduct = async (body: any): Promise<ReturnServices> => {
    try {
      const user = await User.findById(body.FK_createUser);
      if (!user) {
        return {
          message: "Cannot found user info",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.MERCHANT) {
          return {
            message: "Your role not Merchant",
            success: false,
          };
        } else {
          const groupProduct = await GroupProduct.create(body);
          if (!groupProduct) {
            return {
              message: "Create group product failure",
              success: false,
            };
          }
          return {
            message: "Successfully create group product",
            success: true,
            data: groupProduct,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateGroupProduct = async (
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(body.FK_createUser);
      if (!user) {
        return {
          message: "Cannot found user info",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.MERCHANT) {
          return {
            message: "Your role not Merchant",
            success: false,
          };
        } else {
          const groupProduct = await GroupProduct.findOneAndUpdate(
            { _id: body._id },
            body,
            { new: true }
          );
          if (!groupProduct) {
            return {
              message: "Update group product failure",
              success: false,
            };
          }
          return {
            message: "Successfully update group product",
            success: true,
            data: groupProduct,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getAllGroupProduct = async (idMerchant: string): Promise<ReturnServices> => {
    try {
      const groupProducts = await GroupProduct.find(
        { FK_merchant: idMerchant, status: {$ne: defaultTypeStatus.deleted} }
      );
      return {
        message: "Successfully get group product",
        success: true,
        data: groupProducts,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public deleteGroupProduct = async (
    idUser: string,
    idGroupProduct: string
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "Cannot found user info",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.MERCHANT) {
          return {
            message: "Your role not Merchant",
            success: false,
          };
        } else {
          const groupProduct = await GroupProduct.findByIdAndUpdate(
            { _id: idGroupProduct },
            { status: defaultTypeStatus.deleted }
          );
          if (!groupProduct) {
            return {
              message: "Delete group product failure",
              success: false,
            };
          }
          return {
            message: "Successfully delete group product",
            success: true,
            data: groupProduct,
          };
        }
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
