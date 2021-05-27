import { ReturnServices } from "../Interfaces/Services";
import { Coupon, User } from "../Models";
import { defaultTypeStatus, defaultRoleAccount } from "../common/constants";

export default class CouponService {
  constructor() {}
  public createCoupon = async (
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
      } else {
        if (user.role != defaultRoleAccount.ADMIN) {
          return {
            message: "Your role does not ADMIN",
            success: true,
          };
        } else {
          const coupon = await Coupon.create(this.formatBody(body));
          if (!coupon) {
            return {
              message: "Create coupon failure",
              success: false,
            };
          } else {
            return {
              message: "Successfully create coupon",
              success: true,
              data: coupon,
            };
          }
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateCoupon = async (
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
      } else {
        if (user.role != defaultRoleAccount.ADMIN) {
          return {
            message: "Your role does not ADMIN",
            success: false,
          };
        } else {
          const coupon = await Coupon.findOneAndUpdate(
            { _id: body.id },
            this.formatBody(body),
            {
              new: true,
            }
          );
          if (!coupon) {
            return {
              message: "Coupon does not exists",
              success: false,
            };
          } else {
            return {
              message: "Successfully update coupon",
              success: true,
              data: coupon,
            };
          }
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getAllCoupon = async (): Promise<ReturnServices> => {
    try {
      const coupons = await Coupon.find();
      return {
        message: "Successfully get category",
        success: true,
        data: coupons,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public deleteCoupon = async (
    idUser: string,
    idCoupon: string
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "User does not exist",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.ADMIN) {
          return {
            message: "Your role does not ADMIN",
            success: false,
          };
        } else {
          const coupon = await Coupon.findOneAndUpdate(
            { _id: idCoupon },
            { status: defaultTypeStatus.deleted },
            { new: true }
          );
          if (!coupon) {
            return {
              message: "Coupon does not exists",
              success: false,
            };
          } else {
            return {
              message: "Successfully delete coupon",
              success: true,
              data: coupon,
            };
          }
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public formatBody = (body: any) => {
    body.totalCode = ~~body.totalCode;
    body.discountByAmount = body.discountByAmount == "true";
    body.discountByPercent = body.discountByPercent == "true";
    return body;
  };
}
