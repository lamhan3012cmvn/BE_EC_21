import { IPackage } from './../Models/Package/Package.Interface';
import { CartPath } from '../common/RoutePath';
import { Response, NextFunction } from 'express';
import Controller, { Methods } from './Controller';
import TokenServices from '../Services/Token.Services';
import { IValidateRequest } from '../common/DefineRequest';
import Validate from '../Validates/Validate';
import RoleInstance from '../common/RoleInstance';
import MerchantCartServices from '../Services/MerchantCart.Services';
// import { IProductCartMerchant } from '../Models/MerchantCart/MechantCart.Interface';
import schemaMerchantCart from '../Validates/MerchantCart.Validate';
import PackageService from '../Services/Package.Services';
import UserService from '../Services/User.Services';
import {
	defaultStatusPackage,
	defaultTypeOrders,
	defaultTypePayment
} from '../common/constants';
import PaypalServices from '../Services/Paypal.Services';
import VNPayServices from '../Services/VNPay.Services';
export default class MerchantCartController extends Controller {
	path = '/User/Merchant';
	routes = [
		{
			path: `/${CartPath.ADD_PRODUCT_TO_CART}`,
			method: Methods.POST,
			handler: this.handleAddProductToCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.addProductToCartid)
			]
		},
		{
			path: `/${CartPath.UPDATE_PRODUCT_FROM_CART}`,
			method: Methods.POST,
			handler: this.handleUpdateProductToCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.updateProductToCartid)
			]
		},
		{
			path: `/${CartPath.DELETE_PRODUCT_FROM_CART}`,
			method: Methods.POST,
			handler: this.handleDeleteProductFromCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.deleteProductFromCart)
			]
		},
		{
			path: `/${CartPath.GET_MY_CART}`,
			method: Methods.GET,
			handler: this.handleGetMyCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([])
			]
		},
		{
			path: `/${CartPath.PAYMENT_CART}`,
			method: Methods.POST,
			handler: this.handlePaymentCart,
			localMiddleware: [
				TokenServices.verify,
				RoleInstance.getInstance().isRole([]),
				Validate.body(schemaMerchantCart.paymentMerchantCart)
			]
		}
	];
	constructor() {
		super();
	}

	async handleAddProductToCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const objData: any = {
				idProduct: req.value.body.idProduct,
				quantity: req.value.body.quantity
			};
			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.addProductToCart(
				idUser,
				objData
			);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handleUpdateProductToCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const objData: any = {
				idProduct: req.value.body.idProduct,
				quantity: req.value.body.quantity
			};
			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.updateProductToCart(
				idUser,
				objData
			);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleDeleteProductFromCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser: string = req.value.body.token.data;
			const idProduct: string = req.value.body.idProduct;

			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.deleteProductFromCart(
				idUser,
				idProduct
			);

			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}

	async handleGetMyCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser = req.value.body.token.data;
			const merchantCartServices: MerchantCartServices =
				new MerchantCartServices();
			const result = await merchantCartServices.getMyCart(idUser);
			if (result.success) {
				super.sendSuccess(res, result.data, result.message);
			} else {
				super.sendError(res, result.message);
			}
		} catch {
			super.sendError(res);
		}
	}
	async handlePaymentCart(
		req: IValidateRequest | any,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const idUser: string = req.value.body.token.data;

			const {
				title,
				description,
				estimatedDate,
				FK_Address,
				FK_Transport,
				FK_SubTransport,
				FK_SubTransportAwait,
				recipientAddress,
				recipientLat,
				recipientLng,
				recipientPhone,
				prices,
				distance,
				weight,

				senderName,
				senderPhone,
				senderAddress,
				senderLat,
				senderLng,
				typePayment
			} = req.value.body;

			//get user
			const userService: UserService = new UserService();
			const user = await userService.getInfo(idUser);
			if (typePayment == defaultTypePayment.POINT) {
				const converPriceToPoint = ~~+prices / 100;
				if (user.data.point > converPriceToPoint) {
					user.data.point = user.data.point - converPriceToPoint;
					await user.data.save();

					const merchantCartServices: MerchantCartServices =
						new MerchantCartServices();
					const resMerchantCart = await merchantCartServices.paymentCart(
						idUser
					);
					if (resMerchantCart.data.products.length <= 0) {
						super.sendError(res, 'Your current shopping cart is empty');
					}
					const obj: any = {
						status: defaultStatusPackage.waitForConfirmation,
						title,
						description,
						estimatedDate,
						FK_Recipient: idUser,
						FK_Transport,
						FK_SubTransport,
						FK_SubTransportAwait,
						prices,
						distance,
						weight,
						FK_Product: resMerchantCart.data.products, //Get from cart
						FK_ProductType: 'Standard', //Get from cart
						recipient: {
							name: user.data.fullName,
							location: {
								address: recipientAddress,
								coordinate: {
									lat: recipientLat,
									lng: recipientLng
								}
							},
							phone: recipientPhone
						},
						sender: {
							name: senderName,
							location: {
								address: senderAddress,
								coordinate: {
									lat: senderLat,
									lng: senderLng
								}
							},
							phone: senderPhone
						}
					};

					console.log(
						`LHA:  ===> file: MerchantCart.Controller.ts ===> line 192 ===> obj`,
						obj
					);
					const packageService: PackageService = new PackageService();
					const result = await packageService.createPackage(obj);
					if (result.success) {
						super.sendSuccess(res, {}, result.message);
						return;
					} else {
						super.sendError(res, result.message);
					}
				} else {
					super.sendError(
						res,
						'Your points are not enough to pay for this order'
					);
				}
			} else {
				const merchantCartServices: MerchantCartServices =
					new MerchantCartServices();
				const resMerchantCart = await merchantCartServices.paymentCart(idUser);
				if (resMerchantCart.data.products.length <= 0) {
					super.sendError(res, 'Your current shopping cart is empty');
				}
				const obj: any = {
					status: defaultStatusPackage.deleted,
					title,
					description,
					estimatedDate,
					FK_Recipient: idUser,
					FK_Transport,
					FK_SubTransport,
					FK_SubTransportAwait,
					prices,
					distance,
					weight,
					FK_Product: resMerchantCart.data.products, //Get from cart
					FK_ProductType: 'Standard', //Get from cart
					recipient: {
						name: user.data.fullName,
						location: {
							address: recipientAddress,
							coordinate: {
								lat: recipientLat,
								lng: recipientLng
							}
						},
						phone: recipientPhone
					},
					sender: {
						name: senderName,
						location: {
							address: senderAddress,
							coordinate: {
								lat: senderLat,
								lng: senderLng
							}
						},
						phone: senderPhone
					}
				};

				console.log(
					`LHA:  ===> file: MerchantCart.Controller.ts ===> line 192 ===> obj`,
					obj
				);
				const packageService: PackageService = new PackageService();
				const result = await packageService.createPackage(obj);
				if (result.success) {
					if (typePayment == defaultTypePayment.PAYPAL) {
						const paypalServices: PaypalServices = new PaypalServices();
						const transactionsInfo = {
							idUser: idUser,
							idPackage: result.data._id,
							typeOrders: defaultTypeOrders.ORDER
						};
						const transactions = ~~prices;
						paypalServices.payment(
							transactions,
							transactionsInfo,
							(error: any, payment: any) => {
								if (error) {
									console.log(error);
									super.sendError(res, 'Payment failure!');
								} else {
									for (let i = 0; i < payment.links.length; i++) {
										if (payment.links[i].rel === 'approval_url') {
											super.sendSuccess(
												res,
												payment.links[i].href,
												'Successfully create order'
											);
										}
									}
								}
							}
						);
					} else if (typePayment == defaultTypePayment.VNPAY) {
						const vnpayServices: VNPayServices = new VNPayServices();
						const transactionsInfo = {
							idUser: idUser,
							typeOrders: defaultTypeOrders.ORDER,
							idPackage: result.data._id,
							amount: `${~~prices}`,
							bankCode: 'NCB',
							orderDescription: 'Thanh toan hoa don mua hang Van Transport',
							language: 'vn'
						};
						const resultPayment = await vnpayServices.payment(
							transactionsInfo,
							req.headers,
							req.connection,
							req.socket
						);
						if (resultPayment.success) {
							super.sendSuccess(
								res,
								resultPayment.data.url,
								'Successfully create order'
							);
						} else {
							super.sendError(res, result.message);
						}
					} else {
						super.sendError(res);
					}
				} else {
					super.sendError(res, result.message);
				}
			}

			// if (result.success) {
			//   super.sendSuccess(res, result.data, result.message);
			// } else {
			//   super.sendError(res, result.message);
			// }
		} catch (err) {
			console.log('err', err);
			super.sendError(res);
			[];
		}
	}
}
