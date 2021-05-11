import { Services, TypeService } from './../Services/Services';
import { TransportSubPath } from './../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaTransport from '../Validates/Transport.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import TransportServices from '../Services/Transport.Services';
export default class TransportSubController extends Controller {
	path = '/TransportSub';
	routes = [
		{
			path: `/${TransportSubPath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: [TokenServices.verify,Validate.body(schemaTransport.createTransportSub)]
		},
		{
			path: `/${TransportSubPath.UPDATE}`,
			method: Methods.POST,
			handler: this.handleUpdate,
			localMiddleware: [TokenServices.verify,Validate.body(schemaTransport.updateTransportSub)]
		},
		{
			path: `/${TransportSubPath.GET_INFO}`,
			method: Methods.GET,
			handler: this.handleGetTransportSub,
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
			const { city, address, phoneNumber, mail } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.createTransportSub(idUser, {
				idUser,
				address,
				phoneNumber,
				mail,
				city,
			});
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
			const { id, ...data } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.updateTransportSub(id, data);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleGetTransportSub(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.getTransportSub(id);
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
