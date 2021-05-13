import { IPackage } from './../Models/Package/Package.Interface';
import { ReturnServices } from '../Interfaces/Services';
import { Package } from '../Models';
import { defaultTypeStatus } from '../common/constants';

export default class PackageService {
	constructor() {}

	public createPackage = async (body: IPackage): Promise<ReturnServices> => {
		try {
			const {
				title,
				recipientName,
				recipientPhone,
				senderName,
				senderPhone,
				description,
				from,
				to
			} = body;

			const obj = {
				title: title,
				description: description,
				recipientName: recipientName,
				senderName: senderName,
				recipientPhone: recipientPhone,
				senderPhone: senderPhone,
				to: {
					city: to.city,
					county: to.county,
					ward: to.ward,
					address: to.address,
					coordinate: to.coordinate
				},
				from: {
					city: from.city,
					county: from.county,
					ward: from.ward,
					address: from.address,
					coordinate: from.coordinate
				}
			};

			const newPackage = new Package(obj);
			await newPackage.save();

			return { message: 'Create Successfully', success: true };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public functionInit = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
