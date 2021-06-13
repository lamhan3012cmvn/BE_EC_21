import { defaultTypeStatus } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import { ClientCart } from '../Models';

export default class ClientCartServices {
	constructor() {}

	public addProductToCart = async (idUser:string,objData:any): Promise<ReturnServices> => {
		try {
			const cart = await ClientCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
      console.log(`LHA:  ===> file: ClientCart.Services.ts ===> line 14 ===> cart`, cart)
			if (!cart) {
				const newCart = new ClientCart({
					FK_CreateUser: idUser,
					products: [objData]
				});
				newCart.save();
				return { message: 'Add Product success my cart', success: true, data: {} };
			}
			cart.products.push(objData)
			console.log(`LHA:  ===> file: ClientCart.Services.ts ===> line 34 ===> objData`, objData)
			await cart.save()
			return { message: 'Add Product success my cart', success: true, data: {} };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public deleteProductFromCart = async (idUser:string,idProduct:string): Promise<ReturnServices> => {
		try {
			const cart = await ClientCart.findOne({
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
	public getMyCart = async (idUser:string): Promise<ReturnServices> => {
		try {
			const cart = await ClientCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				const newCart = new ClientCart({ FK_CreateUser: idUser });
				newCart.save();
				return { message: 'Get success my cart', success: true, data: newCart };
			}
			return { message: 'Get success my cart', success: true, data: cart };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public paymentCart = async (idUser:string): Promise<ReturnServices> => {
		try {
			const cart = await ClientCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				const newCart = new ClientCart({ FK_CreateUser: idUser });
				newCart.save();
				return { message: 'Get success my cart', success: true, data: newCart };
			}

			
			cart.status = defaultTypeStatus.inActive;
			// await cart.save()
			return {
				message: 'Get success my cart',
				success: true,
				data: cart
			};

		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public updateProductFromCart = async (idUser:string,objData:any): Promise<ReturnServices> => {
		try {
			const cart = await ClientCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
      console.log(`LHA:  ===> file: ClientCart.Services.ts ===> line 14 ===> cart`, cart)
			if (!cart) {
				const newCart = new ClientCart({
					FK_CreateUser: idUser,
					products: []
				});
				newCart.save();
				return { message: 'Update Product success my cart', success: true, data: {} };
			}
			const indexProduct=cart.products.findIndex((p)=>p._id+""===objData.idProduct)
			if(indexProduct===-1)  	return { message: 'Dont find product my cart', success: false};
			cart.products[indexProduct]=objData
			await cart.save()
			return { message: 'Update Product success my cart', success: true, data: cart };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
