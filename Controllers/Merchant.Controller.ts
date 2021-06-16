import { MerchantPath } from '../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaMerchant from '../Validates/Merchant.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import MerchantServices from '../Services/Merchant.Services';
import { defaultRoleAccount as Role } from '../common/constants';
import RoleInstance from '../common/RoleInstance';
export default class MerchantController extends Controller {
	path = '/Merchant';
	routes = [
		{
			path: `/${MerchantPath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: [
				TokenServices.verify,
				Validate.body(schemaMerchant.createMerchant)
			]
		},
		{
			path: `/${MerchantPath.UPDATE}`,
			method: Methods.PUT,
			handler: this.handleUpdate,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.MERCHANT]),
				Validate.body(schemaMerchant.updateMerchant)
			]
		},
		{
			path: `/${MerchantPath.GET_INFO}`,
			method: Methods.GET,
			handler: this.handleGet,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.MERCHANT])
			]
		},
		{
			path: `/${MerchantPath.GET_BY_ID}`,
			method: Methods.GET,
			handler: this.handleGetById,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.MERCHANT])
			]
		},
		{
			path: `/${MerchantPath.GET_ORDER}`,
			method: Methods.GET,
			handler: this.handleGetOrderByStatus,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.MERCHANT])
			]
		},
		{
			path: `/${MerchantPath.Cancel_Package}`,
			method: Methods.GET,
			handler: this.handleCancelPackage,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.MERCHANT])
			]
		},
		{
			path: `/${MerchantPath.PACKAGE_STATISTICS}`,
			method: Methods.GET,
			handler: this.handlePackageStatistics,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.MERCHANT])
			]
		}
	];
	constructor() {
		super();
	}
	async	 handlePackageStatistics(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	):Promise<void>{
		try {
			const idUser=req.value.body.token.data
			const {period,type}=req.query
			const _merchant: MerchantServices = new MerchantServices();
			const result = await _merchant.packageStatistics(idUser,period,type);
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
	async handleCancelPackage(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { idPackage } = req.query;
			const userServices: MerchantServices = new MerchantServices();
			const result = await userServices.cancelPackage(idPackage);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
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
			const { status } = req.query;
			const idUser = req.value.body.token.data;
			const merchantService: MerchantServices = new MerchantServices();
			const result = await merchantService.getOrderByStatus(idUser, status);
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
	async handleCreate(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			let merchant = req.value.body;
			merchant.FK_createUser = idUser;
			const merchantServices: MerchantServices = new MerchantServices();
			const result = await merchantServices.createMerchant(merchant);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleUpdate(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			let merchant = req.value.body;
			merchant.FK_createUser = idUser;
			const merchantServices: MerchantServices = new MerchantServices();
			const result = await merchantServices.updateMerchant(merchant);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleGet(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const merchantServices: MerchantServices = new MerchantServices();
			const result = await merchantServices.getMerchant(idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleGetById(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idMerchant = req.query.id;
			const merchantServices: MerchantServices = new MerchantServices();
			const result = await merchantServices.getMerchantInfoById(idMerchant);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
}
