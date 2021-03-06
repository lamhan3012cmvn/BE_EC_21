import { defaultRoleAccount } from './../common/constants';
import { SendMail } from './SendMail.Services';
import jwtServices from './Token.Services'
import { ClientCart, MerchantCart, Transport, User } from '../Models/index';
import bcrypt from 'bcrypt';
import {getRandString} from '../common/helper';
import NotificationServices from "./Notifications.Services";
interface AuthReturnData {
	message: string;
	success: boolean;
	data?: any;
}

export default class AuthService {
	constructor(public readonly _id?: string) {}
	public loginServices = async (
		email: string,
		password: string
	): Promise<AuthReturnData> => {
		try {
			const resDbUser= await User.findOne({
				email: email
			});
			
			if (resDbUser) {
				if(resDbUser.isVerify===false)
				{
					const randOtp=getRandString(100000,999999)
					resDbUser.otp=randOtp
					const send:SendMail = new SendMail()
					send.sendMail(resDbUser.email,"Verify",randOtp)
					await resDbUser.save()
					return {
						message: 'Please verify your account',
						success: false,
					}
				}
				const isPasswordEqual = await bcrypt.compare(
					password,
					resDbUser.password
				);
				if (isPasswordEqual) {
					const notificationServices: NotificationServices = new NotificationServices();
					notificationServices.pushNotification('Van Transport', 'Giao hàng thành công', null, null, resDbUser);
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
			return { message: 'An error occurred', success: false };
		}
	};

	public forgotPassword = async (
		email: string,
	): Promise<AuthReturnData> => {
		try {
			const resUser=await User.findOne({email})
			if(resUser)
			{
				const randOtp=getRandString(100000,999999)
				resUser.otp=randOtp
				const send:SendMail = new SendMail()
				send.sendMail(resUser.email,"Verify",randOtp)
				await resUser.save()
				return {
					message: 'Successfully find a user to forgotPassword', success: true 
				}
			}
			return {
				message: 'Can not find a user to forgotPassword', success: false 
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
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
				const rdVerify=getRandString(100000,999999)

				const createdUser = new User({
					email: email,
					password: hashedPassword,
					phone: phone,
					fullName: fullName,
					otp:rdVerify
				});

				const clientCart=new ClientCart({
					FK_CreateUser:createdUser._id
				})

				const merchantCart=new MerchantCart({
					FK_CreateUser:createdUser._id
				})

				const send:SendMail = new SendMail()
				send.sendMail(email,"Verify",rdVerify)

				await createdUser.save();
				await clientCart.save()
				await merchantCart.save()

				return {
					message: 'Successfully registered',
					success: true,
				};
			} else {
				return { message: 'User already exists', success: false };
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public registerStaff = async (
		idUserTransport:string,
		email: string,
		password: string,
		phone: string,
		fullName: string,
		image:string
	): Promise<AuthReturnData> => {
		try {
			const transport=await Transport.findOne({FK_createUser:idUserTransport})
			if(!transport)
			{
				return { message: 'Transport already exists', success: false };
			}
			const userFromDb = await User.findOne({
				where: { email: email }
			});
			if (!userFromDb) {
				const hashedPassword = await bcrypt.hash(password, 10);
				const rdVerify=getRandString(100000,999999)

				const createdUser = new User({
					email: email,
					password: hashedPassword,
					phone: phone,
					fullName: fullName,
					otp:rdVerify,
					role:defaultRoleAccount.STAFF,
					isVerify: true,
					image
				});
				transport.FK_Staffs.push(createdUser._id)
				
				// const send:SendMail = new SendMail()
				// send.sendMail(email,"Verify",rdVerify)
				await createdUser.save();
				await transport.save()
				return {
					message: 'Successfully registered',
					success: true,
				};
			} else {
				return { message: 'User already exists', success: false };
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public changePassword = async (oldPassword:string,newPassword: string): Promise<AuthReturnData> => {
		try {
			const user = await User.findById(this._id);
			if (!user) {
				return { message: 'User  not already exists', success: false };
			} else {
				const isPasswordEqual = await bcrypt.compare(
					oldPassword,
					user.password
				);
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
			return { message: 'An error occurred', success: false };
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
			return { message: 'An error occurred Verify', success: false };
		}
	}
}
