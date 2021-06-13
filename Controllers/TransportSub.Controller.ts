import { TransportSubPath } from './../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaTransport from '../Validates/TransportSub.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import TransportSubServices from '../Services/TransportSub.Services';
import RoleInstance from '../common/RoleInstance';
import { defaultRoleAccount as Role } from '../common/constants';
export default class TransportSubController extends Controller {
	path = '/TransportSub';
	routes = [
		{
			path: `/${TransportSubPath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreateTransportSub,
			localMiddleware: [
				TokenServices.verify,
				Validate.body(schemaTransport.createTransportSub),
				RoleInstance.getInstance().isRole([Role.TRANSPORT])
			]
		},
		{
			path: `/${TransportSubPath.UPDATE}`,
			method: Methods.POST,
			handler: this.handleUpdateTransportSub,
			localMiddleware: [
				TokenServices.verify,
				Validate.body(schemaTransport.updateTransportSub),
				RoleInstance.getInstance().isRole([Role.TRANSPORT])
			]
		},
		{
			path: `/${TransportSubPath.GET_INFO}`,
			method: Methods.GET,
			handler: this.handleGetTransportSub,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT, Role.TRANSPORT_SUB])
			]
		},
		{
			path: `/${TransportSubPath.CHANGE_STATUS}`,
			method: Methods.POST,
			handler: this.handleChangeStatusTransportSub,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT, Role.TRANSPORT_SUB]),
				Validate.body(schemaTransport.changeStatusTransportSub)
			]
		}
	];
	constructor() {
		super();
	}

	async handleCreateTransportSub(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const {
				locationCity,
				locationCoordinateLat,
				locationCoordinateLng,
				locationAddress,
				phoneNumber
			} = req.value.body;
			const SubServices: TransportSubServices = new TransportSubServices();
			const result = await SubServices.createTransportSub(idUser, {
				locationCity,
				locationCoordinateLat,
				locationCoordinateLng,
				locationAddress,
				phoneNumber
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

	async handleUpdateTransportSub(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id, ...data } = req.value.body;
			const SubServices: TransportSubServices = new TransportSubServices();
			const result = await SubServices.updateTransportSub(id, data);
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
			const SubServices: TransportSubServices = new TransportSubServices();
			const result = await SubServices.getTransportSub(id);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleChangeStatusTransportSub(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { idSub, status } = req.value.body;
			const SubServices: TransportSubServices = new TransportSubServices();
			const result = await SubServices.changeStatusTransportSub(idSub, status);
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
