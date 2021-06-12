// import { IProductCartMerchant } from '../Models/MerchantCart/MechantCart.Interface';
import { defaultModel, defaultTypeStatus } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import { GroupProduct, MerchantCart, Product, ProductInfo } from '../Models';

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
				return {
					message: 'Add Product success my cart',
					success: true,
					data: {}
				};
			}
			cart.products.push(objData);
			await cart.save();
			return {
				message: 'Add Product success my cart',
				success: true,
				data: {}
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public deleteProductFromCart = async (
		idUser: string,
		idProduct: string
	): Promise<ReturnServices> => {
		try {
			const cart = await MerchantCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				return {
					message: 'Dont find my cart is delete product',
					success: false,
					data: {}
				};
			}

			cart.products = cart.products.filter(p => p._id + '' !== idProduct);
			await cart.save();
			return {
				message: 'Delete product successs my cart',
				success: true,
				data: cart
			};
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

			const cartFindProduct = cart.toObject();
			cartFindProduct.products = await Promise.all(
				cartFindProduct.products.map(async (p: any) => {
					const groupProduct = await GroupProduct.findOne(
						{_id:p.idProduct,status:defaultTypeStatus.active},
						{ _id: 1, name: 1, FK_merchant: 1 }
					);
					if (!groupProduct) return { product: null, quantity: p.quantity };
					const product = await ProductInfo.findOne({FK_groupProduct:groupProduct._id,status:defaultTypeStatus.active}, {
						_id: 1,
						name: 1,
						price: 1,
						image: 1
					});
					return { product:product, quantity: p.quantity };
					// const product = await ProductInfo.findById(p.idProduct, { _id: 1, name: 1, price: 1, image: 1 })
					// return { product, quantity: p.quantity }
				})
			);
			return {
				message: 'Get success my cart',
				success: true,
				data: cartFindProduct
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
	public paymentCart = async (idUser: string): Promise<ReturnServices> => {
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

			const cartFindProduct = cart.toObject();
			cartFindProduct.products = await Promise.all(
				cartFindProduct.products.map(async (p: any) => {
					// return { product, quantity: p.quantity }
					const groupProduct = await GroupProduct.findById(
						{ _id: p.idPrdouct, status: defaultTypeStatus.active },
						{ _id: 1, name: 1, FK_merchant: 1 }
					);
					if (!groupProduct) return { product: null, quantity: p.quantity };
					const product = await ProductInfo.findById(groupProduct._id, {
						_id: 1,
						name: 1,
						price: 1,
						image: 1
					});
					return { product, quantity: p.quantity };
				})
			);

			cart.status = defaultTypeStatus.inActive;
			// await cart.save()
			return {
				message: 'Get success my cart',
				success: true,
				data: cartFindProduct
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	};
}
