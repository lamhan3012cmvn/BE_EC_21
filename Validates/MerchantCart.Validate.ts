import joi from '@hapi/joi';

const validate = {
	addProductToCartid: joi.object().keys({
		idProduct: joi.string().required(),
		quantity: joi.number().min(1).required()
	}),
  deleteProductFromCart: joi.object().keys({
		idProduct: joi.string().required(),
	}),
	paymentMerchantCart:joi.object().keys({
    title: joi.string().required(),
		description: joi.string().min(0).max(100).required(),

		senderName: joi.string().empty().required(),
		senderPhone: joi
			.string()
			.required()
			.regex(/^0\d{9,14}$/),
		senderFullAddress: joi.string().empty().required(),
		senderCoordinateLat: joi.string().empty().required(),
		senderCoordinateLng: joi.string().empty().required(),

		estimatedDate: joi.string().empty().required(),
		FK_Transport: joi.string().empty().required(),
		distance: joi.string().empty().required(),
		prices: joi.string().empty().required(),
		weight: joi.string().empty().required(),
		FK_Address:joi.string().empty().required(),
  })
};
export default validate;
