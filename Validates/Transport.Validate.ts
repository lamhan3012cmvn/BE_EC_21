import joi from '@hapi/joi';

const validate = {
	createTransport: joi.object().keys({
		name: joi.string().required(),
		description: joi.string().required(),
		avatar: joi.string().required(),
		imageVerify: joi.string().required(),
		phone: joi.string().min(10).max(15).required().regex(/^\d+$/),
		headquarters: joi.string().required()
	})
};
export default validate;
