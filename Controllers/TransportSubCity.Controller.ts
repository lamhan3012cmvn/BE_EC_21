import { TransportSubCityPath } from './../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaTransport from '../Validates/Transport.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import TransportServices from '../Services/Transport.Services';

export default class TransportSubCityController extends Controller {
	path = '/TransportSunCity';
	routes = [
		{
			path: `/${TransportSubCityPath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: []
		},
		{
			path: `/${TransportSubCityPath.UPDATE}`,
			method: Methods.POST,
			handler: this.handleUpdate,
			localMiddleware: []
		},
		{
			path: `/${TransportSubCityPath.GET_INFO}`,
			method: Methods.GET,
			handler: this.handleGet,
			localMiddleware: []
		}
	];
	constructor() {
		super();
	}

	async handleCreate(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const {
				name,
				description,
				avatar,
				imageVerify,
				phone,
				headquarters
			} = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.createTransport(
				idUser,
				{
					name,
					description,
					avatar,
					imageVerify,
					phone,
					headquarters
				}
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
	async handleUpdate(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id, data } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.updateTransport(id, data);
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
			const { id } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.getTransport(id);
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
