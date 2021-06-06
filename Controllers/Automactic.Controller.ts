import {  Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { Automatic } from '../common/RoutePath';
import Validate from '../Validates/Validate';
import schemaAuth from '../Validates/Auth.Validate';
import { IValidateRequest } from '../common/DefineRequest';
import AutomaticPackageServices from '../Services/AutomaticPackage.Services';
import RoleInstance from '../common/RoleInstance';
import {defaultRoleAccount as Role} from "../common/constants"
export default class AutomaticController extends Controller {
	path = '/Automatic';
	routes = [
		{
			path: `/${Automatic.AUTOMATIC_PACKAGE_TO_SUB}`,
			method: Methods.GET,
			handler: this.handleAutomaticPackageToSub,
			localMiddleware: [TokenServices.verify,RoleInstance.getInstance().isRole([Role.ADMIN])]
		},
    {
			path: `/${Automatic.AUTOMATIC_SUB_TO_PACKAGE}`,
			method: Methods.GET,
			handler: this.handleAutomaticPackageToSub,
			localMiddleware: [TokenServices.verify,RoleInstance.getInstance().isRole([Role.ADMIN])]
		}
	];
	constructor() {
		super();
    
	}

	async handleAutomaticPackageToSub(
		req: IValidateRequest|any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
      console.log("abc")
      const _automaticPackage:AutomaticPackageServices=new AutomaticPackageServices()
      const result =await _automaticPackage.automaticPackageToSub()
      console.log("dbc")
			if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch(err) {
      console.log(err)
			super.sendError(res);
		}
	}
  async handleAutomaticSubToSub(
		req: IValidateRequest|any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
      const _automaticPackage:AutomaticPackageServices=new AutomaticPackageServices()
      const result =await _automaticPackage.automaticPackageToSub()
      if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch(err){
			super.sendError(res);
		}
	}
}
