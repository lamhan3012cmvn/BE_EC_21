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
			const autoP = await Package.aggregate([
				{
					$match: {
						isAwait: false,
						status: `${defaultStatusPackage.waitForConfirmation}`,
						// createdAt: { $lt: new Date(endDay) }
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
						// createdAt: { $lt: new Date(endDay) }
					});
					return resPack;
				})
			);

			currentPackage.forEach(async current=>{
				const obj={
					packages:current,
					status:defaultStatusAwaitPackage.goingClientToSub,
					FK_Transport:current[0].FK_Transport,
					FK_from:current[0].FK_SubTransport,
					FK_to:current[0].FK_SubTransportAwait
				}
				current.forEach(async change=>{
					change.isAwait=true
					change.status=defaultStatusPackage.onGoing
					const findTransportSub= await TransportSub.findById(obj.FK_from)
					if(findTransportSub)
					change.historyStatus&&change.historyStatus.push({createAt:new Date(),title:`Your order has arrived at transportsub: ${findTransportSub.name}`})
					await change.save()
				})

				
				const newAwaitPackage=new AwaitTranPackage(obj)
				newAwaitPackage.save()
			})
			return {
				message: 'Successful updated transport',
				success: true,
				data:{}
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public automaticSubToSub = async (): Promise<ReturnServices> => {
		try {
			const awaitPackages=await AwaitTranPackage.find({
				status:defaultStatusAwaitPackage.goingClientToSub,
			})
			awaitPackages.forEach(async currentPackage=>{
				currentPackage.packages.forEach(async change=>{
					const prePackage=await Package.findById(change._id)
          console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 102 ===> prePackage`, prePackage)
					if(prePackage)
					{
						const findTransportSub= await TransportSub.findById(change.FK_SubTransportAwait)
            console.log(`LHA:  ===> file: AutomaticPackage.Services.ts ===> line 106 ===> findTransportSub`, findTransportSub)
						prePackage.historyStatus&&prePackage.historyStatus.push({createAt:new Date(),title:`Your order has arrived at transportsub: ${findTransportSub&&findTransportSub.name}`})
						await prePackage.save()
					}
				})
				currentPackage.status=defaultStatusAwaitPackage.goingSubToSub
				await currentPackage.save()
			})

			return {
				message: 'Successful updated transport',
				success: true,
				data:{}
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};


	public automaticSubToPackage = async (): Promise<ReturnServices> => {
		try {
			const awaitPackages=await AwaitTranPackage.find({
				status:defaultStatusAwaitPackage.goingSubToSub,
			})
			awaitPackages.forEach(async currentPackage=>{
				currentPackage.packages.forEach(async element => {
					const prePackage=await Package.findById(element._id)
					if(prePackage)
					{
						prePackage.isAwait=false
						const findTransportSub= await TransportSub.findById(element.FK_SubTransportAwait)
						if(findTransportSub)
						prePackage.historyStatus&&prePackage.historyStatus.push({createAt:new Date(),title:`Your order is being delivered to you: ${findTransportSub.name}`})
						await prePackage.save()
					}
				});
				currentPackage.status=defaultStatusAwaitPackage.goingSubToClient
				currentPackage.isDone=true
				await currentPackage.save()
			})
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

	public functionInit = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
