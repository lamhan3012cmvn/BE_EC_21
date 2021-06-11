import { UserPath } from '../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaUser from '../Validates/User.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import UserServices from '../Services/User.Services';
import { defaultTypePayment } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import RoleInstance from '../common/RoleInstance';

import { defaultRoleAccount as Role } from '../common/constants';

export default class UserController extends Controller {
	path = '/User';
	routes = [
		{
			path: `/${UserPath.UPDATE}`,
			method: Methods.PUT,
			handler: this.handleUpdate,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaUser.updateUser)
			]
		},
		{
			path: `/${UserPath.GET_INFO}`,
			method: Methods.GET,
			handler: this.handleGetInfo,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${UserPath.FAVORITE}`,
			method: Methods.POST,
			handler: this.handleFavorite,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaUser.favorite)
			]
		},
		{
			path: `/${UserPath.GET_FAVORITES}`,
			method: Methods.GET,
			handler: this.handleGetFavorites,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${UserPath.ADD_ADDRESS}`,
			method: Methods.POST,
			handler: this.handleAddAddress,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaUser.addAddress)
			]
		},
		{
			path: `/${UserPath.UPDATE_ADDRESS}`,
			method: Methods.PUT,
			handler: this.handleUpdateAddress,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaUser.updateAddress)
			]
		},
		{
			path: `/${UserPath.DELETE_ADDRESS}`,
			method: Methods.DELETE,
			handler: this.handleDeleteAddress,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${UserPath.BUY_POINT}`,
			method: Methods.POST,
			handler: this.handleBuyPoint,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaUser.buyPoint)
			]
		},
		{
			path: `/${UserPath.CALC_PRICE_PACKAGE}`,
			method: Methods.GET,
			handler: this.handleCalcPricePackage,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${UserPath.GET_ORDER}`,
			method: Methods.GET,
			handler: this.handleGetOrderByStatus,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		}
	];
	constructor() {
		super();
	}

	async handleUpdate(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const user = req.value.body;
			const userServices: UserServices = new UserServices();
			const result = await userServices.updateInfo(idUser, user);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleFavorite(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const { id } = req.value.body;
			const userServices: UserServices = new UserServices();
			const result = await userServices.favorite(id, idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (error) {
			super.sendError(res);
		}
	}

	async handleGetFavorites(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const userServices: UserServices = new UserServices();
			const result = await userServices.getListFavorites(idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
	}

	async handleGetInfo(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const userServices: UserServices = new UserServices();
			const result = await userServices.getInfo(idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
	}

	async handleAddAddress(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const address = req.value.body;
			const userServices: UserServices = new UserServices();
			const result = await userServices.addAddress(idUser, address);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
	}

	async handleUpdateAddress(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const address = req.value.body;
			const userServices: UserServices = new UserServices();
			const result = await userServices.updateAddress(idUser, address);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
	}

	async handleDeleteAddress(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const { id } = req.query;
			const userServices: UserServices = new UserServices();
			const result = await userServices.deleteAddress(idUser, id);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
	}

	async handleBuyPoint(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const body = req.value.body;
			const userServices: UserServices = new UserServices();
			await userServices.buyPoint(
				idUser,
				body,
				req,
				body.typePayment === defaultTypePayment.PAYPAL
					? (error: any, payment: any) => {
							if (error) {
								console.log(error);
								super.sendError(res, 'Payment failure!');
							} else {
								for (let i = 0; i < payment.links.length; i++) {
									if (payment.links[i].rel === 'approval_url') {
										super.sendSuccess(
											res,
											payment.links[i].href,
											'Successfully create order'
										);
									}
								}
							}
					  }
					: (result: ReturnServices) => {
							if (result.success) {
								super.sendSuccess(
									res,
									result.data.url,
									'Successfully create order'
								);
							} else {
								super.sendError(res, result.message);
							}
					  }
			);
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
	}
	async handleCalcPricePackage(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			// const userServices: UserServices = new UserServices();
			// const result = await transportServices.assignStaff(idSub, idUser);
			// if (result.success) {
			// 	super.sendSuccess(res, result.data, result.message);
			// } else {
			// 	super.sendError(res, result.message);
			// }
		} catch {
			super.sendError(res);
		}
	}
	async handleGetOrderByStatus(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const {status}=req.query
			const idUser = req.value.body.token.data;
			const userServices: UserServices = new UserServices();
			const result = await userServices.getOrderByStatus(idUser, status);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (e) {
			console.log(e);
			super.sendError(res);
		}
		
	}
}
