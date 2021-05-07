import joi from '@hapi/joi';

const validate = {
	create: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().min(6).max(24).required()
	}),
	
};
export default validate;
