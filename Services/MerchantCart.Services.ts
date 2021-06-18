// import { IProductCartMerchant } from '../Models/MerchantCart/MechantCart.Interface';
import { defaultModel, defaultTypeStatus } from '../common/constants';
import { ReturnServices } from '../Interfaces/Services';
import { GroupProduct, Merchant, MerchantCart, Product, ProductInfo } from '../Models';

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
			const findIndex=cart.products.findIndex((product=>product.idProduct+''===objData.idProduct))
			if(findIndex===-1)
			{
				cart.products.push(objData);
			}else{
				cart.products[findIndex].quantity=cart.products[findIndex].quantity+objData.quantity
			}
			
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
	public updateProductToCart = async (
		idUser: string,
		objData: any
	): Promise<ReturnServices> => {
		try {
			const cart = await MerchantCart.findOne({
				status: defaultTypeStatus.active,
				FK_CreateUser: idUser
			});
			if (!cart) {
				return {
					message: 'Dont find my cart',
					success: false,
				};
			}
			const newArr = JSON.parse(JSON.stringify(cart.products));
			const filterProduct = [];
			for (let i = 0; i < newArr.length; i++) {
				const currentProduct = await Product.findOne({
					_id: newArr[i].idProduct, status: defaultTypeStatus.active 
				});
				if (currentProduct) {
					const product = await ProductInfo.findOne({
						_id: currentProduct.FK_currentInfo,
						status: defaultTypeStatus.active
					});
					if (product) {
						if (product._id + '' === objData.idProduct) {
							newArr[i].quantity=objData.quantity
							
						}
					}
				}
				filterProduct.push(newArr[i]);
			}
			cart.products = filterProduct;
			await cart.save();
			return {
				message: 'Update Product success my cart',
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

			const newArr = JSON.parse(JSON.stringify(cart.products));
			const filterProduct = [];
			for (let i = 0; i < newArr.length; i++) {
				const currentProduct = await Product.findOne({
					_id: newArr[i].idProduct,
					status: defaultTypeStatus.active
				});
				if (currentProduct) {
						
					const product = await ProductInfo.findOne({
						_id: currentProduct.FK_currentInfo,
						status: defaultTypeStatus.active
					});
					if (product) {
						if (product._id + '' !== idProduct) {
							filterProduct.push(newArr[i]);
						}
					}
				}
			}
			cart.products = filterProduct;
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
					const currentProduct = await Product.findOne(
						{ _id: p.idProduct, status: defaultTypeStatus.active },
						{ _id: 1, FK_currentInfo: 1, FK_merchant: 1 }
					);
					if (!currentProduct) return { product: null, quantity: p.quantity };
					const product = await ProductInfo.findOne(
						{
							_id: currentProduct.FK_currentInfo,
							status: defaultTypeStatus.active
						},
						{
							_id: 1,
							name: 1,
							price: 1,
							image: 1
						}
					);
					const merchant=await Merchant.findById(currentProduct.FK_merchant)
					
					return {
						product: product,
						quantity: p.quantity,
						FK_merchant: currentProduct.FK_merchant,
						name: merchant?merchant.name:""
					};
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
					const currentProduct = await Product.findOne(
						{ _id: p.idProduct, status: defaultTypeStatus.active },
						{ _id: 1, FK_currentInfo: 1, FK_merchant: 1 }
					);
					if (!currentProduct) return { product: null, quantity: p.quantity };
					const product = await ProductInfo.findOne(
						{
							_id: currentProduct.FK_currentInfo,
							status: defaultTypeStatus.active
						},
						{
							_id: 1,
							name: 1,
							price: 1,
							image: 1
						}
					);
					return {
						product: product,
						quantity: p.quantity,
						FK_Merchant: currentProduct.FK_merchant
					};
				})
			);
			cartFindProduct.products = cartFindProduct.products.reduce(
				(t: any, v: any) => {
					console.log(t);
					const findFK = t.findIndex((product: any) => {
						return product.FK_Merchant === v.FK_Merchant;
					});
					if (findFK === -1) {
						if (!v.product) return t;
						const obj = {
							FK_Merchant: v.FK_Merchant,
							products: [Object.assign(v.product, { quantity: v.quantity })]
						};
						t.push(obj);
						return t;
					}
					t[findFK].products.push(
						Object.assign(v.product, { quantity: v.quantity })
					);
					return t;
				},
				[]
			);
			cart.status = defaultTypeStatus.inActive;
			await cart.save()
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
 