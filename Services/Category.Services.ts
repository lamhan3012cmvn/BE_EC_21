import { ReturnServices } from "../Interfaces/Services";
import { Category, User } from "../Models";
import { defaultTypeStatus, defaultRoleAccount } from "../common/constants";

export default class CategoryService {
  constructor() {}
  public createCategory = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "Cannot found user info",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.ADMIN) {
          return {
            message: "Your role not ADMIN",
            success: false,
          };
        } else {
          const category = await Category.create(body);
          if (!category) {
            return {
              message: "Create category failure",
              success: false,
            };
          }
          return {
            message: "Successfully create category",
            success: true,
            data: category,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateCategory = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "Cannot found user info",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.ADMIN) {
          return {
            message: "Your role not ADMIN",
            success: false,
          };
        } else {
          const category = await Category.findOneAndUpdate(
            { _id: body._id },
            body,
            { new: true }
          );
          if (!category) {
            return {
              message: "Update category failure",
              success: false,
            };
          }
          return {
            message: "Successfully update category",
            success: true,
            data: category,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getAllCategory = async (): Promise<ReturnServices> => {
    try {
      const categories = await Category.find({status: defaultTypeStatus.active});
      return {
        message: "Successfully get category",
        success: true,
        data: categories,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public deleteCategory = async (
    idUser: string,
    idCategory: string
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "Cannot found user info",
          success: false,
        };
      } else {
        if (user.role != defaultRoleAccount.ADMIN) {
          return {
            message: "Your role not ADMIN",
            success: false,
          };
        } else {
          const category = await Category.findByIdAndUpdate(
            { _id: idCategory },
            { status: defaultTypeStatus.deleted }
          );
          if (!category) {
            return {
              message: "Delete category failure",
              success: false,
            };
          }
          return {
            message: "Successfully delete category",
            success: true,
            data: category,
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
