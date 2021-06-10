import joi from '@hapi/joi';

const validate = {
	addProductToCartid: joi.object().keys({
		idProduct: joi.string().required(),
		quantity: joi.number().min(1).required()
	}),
  deleteProductFromCart: joi.object().keys({
		idProduct: joi.string().required(),
	})
};
export default validate;
