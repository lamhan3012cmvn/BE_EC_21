import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { PackagePath } from '../common/RoutePath';
import Validate from '../Validates/Validate';
import schemaPackage from '../Validates/Package.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import PackageService from '../Services/Package.Services';
import RoleInstance from '../common/RoleInstance';
import { defaultRoleAccount as Role} from '../dist/common/constants';

export default class PackageController extends Controller {
	path = '/Package';
	routes = [
		{
			path: `/${PackagePath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: [
				TokenServices.verify,
				Validate.body(schemaPackage.createPackage)
			]
		},
		{
			path: `/${PackagePath.GET_PACKAGE_BY_STATUS}`,
			method: Methods.GET,
			handler: this.handleGetPackageByStatus,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT]),
				Validate.body(schemaPackage.getPackageByStatus)
			]
		},
		{
			path: `/${PackagePath.GET_PACKAGE_SUB_BY_STATUS}`,
			method: Methods.GET,
			handler: this.handleGetPackageSubByStatus,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT_SUB]),
				Validate.body(schemaPackage.getPackageByStatus)
			]
		},
		{
			path: `/${PackagePath.GET_PACKAGE_DETAIL_BY_STATUS}`,
			method: Methods.GET,
			handler: this.handleGetPackageDetailByStatus,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT,Role.TRANSPORT_SUB,Role.TRANSPORT_SUB_CITY]),
				Validate.body(schemaPackage.getPackageDetailByStatus)
			]
		},
		{
			path: `/${PackagePath.CONFIRM_PACKAGE}`,
			method: Methods.POST,
			handler: this.handleConfirmPackage,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT,Role.TRANSPORT_SUB,Role.TRANSPORT_SUB_CITY]),
				Validate.body(schemaPackage.getPackageDetailByStatus)
			]
		},
		{
			path: `/${PackagePath.CONFIRM_PACKAGES}`,
			method: Methods.POST,
			handler: this.handleConfirmPackages,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT,Role.TRANSPORT_SUB,Role.TRANSPORT_SUB_CITY]),
				Validate.body(schemaPackage.getPackageDetailByStatus)
			]
		}
	];
	constructor() {
		super();
	}

	async handleConfirmPackage(req: IValidateRequest | any,
		res: Response,
		next: NextFunction){
			try{
				const packageService: PackageService = new PackageService();
				const result = await packageService.confirmPackage(req.value.body);
	
				if (result.success) {
					super.sendSuccess(res, {}, result.message);
				} else {
					super.sendError(res, result.message);
				}
			}
			catch(err){
				super.sendError(res);
			}
		}
		async handleConfirmPackages(req: IValidateRequest | any,
			res: Response,
			next: NextFunction){
				try{
					const packageService: PackageService = new PackageService();
					const result = await packageService.confirmPackages(req.value.body);
		
					if (result.success) {
						super.sendSuccess(res, {}, result.message);
					} else {
						super.sendError(res, result.message);
					}
				}
				catch(err){
					super.sendError(res);
				}
			}
	
	async handleGetPackageDetailByStatus(req: IValidateRequest | any,
		res: Response,
		next: NextFunction){
		try{
			const packageService: PackageService = new PackageService();
			const result = await packageService.getPackageDetailByStatus(req.value.body);

			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		}
		catch(err){
			super.sendError(res);
		}
	}
	async handleGetPackageByStatus(req: IValidateRequest | any,
		res: Response,
		next: NextFunction){
		try{
			const packageService: PackageService = new PackageService();
			const result = await packageService.getPackageByStatus(req.value.body);

			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		}
		catch(err){
			super.sendError(res);
		}
	}
	async handleGetPackageSubByStatus(req: IValidateRequest | any,
		res: Response,
		next: NextFunction){
		try{
			const packageService: PackageService = new PackageService();
			const result = await packageService.getPackageSubByStatus(req.value.body);

			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		}
		catch(err){
			super.sendError(res);
		}
	}
	async handleCreate(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const packageService: PackageService = new PackageService();
			const result = await packageService.createPackage(req.value.body);

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
