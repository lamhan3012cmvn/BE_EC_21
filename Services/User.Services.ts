import { ReturnServices } from "../Interfaces/Services";
import { User } from "../Models";

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

  public functionInit = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
}
