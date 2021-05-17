import joi from '@hapi/joi';

const validate = {
	createPackage: joi.object().keys({
		title: joi.string().required(),
		description: joi.string().min(0).max(100).required(),
		FK_ProductId: joi.string().empty().required(),
		FK_ProductType: joi.string().empty().required(),

		recipientName: joi.string().empty().required(),
		recipientPhone: joi
			.string()
			.required()
			.regex(/^0\d{9,14}$/),
		recipientCity: joi.string().empty().required(),
		recipientCounty: joi.string().empty().required(),
		recipientWard: joi.string().empty().required(),
		recipientAddress: joi.string().empty().required(),
		recipientCoordinateLat: joi.string().empty().required(),
		recipientCoordinateLng: joi.string().empty().required(),

		senderName: joi.string().empty().required(),
		senderPhone: joi
			.string()
			.required()
			.regex(/^0\d{9,14}$/),
		senderCity: joi.string().empty().required(),
		senderCounty: joi.string().empty().required(),
		senderWard: joi.string().empty().required(),
		senderAddress: joi.string().empty().required(),
		senderCoordinateLat: joi.string().empty().required(),
		senderCoordinateLng: joi.string().empty().required()
	})
};

export default validate;
