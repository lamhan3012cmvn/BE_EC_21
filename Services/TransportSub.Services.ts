import { defaultStatusPackage } from './../common/constants';
import { ILocation } from './../Models/Package/Package.Interface';
import { ITransportSubCity } from './../Models/TransportSubCity/TransportSubCity.Interface';
import { ITransportSub } from './../Models/TransportSub/TransportSub.Interface';
import { Package, Transport, TransportSub, User } from '../Models/index';
import { ReturnServices } from '../Interfaces/Services';
import { defaultTypeStatus } from '../common/constants';

export default class TransportSubServices {
	constructor() {}

	public cancelPackage=async (idPackage:string):Promise<ReturnServices>=>{
		try {
			
			const _package = await Package.findOne(
				{
					_id: idPackage,
					isAwait: false,
					status:defaultStatusPackage.waitForConfirmation
				}
			)
				if(!_package) 
			return {
				message: 'Dont find package receive',
				success: false,
			};

			_package.status=defaultStatusPackage.cancel
			_package.historyStatus&&_package.historyStatus.push({createAt:new Date(),title:"Your order is canceled by transport. Thank you for using the service"})
			await _package.save()
			const _user=await User.findById(_package.FK_Recipient)
      if(_user&&_package.prices)
			{
				_user.point=_user.point+(+_package.prices||0)
				await _user.save()
			}
			return {
				message: 'Dont find package receive',
				success: false,
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	}
	public getPrice = async (): Promise<ReturnServices> => {
		return {
			message: 'Can not find a user to create transport',
			success: false,
			status: 400
		};
	};

	//Transport Sub
	private findTransportByUser = async (id: string, option = {}) => {
		// const user = await User.findById(id);
		// if (!user) {
		// 	return {
		// 		current: null,
		// 		message: 'Can not find a user to create transportSub'
		// 	};
		// }
		const idTransport = await Transport.findOne({ FK_createUser: id }, option);
		if (!idTransport) {
			return {
				current: null,
				message: 'Can not find a Transport to create transportSub'
			};
		}
		return {
			current: { transport: idTransport, message: 'success' }
		};
	};

	public createTransportSub = async (
		idUser: string,
		data: any
	): Promise<ReturnServices> => {
		try {
			const _transport = await this.findTransportByUser(idUser);
			if (!_transport.current) {
				return {
					message: _transport.message,
					success: false
				};
			}

			const {
				locationCity,
				locationCoordinateLat,
				locationCoordinateLng,
				locationAddress,
				phoneNumber
			} = data;

			const locationTransport: ILocation = {
				address: locationAddress,
				coordinate: {
					lat: locationCoordinateLat,
					lng: locationCoordinateLng
				}
			};
			const nameTransport = _transport.current.transport.name;
			const nameMail = nameTransport.slice(
				0,
				nameTransport.search('Transport') - 1
			);
			const obj: ITransportSub = {
				name: `${nameTransport}_${locationCity}`,
				location: locationTransport,
				phoneNumber,
				mail: `${nameMail.replace(
					' ',
					''
				)}.${locationCity}.Transport@gmail.com`,
				FK_Transport: _transport.current.transport._id
			};

			const newTransportSub = new TransportSub(obj);
			await newTransportSub.save();

			// _transport.current.user.FK_transport=newTransportSub._id
			// await _transport.current.user.save();

			return {
				message: 'Successfully created transportSub',
				success: true,
				data: {}
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public updateTransportSub = async (
		id: string,
		newData: any
	): Promise<ReturnServices> => {
		console.log(
			`LHA:  ===> file: TransportSub.Services.ts ===> line 102 ===> newData`,
			newData
		);
		try {
			const transportSub = await TransportSub.findByIdAndUpdate(id, newData);
			if (transportSub) {
				await transportSub.save();
				return {
					message: 'Successful updated transportSub',
					success: true,
					data: {}
				};
			} else {
				return {
					message: 'transportSub  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public deleteTransportSub = async (
		id: string,
		status: string = 'IS_ACTIVE'
	): Promise<ReturnServices> => {
		try {
			const transportSub = await TransportSub.findById(id);
			if (transportSub) {
				transportSub.update({ status });
				await transportSub.save();
				return {
					message: 'Successful updated transportSub',
					success: true,
					data: transportSub
				};
			} else {
				return {
					message: 'transportSub  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public getTransportSub = async (id: string): Promise<ReturnServices> => {
		try {
			const transportSub = await TransportSub.findOne({FK_CreateUser:id});
			if (transportSub) {
				return {
					message: 'Successful data retrieval',
					success: true,
					data: transportSub
				};
			} else {
				return {
					message: 'transportSub  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public getOrderByStatus=async (idUser:string,status:string):Promise<ReturnServices>=>{
		try {
			const currentTransportSub= await TransportSub.findOne({FK_CreateUser:idUser})
      console.log(`LHA:  ===> file: TransportSub.Services.ts ===> line 180 ===> currentTransportSub`, currentTransportSub)
      if(!currentTransportSub)
      return {
				message: 'Dont fine transport sub',
				success: false,
			};
			const packages = await Package.find(
				{
					FK_SubTransport:currentTransportSub._id,
					status: status
				},
				{
					_id: 1,
					status: 0,
					FK_SubTransport: 0,
					FK_SubTransportAwait: 0
				}
			)
      
			const sortPackages=JSON.parse(JSON.stringify(packages)).sort(
				(a: any, b: any) =>
				new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
			);
			let canReceive=false
			let canDelete=false
			if(status===defaultStatusPackage.waitForConfirmation)
			{
				canDelete=true
			}
			if(status===defaultStatusPackage.onGoing)
			{
				canReceive=true
			}
			const resData=sortPackages.map((pack:any)=>{
				console.log("canReceive",canReceive)
				console.log("not is Await",pack.isAwait)
				console.log("=======================================")
				return Object.assign(pack,{canReceive:canReceive&&(!pack.isAwait),canDelete})
			})
			// 	//canReceive
				// canDelete
			return {
				message: 'Get all order by Status',
				success: true,
				data: Object.assign(resData,{idSub:currentTransportSub._id})
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
  }

	public changeStatusTransportSub = async (
		id: string,
		status: boolean
	): Promise<ReturnServices> => {
		try {
			const transportSub = await TransportSub.findById(id);
			if (transportSub) {
				transportSub.status = status
					? defaultTypeStatus.active
					: defaultTypeStatus.inActive;
				await transportSub.save();
				return {
					message: 'Successful change status transport sub',
					success: true,
					data: {}
				};
			}
			return {
				message: 'transportSub  already does not exists',
				success: false
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	
}
