import {
	IPackage,
	ILocation,
	IInfoUser
} from './../Models/Package/Package.Interface';
import { ReturnServices } from '../Interfaces/Services';
import { Package } from '../Models';
import { defaultTypeStatus } from '../common/constants';

export default class PackageService {
	constructor() {}

	public createPackage = async (body: any): Promise<ReturnServices> => {
		try {
			const {
				title,
				description,

				FK_ProductId,
				FK_ProductType,

				recipientName,
				recipientPhone,
				recipientCity,
				recipientCounty,
				recipientWard,
				recipientAddress,
				recipientCoordinateLat,
				recipientCoordinateLng,

				senderName,
				senderPhone,
				senderCity,
				senderCounty,
				senderWard,
				senderAddress,
				senderCoordinateLat,
				senderCoordinateLng
			} = body;
      console.log(`LHA:  ===> file: Package.Services.ts ===> line 40 ===> body`, body)

			const recipientLocation: ILocation = {
				city: recipientCity,
				county: recipientCounty,
				ward: recipientWard,
				address: recipientAddress,
				coordinate: {
					lat:recipientCoordinateLat,
					lng: recipientCoordinateLng,
				}
			};
			console.log(`LHA:  ===> file: Package.Services.ts ===> line 43 ===> recipientLocation`, recipientLocation)

			const currentRecipient: IInfoUser = {
				name: recipientName,
				phone: recipientPhone,
				location: recipientLocation
			};
			console.log(`LHA:  ===> file: Package.Services.ts ===> line 55 ===> currentRecipient`, currentRecipient)
			
			const senderLocation: ILocation = {
				city: senderCity,
				county: senderCounty,
				ward: senderWard,
				address: senderAddress,
				coordinate: {
					lat:senderCoordinateLat,
					lng: senderCoordinateLng,
				}
			};
			console.log(`LHA:  ===> file: Package.Services.ts ===> line 62 ===> senderLocation`, senderLocation)
			const currentSender:IInfoUser = {
				name: senderName,
				phone: senderPhone,
				location: senderLocation
			};
			
			console.log(`LHA:  ===> file: Package.Services.ts ===> line 73 ===> currentSender`, currentSender)
			
			const obj: IPackage = {
				title,
				recipient: currentRecipient,
				sender: currentSender,
				FK_ProductId,
				FK_ProductType,
				description
			};
			console.log(`LHA:  ===> file: Package.Services.ts ===> line 81 ===> obj`, obj)

			const newPackage = new Package(obj);
			//await newPackage.save();
      console.log(`LHA:  ===> file: Package.Services.ts ===> line 85 ===> newPackage`, newPackage)

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
