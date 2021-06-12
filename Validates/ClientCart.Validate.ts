import joi from "@hapi/joi";

const validate = {
  addProductToCartid: joi.object().keys({
    name: joi.string().required(),
    weight: joi.string().required(),
    type: joi.string().required(),
    image: joi.array().items(joi.string())
	}),
	updateProductToCartid: joi.object().keys({
		idProduct:joi.string().required(),
		name: joi.string().required(),
    weight: joi.string().required(),
    type: joi.string().required(),
    image: joi.array().items(joi.string())
	}),
  deleteProductFromCart: joi.object().keys({
    idProduct: joi.string().required(),
  }),
};
export default validate;
