import { ReturnServices } from "../Interfaces/Services";
import { Product, ProductInfo, Merchant } from "../Models";
import { defaultTypeStatus } from "../common/constants";

export default class ProductService {
  constructor() {}
  public createProduct = async (body: any): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.findById(body.FK_merchant);
      if (!merchant) {
        return {
          message: "Your merchant does not exists",
          success: false,
        };
      } else {
        const productInfo = await ProductInfo.create(body);
        if (!productInfo) {
          return {
            message: "Create product failure",
            success: false,
          };
        } else {
          body.FK_currentInfo = productInfo._id;
          const product = await Product.create(body);
          if (!product) {
            return {
              message: "Create product failure",
              success: false,
            };
          }
          return {
            message: "Successfully create product",
            success: true,
            data: productInfo,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateProduct = async (body: any): Promise<ReturnServices> => {
    try {
      const productInfo = await ProductInfo.findOneAndUpdate(
        { _id: body.idProduct },
        { status: defaultTypeStatus.deleted },
        { new: true }
      );
      if (!productInfo) {
        return {
          message: "Product does not exists",
          success: false,
        };
      } else {
        const newProductInfo = await ProductInfo.create(body);
        if (!newProductInfo) {
          return {
            message: "Update product failure",
            success: false,
          };
        } else {
          await Product.findOneAndUpdate(
            { FK_currentInfo: body.idProduct },
            { FK_currentInfo: newProductInfo._id },
            { new: true }
          );
          return {
            message: "Successfully update product",
            success: true,
            data: newProductInfo,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getProductByMerchant = async (body: any): Promise<ReturnServices> => {
    try {
      let perPage = ~~body.perPage || 12;
      let page = ~~body.page || 1;
      const products = await ProductInfo.find({
        FK_merchant: body.id,
        status: defaultTypeStatus.active,
      })
        .skip(perPage * page - perPage)
        .limit(perPage);

      return {
        message: "Successfully get product",
        success: true,
        data: products,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getProductByGroup = async (body: any): Promise<ReturnServices> => {
    try {
      let perPage = ~~body.perPage || 12;
      let page = ~~body.page || 1;
      const products = await ProductInfo.find({
        FK_groupProduct: body.id,
        status: defaultTypeStatus.active,
      })
        .skip(perPage * page - perPage)
        .limit(perPage);

      return {
        message: "Successfully get product",
        success: true,
        data: products,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
  public getAllProduct = async (body: any): Promise<ReturnServices> => {
    try {
      let perPage = ~~body.perPage || 12;
      let page = ~~body.page || 1;
      const products = await ProductInfo.find({
        status: defaultTypeStatus.active,
      })
        .skip(perPage * page - perPage)
        .limit(perPage);

      return {
        message: "Successfully get product",
        success: true,
        data: products,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public deleteProduct = async (idProduct: string): Promise<ReturnServices> => {
    try {
      const productInfo = await ProductInfo.findOneAndUpdate(
        { _id: idProduct },
        { status: defaultTypeStatus.deleted },
        { new: true }
      );
      if (!productInfo) {
        return {
          message: "Product does not exists",
          success: false,
        };
      } else {
        const product = await Product.findOneAndUpdate(
          { FK_currentInfo: productInfo._id },
          { status: defaultTypeStatus.deleted },
          { new: true }
        );
        if (!product) {
          return {
            message: "Product does not exists",
            success: false,
          };
        }
        return {
          message: "Successfully delete product",
          success: true,
          data: productInfo,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public filterAllProducts = async (body: any): Promise<ReturnServices> => {
    try {
      let search = body.search || '';
      let perPage = ~~body.perPage || 12;
      let page = ~~body.page || 1;
      const products = await ProductInfo.find({
        name: new RegExp('/' + search + '/'),
        status: defaultTypeStatus.active,
      })
        .skip(perPage * page - perPage)
        .limit(perPage);

      return {
        message: "Successfully get product",
        success: true,
        data: products,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public filterProductByCategory = async (
    body: any
  ): Promise<ReturnServices> => {
    try {
      let search = body.search || '';
      let idCategory = body.idCategory;
      let perPage = ~~body.perPage || 12;
      let page = ~~body.page || 1;
      let result = [];
      const merchants = await Merchant.find({ FK_category: idCategory });
      if (!merchants) {
        return {
          message: "Could not found merchants",
          success: false,
        };
      } else {
        for (let i = 0; i < merchants.length; i++) {
          const products = await ProductInfo.find({
            name: new RegExp('/' + search + '/'),
            FK_merchant: body.id,
            status: defaultTypeStatus.active,
          })
            .skip(perPage * page - perPage)
            .limit(perPage);

          perPage -= products.length;
          if (perPage == 0) {
            return {
              message: "Successfully get product",
              success: true,
              data: result,
            };
          } else {
            result.push(products);
          }
        }
      }
      return {
        message: "Successfully get product",
        success: true,
        data: result,
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
