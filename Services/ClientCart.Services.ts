import { defaultTypeStatus } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import { ClientCart } from '../Models';

export default class ClientCartServices {
	constructor() {}

	public addProductToCart = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public deleteProductFromCart = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
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
	public paymentCart = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public updateProductFromCart = async (): Promise<ReturnServices> => {
		try {
			return { message: 'An error occurred', success: false };
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
