import {  Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { PackagePath } from '../common/RoutePath';
import Validate from '../Validates/Validate';
import schemaPackage from '../Validates/Package.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import PackageService from '../Services/Package.Services';

export default class PackageController extends Controller {
	path = '/Package';
	routes = [
		{
			path: `/${PackagePath.CREATE}`,
			method: Methods.POST,
			handler: this.handleCreate,
			localMiddleware: [TokenServices.verify,Validate.body(schemaPackage.createPackage)]
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
