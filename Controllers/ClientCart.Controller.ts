import { CartPath } from '../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { IValidateRequest } from '../common/DefineRequest';
import Validate from '../Validates/Validate';
import RoleInstance from '../common/RoleInstance';
import ClientCartServices from '../Services/ClientCart.Services';
export default class ClientCartController extends Controller {
	path = '/User/Client';
	routes = [
		{
			path: `/${CartPath.ADD_PRODUCT_TO_CART}`,
			method: Methods.POST,
			handler: this.handleAddProductToCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${CartPath.DELETE_PRODUCT_FROM_CART}`,
			method: Methods.POST,
			handler: this.handleDeleteProductFromCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
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
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${CartPath.UPDATE_PRODUCT_FROM_CART}`,
			method: Methods.POST,
			handler: this.handleUpdateProductFromCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
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
			const clientCartServices: ClientCartServices = new ClientCartServices();
			const result = await clientCartServices.addProductToCart(idUser, objData);
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

			const clientCartServices: ClientCartServices =
				new ClientCartServices();
			const result = await clientCartServices.deleteProductFromCart(
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
			const clientCartServices: ClientCartServices = new ClientCartServices();
			const result = await clientCartServices.getMyCart(idUser);
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
			// if (result.success) {
			//   super.sendSuccess(res, result.data, result.message);
			// } else {
			//   super.sendError(res, result.message);
			// }
		} catch {
			super.sendError(res);
		}
	}
	async handleUpdateProductFromCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			// if (result.success) {
			//   super.sendSuccess(res, result.data, result.message);
			// } else {
			//   super.sendError(res, result.message);
			// }
		} catch {
			super.sendError(res);
		}
	}
}
