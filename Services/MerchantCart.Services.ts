// import { IProductCartMerchant } from '../Models/MerchantCart/MechantCart.Interface';
import { defaultTypeStatus } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import { MerchantCart } from '../Models';

export default class MerchantCartServices {
	constructor() {}

	public addProductToCart = async (
		idUser: string,
		objData: any
	): Promise<ReturnServices> => {
		try {
			const cart = await MerchantCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				const newCart = new MerchantCart({
					FK_CreateUser: idUser,
					products: [objData]
				});
				newCart.save();
				return { message: 'Add Product success my cart', success: true, data: {} };
			}
			cart.products.push(objData)
			await cart.save()
			return { message: 'Add Product success my cart', success: true, data: {} };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public deleteProductFromCart = async (idUser:string,idProduct:string): Promise<ReturnServices> => {
		try {
			const cart = await MerchantCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				return { message: 'Dont find my cart is delete product', success: false, data: {} };
			}

			cart.products=cart.products.filter(p=>p._id+""!==idProduct)
			await cart.save()
			return { message: 'Delete product successs my cart', success: true,data:cart};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public getMyCart = async (idUser: string): Promise<ReturnServices> => {
		try {
			const cart = await MerchantCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				const newCart = new MerchantCart({ FK_CreateUser: idUser });
				newCart.save();
				return { message: 'Get success my cart', success: true, data: newCart };
			}
			return { message: 'Get success my cart', success: true, data: cart };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public paymentCart = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
