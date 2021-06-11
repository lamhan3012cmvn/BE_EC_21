import {
	IPackage,
	IPackageDocument
} from './../Models/Package/Package.Interface';
import { ICoordinates } from './../Models/User/User.Interface';
import { defaultTypePayment } from '../common/constants';
import { defaultTypeOrders } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import { User, Product, ProductInfo, Package } from '../Models';
import { ILocation } from '../Models/Package/Package.Interface';
import PaypalServices from './Paypal.Services';
import VNPayServices from './VNPay.Services';

export default class UserService {
	constructor() {}
	public updateInfo = async (
		idUser: string,
		body: any
	): Promise<ReturnServices> => {
		try {
			const user = await User.findOneAndUpdate({ _id: idUser }, body, {
				new: true
			});
			if (!user) {
				return {
					message: 'User not exists',
					success: false
				};
			}
			return {
				message: 'Successfully update info',
				success: true,
				data: user
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public getInfo = async (idUser: string): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'User not exists',
					success: false
				};
			}
			return {
				message: 'Successfully get info',
				success: true,
				data: user
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public favorite = async (
		idProduct: string,
		idUser: string
	): Promise<ReturnServices> => {
		try {
			const product = await Product.findOne({ FK_currentInfo: idProduct });
			if (!product) {
				return {
					message: 'Product does not exists',
					success: false
				};
			} else {
				const user = await User.findById(idUser);
				if (!user) {
					return {
						message: 'User does not exists',
						success: false
					};
				} else {
					var favorites = user.favorites;
					if (!!favorites) {
						var index = favorites.indexOf(idProduct);
						if (index != -1) {
							favorites.splice(index, 1);
						} else {
							favorites.push(idProduct);
						}
						user.update({ favorites });
						await user.save();
					}
					return {
						message: 'Successfully favorite product',
						success: true,
						data: user
					};
				}
			}
		} catch (error) {
			console.log(error);
			return { message: 'An error occurred', success: false };
		}
	};

	public getListFavorites = async (idUser: string): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'User does not exists',
					success: false
				};
			} else {
				const favorites = user.favorites;
				let result = [];
				for (let i = 0; i < favorites.length; i++) {
					let productInfo = await ProductInfo.findById(favorites[i]);
					if (!productInfo) {
						return {
							message: 'Product does not exists',
							success: false
						};
					} else {
						productInfo.FK_product = favorites[i];
						result.push(productInfo);
					}
				}
				return {
					message: 'Successfully get list favorites',
					success: true,
					data: result
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public addAddress = async (
		idUser: string,
		body: any
	): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'User does not exists',
					success: false
				};
			} else {
				var address = user.address;
				if (!address) {
					return {
						message: 'User does not exists',
						success: false
					};
				} else {
					address.push({
						id: user.email + new Date().toISOString(),
						fullAddress: body.fullAddress,
						coordinates: {
							lat: body.lat,
							lng: body.lng
						},
						phoneNumber: body.phone
					});
					user.update(
						{
							address: address
						},
						{ new: true }
					);
					await user.save();
				}
				return {
					message: 'Successfully add address',
					success: true,
					data: user
				};
			}
		} catch (error) {
			console.log(error);
			return { message: 'An error occurred', success: false };
		}
	};

	public updateAddress = async (
		idUser: string,
		body: any
	): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'User does not exists',
					success: false
				};
			} else {
				var address = user.address;
				if (!address) {
					return {
						message: 'User does not exists',
						success: false
					};
				} else {
					const index = address.findIndex(e => e.id == body.id);
					if (index != -1) {
						address[index] = {
							id: body.id,
							fullAddress: body.fullAddress,
							coordinates: {
								lat: body.lat,
								lng: body.lng
							},
							phoneNumber: body.phone
						};
					}
					user.update({ $set: { address: address } }).exec();
					await user.save();
				}
				return {
					message: 'Successfully update address',
					success: true,
					data: user
				};
			}
		} catch (error) {
			console.log(error);
			return { message: 'An error occurred', success: false };
		}
	};

	public deleteAddress = async (
		idUser: string,
		idAddress: string
	): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'User does not exists',
					success: false
				};
			} else {
				var address = user.address;
				if (!address) {
					return {
						message: 'User does not exists',
						success: false
					};
				} else {
					const index = address.findIndex(e => e.id === idAddress);
					address.splice(index, 1);
					user.update(
						{
							address: address
						},
						{ new: true }
					);
					await user.save();
				}
				return {
					message: 'Successfully delete address',
					success: true,
					data: user
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};

	public buyPoint = async (idUser: string, body: any, req: any, next: any) => {
		try {
			if (body.typePayment == defaultTypePayment.PAYPAL) {
				const paypalServices: PaypalServices = new PaypalServices();
				const transactionsInfo = {
					idUser: idUser,
					point: body.point,
					typeOrders: defaultTypeOrders.POINT
				};
				const transactions = ~~body.point * 100;
				paypalServices.payment(transactions, transactionsInfo, next);
			} else {
				const vnpayServices: VNPayServices = new VNPayServices();
				const transactionsInfo = {
					idUser: idUser,
					point: body.point,
					typeOrders: defaultTypeOrders.POINT,
					amount: `${~~body.point * 100}`,
					bankCode: 'NCB',
					orderDescription: 'Thanh toan hoa don mua point Van Transport',
					language: 'vn'
				};
				const result = await vnpayServices.payment(
					transactionsInfo,
					req.headers,
					req.connection,
					req.socket
				);
				next(result);
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public calcPricePackage = async (
		locationSender: ICoordinates,
		locationRecipient: ICoordinates
	): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public getOrderByStatus = async (
		idUser: string,
		status: string
	): Promise<ReturnServices> => {
		try {
			const packages = await Package.find(
				{
					FK_Recipient: idUser,
					status: status
				},
				{
					_id: 1,
					status: 0,
					FK_SubTransport: 0,
					FK_SubTransportAwait: 0,
					isAwait: 0,
					isMerchantSend: 0
				}
			).sort(
				(a: IPackage, b: IPackage) =>
					b.updatedAt.getTime() - a.updatedAt.getTime()
			);

			return {
				message: 'Get all order by Status',
				success: true,
				data: packages
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
