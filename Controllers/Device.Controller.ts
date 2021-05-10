import { DevicePath } from '../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import Validate from '../Validates/Validate';
import schemaDevice from '../Validates/Device.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import DeviceServices from '../Services/Device.Services';
export default class DeviceController extends Controller {
	path = '/Device';
	routes = [
		{
			path: `/${DevicePath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: [TokenServices.verify,Validate.body(schemaDevice.createDevice)]
		},
		{
			path: `/${DevicePath.DELETE}`,
			method: Methods.DELETE,
			handler: this.handleDelete,
			localMiddleware: [TokenServices.verify]
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
			let device = req.value.body;
            device.FK_createUser = idUser;
			const deviceServices: DeviceServices = new DeviceServices();
			const result = await deviceServices.createDevice(device);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	
	async handleDelete(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.value.body;
			const transportServices: DeviceServices = new DeviceServices();
			const result = await transportServices.updateDevice(id);
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
