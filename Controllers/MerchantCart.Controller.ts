import { IPackage } from './../Models/Package/Package.Interface';
import { CartPath } from '../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { IValidateRequest } from '../common/DefineRequest';
import Validate from '../Validates/Validate';
import RoleInstance from '../common/RoleInstance';
import MerchantCartServices from '../Services/MerchantCart.Services';
// import { IProductCartMerchant } from '../Models/MerchantCart/MechantCart.Interface';
import schemaMerchantCart from '../Validates/MerchantCart.Validate';
import PackageService from '../Services/Package.Services';
import UserService from '../Services/User.Services';
export default class MerchantCartController extends Controller {
	path = '/User/Merchant';
	routes = [
		{
			path: `/${CartPath.ADD_PRODUCT_TO_CART}`,
			method: Methods.POST,
			handler: this.handleAddProductToCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.addProductToCartid)
			]
		},
		{
			path: `/${CartPath.DELETE_PRODUCT_FROM_CART}`,
			method: Methods.POST,
			handler: this.handleDeleteProductFromCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.deleteProductFromCart)
			]
		},
		{
			path: `/${CartPath.GET_MY_CART}`,
			method: Methods.GET,
			handler: this.handleGetMyCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${CartPath.PAYMENT_CART}`,
			method: Methods.POST,
			handler: this.handlePaymentCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.paymentMerchantCart)
			]
		}
	];
	constructor() {
		super();
	}

	async handleAddProductToCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const objData: any = {
				idProduct: req.value.body.idProduct,
				quantity: req.value.body.quantity
			};
			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.addProductToCart(
				idUser,
				objData
			);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleDeleteProductFromCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser: string = req.value.body.token.data;
			const idProduct: string = req.value.body.idProduct;

			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.deleteProductFromCart(
				idUser,
				idProduct
			);

			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleGetMyCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.getMyCart(idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handlePaymentCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser: string = req.value.body.token.data;

			console.log('data All', req.value.body);
			const {
				title,
				description,
				estimatedDate,
				FK_Recipient,
				FK_Address,
				FK_Transport,
				FK_SubTransport,
				FK_SubTransportAwait,

				prices,
				distance,
				weight,

				FK_Product,

				FK_ProductType,
				senderName,
				senderPhone,
				senderFullAddress,
				senderCoordinateLat,
				senderCoordinateLng
			} = req.value.body;

			//get user
			const userService: UserService = new UserService();
			const user = await userService.getInfo(idUser);


			const findSender = user.data.address.find((elm: any) => {
				return elm.id === FK_Address;
			});

			if (!findSender) {
				super.sendError(res, 'Dont find address recjpient');
				return;
			}

			const merchantCartServices:MerchantCartServices=new MerchantCartServices();
			const resMerchantCart=await merchantCartServices.paymentCart(idUser)



			const obj: any = {
				title,
				description,
				estimatedDate,
				FK_Recipient: '',
				FK_Transport: '',
				prices,
				distance,
				weight,
				FK_Product: resMerchantCart.data.products, //Get from cart
				FK_ProductType: '', //Get from cart
				recipient: {
					name: findSender.fullName,
					location: {
						address: findSender.fullAddress,
						coordinate: {
							lat: findSender.coordinates.lat,
							lng: findSender.coordinates.lng
						}
					},
					phone: findSender.phone
				},
				sender: {
					name: senderName,
					location: {
						address: senderFullAddress,
						coordinate: {
							lat: senderCoordinateLat,
							lng:senderCoordinateLng
						}
					},
					phone: senderPhone
				}
			};
			
			console.log(`LHA:  ===> file: MerchantCart.Controller.ts ===> line 192 ===> obj`, obj)
			const packageService: PackageService = new PackageService();
			// const result=await packageService.createPackage(obj)
			if (user.success) {
				super.sendSuccess(res,obj, user.message);
				return;
			} else {
				super.sendError(res, user.message);
			}
			// if (result.success) {
			//   super.sendSuccess(res, result.data, result.message);
			// } else {
			//   super.sendError(res, result.message);
			// }
		} catch (err) {
			console.log('err', err);
			super.sendError(res);
		}
	}
}
