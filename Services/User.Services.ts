import { ReturnServices } from "../Interfaces/Services";
import { User, Product } from "../Models";

export default class UserService {
  constructor() {}
  public updateInfo = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findOneAndUpdate({ _id: idUser }, body, {
        new: true,
      });
      if (!user) {
        return {
          message: "User not exists",
          success: false,
        };
      }
      return {
        message: "Successfully update info",
        success: true,
        data: user,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getInfo = async (idUser: string): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "User not exists",
          success: false,
        };
      }
      return {
        message: "Successfully get info",
        success: true,
        data: user,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public favorite = async (
    idProduct: string,
    idUser: string
  ): Promise<ReturnServices> => {
    try {
      const product = await Product.findById(idProduct);
      if (!product) {
        return {
          message: "Product does not exists",
          success: false,
        };
      } else {
        const user = await User.findById(idUser);
        if (!user) {
          return {
            message: "User does not exists",
            success: false,
          };
        } else {
          var favorites = user.favorites;
          if (!!favorites) {
            var index = favorites.indexOf(idProduct);
            if (index != -1) {
              favorites.splice(index, 1);
            } else {
              favorites.push(idProduct);
            }
            user.update({ favorites });
            await user.save();
          }
          return {
            message: "Successfully favorite product",
            success: true,
            data: user,
          };
        }
      }
    } catch (error) {
      console.log(error);
      return { message: "An error occurred", success: false };
    }
  };

  public addAddress = async (
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
        var address = user.address;
        if (!address) {
          return {
            message: "User does not exists",
            success: false,
          };
        } else {
          address.push({
            id: new Date().toISOString() + user.email,
            fullAddress: body.fullAddress,
            coordinates: {
              lat: body.lat,
              lng: body.lng,
            },
            phoneNumber: user.phone,
          });
          user.update(
            {
              address: address,
            },
            { new: true }
          );
          await user.save();
        }
        return {
          message: "Successfully add address",
          success: true,
          data: user,
        };
      }
    } catch (error) {
      console.log(error);
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
