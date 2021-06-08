import { TransportPath } from './../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaTransport from '../Validates/Transport.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import TransportServices from '../Services/Transport.Services';
import RoleInstance from '../common/RoleInstance';

import { defaultRoleAccount as Role } from './../common/constants';
export default class TransportController extends Controller {
	path = '/Transport';
	routes = [
		{
			path: `/${TransportPath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: [
				TokenServices.verify,
				Validate.body(schemaTransport.createTransport)
			]
		},
		{
			path: `/${TransportPath.UPDATE}`,
			method: Methods.POST,
			handler: this.handleUpdate,
			localMiddleware: [
				TokenServices.verify,
				Validate.body(schemaTransport.updateTransport)
			]
		},
		{
			path: `/${TransportPath.GET_INFO}`,
			method: Methods.GET,
			handler: this.handleGetTransport,
			localMiddleware: [TokenServices.verify]
		},
		{
			path: `/${TransportPath.ASSIGN_STAFF}`,
			method: Methods.POST,
			handler: this.handleAssignStaff,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT]),
				Validate.body(schemaTransport.assignStaff)
			]
		},
		{
			path: `/${TransportPath.GET_ASSIGN_STAFF}`,
			method: Methods.GET,
			handler: this.handleAssignStaff,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT]),
			]
		},
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
			const { name, description, avatar, imageVerify, phone, headquarters } =
				req.value.body;

			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.createTransport(idUser, {
				name,
				description,
				avatar,
				imageVerify,
				phone,
				headquarters
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
			const { token, ...data } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.updateTransport(token.data, data);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleGetTransport(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id = req.value.body.token.data;
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

	async handleAssignStaff(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			console.log("handleAssign Staff")
			const {idUser,idSub}=req.value.body
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.assignStaff(idSub,idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleGetAssignStaff(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.getAssignStaff();
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
