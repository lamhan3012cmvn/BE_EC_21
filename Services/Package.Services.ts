import {
	IPackage,
	ILocation,
	IInfoUser
} from './../Models/Package/Package.Interface';
import { ReturnServices } from '../Interfaces/Services';
import { Package, Transport } from '../Models';

export default class PackageService {
	constructor() {}

	public createPackage = async (body: any): Promise<ReturnServices> => {
		try {
			const {
				title,
				description,
				FK_ProductId,
				FK_ProductType,
  			estimatedDate,
  			FK_Transport,
				distance,
				prices,
				weight,
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

			const currentTransport=await Transport.findById(FK_Transport)
			if(!currentTransport) 	return { message: "Don't find transport", success: false };
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
				FK_Transport,
				estimatedDate:`${estimatedDate+172800}`,
				codeBill:`${currentTransport.name.slice(0,3).toLocaleUpperCase()}${(new Date).getTime()}`,
				description,
				prices,
				weight,
				distance,
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
