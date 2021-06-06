import {
	ITransportSub,
	ITransportSubDocument
} from './../Models/TransportSub/TransportSub.Interface';
import { defaultStatusPackage, defaultTypeStatus } from './../common/constants';
import {
	IPackage,
	ILocation,
	IInfoUser
} from './../Models/Package/Package.Interface';
import { ReturnServices } from '../Interfaces/Services';
import { Package, Transport, TransportSub } from '../Models';
import { getDistanceFromLatLonInKm } from '../common/helper';

export default class AutomaticPackageServices {
	constructor() {}

	public automaticPackageToSub = async (): Promise<ReturnServices> => {
		try {
			const autoPackage = await Package.find({
				isAwait: false,
				status: defaultStatusPackage.waitForConfirmation
			});

			const autoP = await Package.aggregate([
        { "$unwind": "$products" },
				{
					$match: {
						isAwait: false,
						status: `${defaultStatusPackage.waitForConfirmation}`
					}
				},
				{
					$group: {
						_id: { from: '$FK_SubTransport', to: '$FK_SubTransportAwait' }
					}
				}
			]);
			console.log(
				`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 25 ===> autoP`,
				autoP
			);
			// ,
			// autoPackage.forEach(async(p)=>{

			// })

			console.log(
				`LHA:  ===> file: Package.Services.ts ===> line 234 ===> autoPackage`,
				autoPackage
			);
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public automaticSubToPackage = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
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
