import { ILocation } from './../Models/Package/Package.Interface';
import { ITransportSubCity } from './../Models/TransportSubCity/TransportSubCity.Interface';
import { ITransportSub } from './../Models/TransportSub/TransportSub.Interface';
import {
	defaultRoleAccount,
	defaultTypeSupport,
	defaultTypeStatus
} from './../common/constants';
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
import { getDistanceFromLatLonInKm } from '../common/helper';

export default class TransportServices {
	constructor() {}

	public getPrice = async (): Promise<ReturnServices> => {
		return {
			message: 'Can not find a user to create transport',
			success: false
		};
	};

	public removeStaffTransport = async (
		idUserTransport: string,
		idStaff: string
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findOne({
				FK_createUser: idUserTransport
			});
			if (!transport) {
				return {
					message: 'Can not find transport',
					success: false
				};
			}
			const user = await User.findById(idStaff);
			if (!user) {
				return {
					message: 'Can not find user',
					success: false
				};
			}

			const transportSub = await TransportSub.findOne({
				FK_CreateUser: idStaff,
				FK_Transport: transport._id
			});

			if (!transportSub) {
				return {
					message: 'Can not find transport sub',
					success: false
				};
			}

			const newFKStaff = transport.FK_Staffs.filter(f => f !== idStaff);
			user.role = defaultRoleAccount.USER;
			transport.FK_Staffs = newFKStaff;
			transportSub.status = defaultTypeStatus.inActive;
			transportSub.FK_CreateUser = '';

			await transportSub.save();
			await user.save();
			await transport.save();

			return {
				message: 'Remove staff success',
				success: true,
				data: {}
			};
		} catch (error) {
			console.log(error);
			return { message: 'An error occurred', success: false };
		}
	};
	public updatePriceTypeTransport = async (
		idUserTransport: string,
		data: any
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findOne({
				FK_createUser: idUserTransport
			});
			if (!transport) {
				return {
					message: 'Can not find transport',
					success: false
				};
			}
			transport.typeSupport.forEach(type => {
				if (type.title === data.title) {
					const t = data.type === 'km' ? 'km' : 'kg';
					const p = data.type === 'kg' ? 'km' : 'kg';
					type.price[t] = data.price;
					type.price[p] = "0";
					type.available = data.available?defaultTypeStatus.active:defaultTypeStatus.inActive;
				}
			});

			await transport.save();

			return {
				message: 'Update Price Type Success',
				success: true,
				data: transport
			};
		} catch (err) {
			console.log(err);
			return { message: 'An error occurred', success: false };
		}
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
					success: false
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

			// const objSubHCMQ1: ITransportSubCity = {
			// 	name: `${newTransport.name}_${'HCM'}_${'Q1'}`,
			// 	district: 'HO_CHI_MINH',
			// 	FK_Transport_Sub: newTransportSubHCM._id
			// };

			// const objSubHNHHK: ITransportSubCity = {
			// 	name: `${newTransport.name}_${'HCM'}_${'Q1'}`,
			// 	district: 'HO_HOAN_KIEM',
			// 	FK_Transport_Sub: newTransportSubHN._id
			// };

			// const subHCMQ1 = new TransportSubCity(objSubHCMQ1);
			// await subHCMQ1.save();

			// const subHNHHK = new TransportSubCity(objSubHNHHK);
			// await subHNHHK.save();

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
			const staff = await User.find(
				{ role: defaultRoleAccount.STAFF },
				{ _id: 1, email: 1, fullName: 1, image: 1, address: 1 }
			);
			if (staff.length > 0) {
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
	public getAllTransportSub = async (
		id: string,
		status: string
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findOne({ FK_createUser: id });
			if (transport) {
				if (status === '') {
					const transportSub = await TransportSub.find(
						{ FK_Transport: transport._id },
						{ _id: 1, name: 1, location: 1, phone: 1 }
					);
					return {
						message: 'get all transport sub success',
						success: true,
						data: transportSub
					};
				}
				const transportSub = await TransportSub.find(
					{ FK_Transport: transport._id, status: status },
					{ _id: 1, name: 1, location: 1, phone: 1 }
				);
				return {
					message: 'get all transport sub success',
					success: true,
					data: transportSub
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
				if (updateUserService.success) {
					return {
						message: 'Successful assign staff',
						success: true,
						data: {}
					};
				}
				return {
					message: updateUserService.message,
					success: false
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

	// private findSubTransport= (SubPackage:Array<ITransportSubDocument>,currentLocation:ILocation):ITransportSubDocument|null=>{
	// 	if(SubPackage.length<=0) return null
	// 	const minSub={current:SubPackage[0],value:getDistanceFromLatLonInKm(+SubPackage[0].location.coordinate.lat,+SubPackage[0].location.coordinate.lng,+currentLocation.coordinate.lat,+currentLocation.coordinate.lng)}
	// 	SubPackage.forEach((elm)=>{
	// 		const coordinateSub=elm.location.coordinate
	// 		const min= getDistanceFromLatLonInKm(+coordinateSub.lat,+coordinateSub.lng,+currentLocation.coordinate.lat,+currentLocation.coordinate.lng)
	// 		if(min<minSub.value)
	// 		{
	// 			minSub.current=elm
	// 			minSub.value=min
	// 		}
	// 	})
	// 	return minSub.current
	// }


	public getTransportByAddress = async (
		lat: string,
		lng: string
	): Promise<ReturnServices> => {
		try {
			const transportSub = await TransportSub.find();
			const groupByTransport = transportSub.reduce((t: any, v: any) => {
				const findIdTransport = t.findIndex((k: any) => {
					return k.FK_Transport + '' === v.FK_Transport + '';
				});
				// getDistanceFromLatLonInKm(+SubPackage[0].location.coordinate.lat,+SubPackage[0].location.coordinate.lng,+currentLocation.coordinate.lat,+currentLocation.coordinate.lng)
				if (findIdTransport === -1) {
					const km=getDistanceFromLatLonInKm(+lat,+lng,+v.location.coordinate.lat,+v.location.coordinate.lng)
					const obj = {
						FK_Transport: v.FK_Transport,
						transportSub: [Object.assign(v)],
						distance:km
					};
					t.push(obj);
					return t;
				}
				t[findIdTransport].transportSub.push(Object.assign(v));
				return t;
			}, []);

			// const subServices: TransportSubServices = new TransportSubServices();
			// const updateTransportServices = await subServices.updateTransportSub(
			// 	idSub,
			// 	{
			// 		FK_CreateUser: idUser
			// 	}
			// );

			// if (updateTransportServices.success) {
			// 	const userServices: UserService = new UserService();
			// 	const updateUserService = await userServices.updateInfo(idUser, {
			// 		role: defaultRoleAccount.TRANSPORT_SUB
			// 	});
			// 	if (updateUserService.success) {
			// 		return {
			// 			message: 'Successful assign staff',
			// 			success: true,
			// 			data: {}
			// 		};
			// 	}
			// 	return {
			// 		message: updateUserService.message,
			// 		success: false
			// 	};
			// } else {
			// 	return {
			// 		message: 'transport  already does not exists',
			// 		success: false
			// 	};
			// }
			return {
				message: 'Get All Success',
				data: groupByTransport,
				success: true
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
