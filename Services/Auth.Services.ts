import { SendMail } from './SendMail.Services';
import jwtServices from './Token.Services'
import { Request, Response, NextFunction } from 'express';
import { IUser, ETypeLogin } from '../Models/User/User.Interface';
import { User } from '../Models/index';
import bcrypt from 'bcrypt';

interface AuthReturnData {
	message: string;
	success: boolean;
	data?: IUser;
}
export default class AuthService {
	constructor(public readonly _id?: string) {}
	public loginServices = async (
		email: string,
		password: string
	): Promise<AuthReturnData> => {
		try {
			const resDbUser: IUser | null = await User.findOne({
				email: email
			});
			
			if (resDbUser) {
				if(resDbUser.isVerify===false)
				return {
					message: 'Please verify your account',
					success: false,
				}
				const isPasswordEqual = await bcrypt.compare(
					password,
					resDbUser.password
				);
				if (isPasswordEqual) {
					return {
						message: 'Successfully logged in',
						success: true,
						data: resDbUser
					};
				} else {
					return { message: 'Invalid password', success: false };
				}
			} else {
				return { message: 'Invalid user', success: false };
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
	public register = async (
		email: string,
		password: string,
		phone: string,
		fullName: string
	): Promise<AuthReturnData> => {
		try {
			const userFromDb = await User.findOne({
				where: { email: email }
			});
			if (!userFromDb) {
				const hashedPassword = await bcrypt.hash(password, 10);
				const rdVerify=Math.floor(Math.random()*1000000)
				const createdUser = new User({
					email: email,
					password: hashedPassword,
					phone: phone,
					fullName: fullName,
					typeLogin: ETypeLogin.EMAIL,
					otp:rdVerify
				});
				const send:SendMail = new SendMail()
				send.sendMail(email,"Verify",rdVerify+"")
				await createdUser.save();

				return {
					message: 'Successfully registered',
					success: true,
				};
			} else {
				return { message: 'User already exists', success: false };
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
	public changePassword = async (oldPassword:string,newPassword: string): Promise<AuthReturnData> => {
		try {
			const user = await User.findById(this._id);
			if (!user) {
				return { message: 'User  not already exists', success: false };
			} else {
				console.log(oldPassword)
				const isPasswordEqual = await bcrypt.compare(
					oldPassword,
					user.password
				);
        console.log(`LHA:  ===> file: Auth.Services.ts ===> line 98 ===> isPasswordEqual`, isPasswordEqual)
				if(!isPasswordEqual) return { message: 'Invalid password', success: false };
				const hashedPassword = await bcrypt.hash(newPassword, 10);
				user.password = hashedPassword;
				await user.save();
				return {
					message: 'Successfully changed password',
					data: user,
					success: true
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
	public verify = async (email:string, otp:string): Promise<AuthReturnData> =>{
		try {
			const user = await User.findOne({email});
			if (user) {
				if(user.otp===otp)
				{
					user.isVerify=true;
					await user.save()
					const jwt=jwtServices.createToken(user._id)
					return { message: 'Successfully verify account', data:jwt,success: true };
				}
				return {
					message: 'Invalid otp code',
					success: false
				};
			} else {
				
				return {
					message: 'Can not find a user to authenticate',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured Verify', success: false };
		}
	}
}
