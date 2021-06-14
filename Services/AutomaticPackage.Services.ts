import {
	ITransportSub,
	ITransportSubDocument
} from './../Models/TransportSub/TransportSub.Interface';
import { defaultStatusPackage, defaultTypeStatus, defaultStatusAwaitPackage } from './../common/constants';
import {
	IPackage,
	ILocation,
	IInfoUser
} from './../Models/Package/Package.Interface';
import { ReturnServices } from '../Interfaces/Services';
import { Package, Transport, TransportSub } from '../Models';
import { getDistanceFromLatLonInKm } from '../common/helper';
import AwaitTranPackage from '../Models/AwaitTransportPackage';

export default class AutomaticPackageServices {
	constructor() {}

	public automaticPackageToSub = async (): Promise<ReturnServices> => {
		try {

			const startDay = new Date().setHours(0, 0, 0, 0);

			const endDay = new Date().setHours(23, 59, 59, 59);

			const autoP = await Package.aggregate([
				{
					$match: {
						isAwait: false,
						status: `${defaultStatusPackage.waitForConfirmation}`,
						createdAt: { $lt: new Date(endDay) }
					}
				},
				{
					$group: {
						_id: {
							from: '$FK_SubTransport',
							to: '$FK_SubTransportAwait',
							FK_Transport: '$FK_Transport'
						}
					}
				}
			]);


			const currentPackage = await Promise.all(
				autoP.map(async current => {
					const query = current._id;
					const resPack = await Package.find({
						FK_SubTransport: query.from,
						FK_SubTransportAwait: query.to,
						FK_Transport: query.FK_Transport,
						isAwait: false,
						status: `${defaultStatusPackage.waitForConfirmation}`,
						createdAt: { $lt: new Date(endDay) }
					});
					return resPack;
				})
			);

      console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 62 ===> currentPackage`, currentPackage)
			currentPackage.forEach(async current=>{
				current.forEach(async change=>{
					change.isAwait=true
					change.status=defaultStatusPackage.onGoing
					await change.save()
				})

				const obj={
					packages:current,
					status:defaultStatusAwaitPackage.goingClientToSub,
					FK_Transport:current[0].FK_Transport,
					FK_from:current[0].FK_SubTransport,
					FK_to:current[0].FK_SubTransportAwait
				}
				const newAwaitPackage=new AwaitTranPackage(obj)
				newAwaitPackage.historyStatus.push(`Your order has arrived at transportsub 1`)
				newAwaitPackage.save()
			})
			return {
				message: 'Successful updated transport',
				success: true,
				data:currentPackage
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public automaticSubToSub = async (): Promise<ReturnServices> => {
		try {

			const startDay = new Date().setHours(0, 0, 0, 0);

			const endDay = new Date(new Date().getDay()-2)
      console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 94 ===> endDay`, endDay)
			const awaitPackages=await AwaitTranPackage.find({
				status:defaultStatusAwaitPackage.goingClientToSub,
				// createdAt: { $lt: new Date(endDay) },
			})
      console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 99 ===> awaitPackages`, awaitPackages)
			awaitPackages.forEach(async currentPackage=>{
      console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 101 ===> currentPackage`, currentPackage)

				currentPackage.historyStatus.push("Your order has arrived at transportsub 2")
				currentPackage.status=defaultStatusAwaitPackage.goingSubToSub
				await currentPackage.save()
			})
			console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 101 ===> awaitPackages`, awaitPackages)



			
			return {
				message: 'Successful updated transport',
				success: true,
				data:awaitPackages
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};


	public automaticSubToPackage = async (): Promise<ReturnServices> => {
		try {

			
			const startDay = new Date().setHours(0, 0, 0, 0);

			const endDay = new Date(new Date().getDay()-2)
      console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 94 ===> endDay`, endDay)
			const awaitPackages=await AwaitTranPackage.find({
				status:defaultStatusAwaitPackage.goingSubToSub,
				// createdAt: { $lt: new Date(endDay) },
			})
      console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 99 ===> awaitPackages`, awaitPackages)
			awaitPackages.forEach(async currentPackage=>{
				currentPackage.packages.forEach(async element => {
					const prePackage=await Package.findById(element._id)
					if(prePackage)
					{
						prePackage.isAwait=false
						// await prePackage.save()
					}
				});
				currentPackage.status=defaultStatusAwaitPackage.goingSubToClient
				currentPackage.historyStatus.push("Your order is being delivered to you")
				currentPackage.isDone=true
				// await currentPackage.save()
			})
			console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 101 ===> awaitPackages`, awaitPackages)


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
