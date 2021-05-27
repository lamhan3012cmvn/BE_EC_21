import { ITransportSubCity } from './../Models/TransportSubCity/TransportSubCity.Interface';
import {
	Transport,
	TransportSub,
	TransportSubCity,
	User
} from '../Models/index';
import { ReturnServices } from '../Interfaces/Services';

export default class TransportSubCityServices {
	constructor() {}

	public getPrice = async (): Promise<ReturnServices> => {
		return {
			message: 'Can not find a user to create transport',
			success: false,
			status: 400
		};
	};

	public createTransportSubCity = async (
		idUser: string,
		data: any
	): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'Can not find a user to create transportSubCity',
					success: false,
					status: 400
				};
			}

			const { name, district, ward, coordinates, phoneNumber, mail } = data;

			const obj: ITransportSubCity = {
				name,
				district,
				ward,
				coordinates,
				phoneNumber,
				mail,
				FK_Transport_Sub: ''
			};
			const newTransportSubCity = new TransportSubCity(obj);
			await newTransportSubCity.save();
			return {
				message: 'Successfully created transportSubCity',
				success: true,
				data: newTransportSubCity
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public updateTransportSubCity = async (
		id: string,
		newData: any
	): Promise<ReturnServices> => {
		try {
			const idSubCity = '';
			const transportSubCity = await TransportSubCity.findById(idSubCity);
			if (transportSubCity) {
				transportSubCity.update(newData);
				await transportSubCity.save();
				return {
					message: 'Successful updated transportSubCity',
					success: true,
					data: transportSubCity
				};
			} else {
				return {
					message: 'transportSubCity  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public deleteTransportSubCity = async (
		id: string,
		status: string = 'IS_ACTIVE'
	): Promise<ReturnServices> => {
		try {
			const transportSubCity = await TransportSubCity.findById(id);
			if (transportSubCity) {
				transportSubCity.update({ status });
				await transportSubCity.save();
				return {
					message: 'Successful updated transportSubCity',
					success: true,
					data: transportSubCity
				};
			} else {
				return {
					message: 'transportSubCity  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public getTransportSubCity = async (id: string): Promise<ReturnServices> => {
		try {
			const transportSubCity = await TransportSubCity.findById(id);
			if (transportSubCity) {
				return {
					message: 'Successful data retrieval',
					success: true,
					data: transportSubCity
				};
			} else {
				return {
					message: 'transportSubCity  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
