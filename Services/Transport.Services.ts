import { ILocation } from './../Models/Package/Package.Interface';
import { ITransportSubCity } from './../Models/TransportSubCity/TransportSubCity.Interface';
import { ITransportSub } from './../Models/TransportSub/TransportSub.Interface';
import { defaultRoleAccount, defaultTypeSupport } from './../common/constants';
import { ITransport } from '../Models/Transport/Transport.interface';
import {
	Transport,
	TransportSub,
	TransportSubCity,
	User
} from '../Models/index';
import { ReturnServices } from '../Interfaces/Services';
import TransportSubServices from './TransportSub.Services';
import UserService from './User.Services';

export default class TransportServices {
	constructor() {}

	public getPrice = async (): Promise<ReturnServices> => {
		return {
			message: 'Can not find a user to create transport',
			success: false,
			status: 400
		};
	};
	public createTransport = async (
		idUser: string,
		data: any
	): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'Can not find a user to create transport',
					success: false,
					status: 400
				};
			}

			const typeSupport = defaultTypeSupport;
			const { name, description, avatar, imageVerify, phone, headquarters } =
				data;

			const obj: ITransport = {
				name,
				description,
				avatar,
				imageVerify,
				phone,
				headquarters,
				typeSupport: typeSupport,
				FK_createUser: user._id,
				FK_Staffs: []
			};

			const newTransport = new Transport(obj);
			await newTransport.save();

			user.role = defaultRoleAccount.TRANSPORT;
			await user.save();

			const objTransportSubHCM: ITransportSub = {
				name: `${newTransport.name}_${'HCM'}`,
				location: {
					city: 'A',
					coordinate: {
						lat: '1',
						lng: '1'
					},
					county: 'A',
					ward: 'A',
					address: 'A'
				},
				FK_Transport: newTransport._id
			};

			const objTransportSubHN: ITransportSub = {
				name: `${newTransport.name}_${'HN'}`,
				location: {
					city: 'B',
					coordinate: {
						lat: '1',
						lng: '1'
					},
					county: 'B',
					ward: 'B',
					address: 'B'
				},
				FK_Transport: newTransport._id
			};

			const newTransportSubHCM = new TransportSub(objTransportSubHCM);
			await newTransportSubHCM.save();

			const newTransportSubHN = new TransportSub(objTransportSubHN);
			await newTransportSubHN.save();

			const objSubHCMQ1: ITransportSubCity = {
				name: `${newTransport.name}_${'HCM'}_${'Q1'}`,
				district: 'HO_CHI_MINH',
				FK_Transport_Sub: newTransportSubHCM._id
			};

			const objSubHNHHK: ITransportSubCity = {
				name: `${newTransport.name}_${'HCM'}_${'Q1'}`,
				district: 'HO_HOAN_KIEM',
				FK_Transport_Sub: newTransportSubHN._id
			};

			const subHCMQ1 = new TransportSubCity(objSubHCMQ1);
			await subHCMQ1.save();

			const subHNHHK = new TransportSubCity(objSubHNHHK);
			await subHNHHK.save();

			return {
				message: 'Successfully created transport',
				success: true,
				data: {}
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public updateTransport = async (
		id: string,
		body: any
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findOneAndUpdate(
				{ FK_createUser: id },
				body,
				{ new: true }
			);
			console.log(transport);
			if (!transport) {
				return {
					message: 'transport already does not exists',
					success: false
				};
			}
			return {
				message: 'Successful updated transport',
				success: true,
				data: transport
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public deleteTransport = async (
		id: string,
		status: string = 'IS_ACTIVE'
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findById(id);
			if (transport) {
				transport.update({ status });
				await transport.save();
				return {
					message: 'Successful updated transport',
					success: true,
					data: transport
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public getAssignStaff = async (): Promise<ReturnServices> => {
		try {
			const staff = await User.find({role:defaultRoleAccount.STAFF},{_id:1,email:1,fullName:1,image:1,address:1});
			if (staff) {
				return {
					message: 'Successful data retrieval',
					success: true,
					data: staff
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	
	public getTransport = async (id: string): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findOne({ FK_createUser: id });
			if (transport) {
				return {
					message: 'Successful data retrieval',
					success: true,
					data: transport
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public assignStaff = async (
		idSub: string,
		idUser: string
	): Promise<ReturnServices> => {
		try {
			const subServices: TransportSubServices = new TransportSubServices();
			const updateTransportServices = await subServices.updateTransportSub(
				idSub,
				{
					FK_CreateUser: idUser
				}
			);
			if (updateTransportServices.success) {
				const userServices: UserService = new UserService();
				const updateUserService = await userServices.updateInfo(idUser, {
					role: defaultRoleAccount.TRANSPORT_SUB
				});
				if(updateUserService.success)
				{
					return {
						message: 'Successful assign staff',
						success: true,
						data: {}
					};
				}
				return {
					message: updateUserService.message,
					success: false,
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
