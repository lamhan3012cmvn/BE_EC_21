import joi from '@hapi/joi';

const coordinate = joi.object().keys({
	city: joi.string().empty().required(),
	county: joi.string().empty().required(),
	ward: joi.string().empty().required(),
	address: joi.string().empty().required(),
	coordinate: joi.string().empty().required()
});

const validate = {
	createPackage: joi.object().keys({
		title: joi.string().email().required(),
		description: joi.string().min(0).max(100).required(),
		recipientName: joi.string(),
		senderName: joi.string(),
		recipientPhone: joi.string(),
		senderPhone: joi.string(),
		to: coordinate,
		from: coordinate
	})
};
export default validate;
