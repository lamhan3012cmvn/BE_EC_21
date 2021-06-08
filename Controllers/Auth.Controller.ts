import {  Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { AuthPath } from '../common/RoutePath';
import AuthService from '../Services/Auth.Services';
import Validate from '../Validates/Validate';
import schemaAuth from '../Validates/Auth.Validate';
import { IValidateRequest } from '../common/DefineRequest';
export default class AuthController extends Controller {
	path = '/Auth';
	routes = [
		{
			path: `/${AuthPath.LOGIN}`,
			method: Methods.POST,
			handler: this.handleLogin,
			localMiddleware: [Validate.body(schemaAuth.login)]
		},
		{
			path: `/${AuthPath.REGISTER}`,
			method: Methods.POST,
			handler: this.handleRegister,
			localMiddleware: [Validate.body(schemaAuth.register)]
		},
		{
			path: `/${AuthPath.REGISTER_STAFF}`,
			method: Methods.POST,
			handler: this.handleRegisterStaff,
			localMiddleware: [Validate.body(schemaAuth.register)]
		},
		{
			path: `/${AuthPath.FORGOT_PASSWORD}`,
			method: Methods.PUT,
			handler: this.handleForgotPassword,
			localMiddleware: []
		},
		{
			path: `/${AuthPath.CHANGE_PASSWORD}`,
			method: Methods.PUT,
			handler: this.handleChangePassword,
			localMiddleware: [TokenServices.verify,Validate.body(schemaAuth.changePassword)]
		},
		{
			path: `/${AuthPath.VERIFY}`,
			method: Methods.POST,
			handler: this.handleVerifyAccount,
			localMiddleware: [Validate.body(schemaAuth.verifyOtp)]
		}
	];
	constructor() {
		super();
	}

	
	async handleLogin(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
			const { email, password }: any = req.value.body;
			const authService: AuthService = new AuthService();
			const result = await authService.loginServices(email, password);
			console.log(result);
			if (result.success) {
				super.sendSuccess(
					res,
					{ token: TokenServices.createToken(result.data!._id) },
					result.message
				);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleRegister(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
			const { email, password, phone, fullName }: any = req.value.body;
			const authService: AuthService = new AuthService();
			const result = await authService.register(email,password,phone,fullName);
			if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleRegisterStaff(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
			const { email, password, phone, fullName }: any = req.value.body;
			const authService: AuthService = new AuthService();
			const result = await authService.registerStaff(email,password,phone,fullName);
			if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleForgotPassword(
		req: IValidateRequest|any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try{
			const {email}=req.value.body
			const authService: AuthService = new AuthService();
			const result = await authService.forgotPassword(email);
			if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		}catch(e){
			super.sendError(res);
		}
		super.sendSuccess(res, {}, 'handleForgotPassword');
	}
	async handleChangePassword(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
			const { oldPassword,newPassword ,token}: any = req.value.body;
			const authService: AuthService = new AuthService(token.data);
			const result = await authService.changePassword(oldPassword,newPassword);
			if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleVerifyAccount(
		req: IValidateRequest|any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		//Handle
		try {
			const { email, otp }: any = req.value.body;
			const authService: AuthService = new AuthService(req.value.param);
			const result = await authService.verify(email,otp);
			if (result.success) {
				super.sendSuccess(res, result.data!, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
}
