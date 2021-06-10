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
			path: `/${TransportPath.UPDATE_PRICE_TYPE}`,
			method: Methods.POST,
			handler: this.handleUpdatePriceType,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT]),
				Validate.body(schemaTransport.updatePriceByType)
			]
		},
		{
			path: `/${TransportPath.REMOVE_STAFF_TRANSPORT}`,
			method: Methods.POST,
			handler: this.handleRemoveStaff,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT]),
				Validate.body(schemaTransport.removeStaffTransport)
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
			handler: this.handleGetAssignStaff,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT])
			]
		},
		{
			path: `/${TransportPath.GET_ALL_TRANSPORT_SUB}`,
			method: Methods.GET,
			handler: this.handleGetAllTransportSub,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([Role.TRANSPORT])
			]
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
		} catch (err){
			super.sendError(res);
		}
	}
	async handleRemoveStaff(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUserTransport=req.value.body.token.data
			const idStaff=req.value.body.idStaff
			console.log(
				`LHA:  ===> file: Transport.Controller.ts ===> line 110 ===> req.value.body`,
				req.value.body
			);
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.removeStaffTransport(
				idUserTransport,
				idStaff
			);
			if (result.success) {
				super.sendSuccess(res, result.data,result.message);
			}else{
				super.sendError(res, result.message);
			}
		} catch (err){
			super.sendError(res);
		}
	}
	async handleUpdatePriceType(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const data = req.value.body;
      console.log(`LHA:  ===> file: Transport.Controller.ts ===> line 151 ===> data`, data)
			const token = req.value.body.token;
      console.log(`LHA:  ===> file: Transport.Controller.ts ===> line 153 ===> token`, token)
			delete data.token;
			console.log(`LHA:  ===> file: Transport.Controller.ts ===> line 172 ===> data`, data)
			
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.updatePriceTypeTransport(
				token.data,
				data
			);
			// console.log(
			// 	`LHA:  ===> file: Transport.Controller.ts ===> line 150 ===> result`,
			// 	result
			// );
			if (result.success) {
				super.sendSuccess(res, result.data,result.message);
			}else{
				super.sendError(res, result.message);
			}
		} catch (err){
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
		} catch (err){
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
		} catch (err){
			super.sendError(res);
		}
	}

	async handleAssignStaff(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			console.log('handleAssign Staff');
			const { idUser, idSub } = req.value.body;
			const transportServices: TransportServices = new TransportServices();
			const result = await transportServices.assignStaff(idSub, idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (err){
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
				super.sendError(res, 'result.message');
			}
		} catch (err){
			super.sendError(res);
		}
	}
	async handleGetAllTransportSub(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {

			const idTransport=req.value.body.token.data
			const status=req.query.status
			const transportServices: TransportServices = new TransportServices();

			const result = await transportServices.getAllTransportSub(idTransport,status);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch (err){
			console.log(err)
			super.sendError(res);
		}
	}
}
