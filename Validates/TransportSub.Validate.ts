import joi from '@hapi/joi';

const validate = {
	createTransportSub: joi.object().keys({
		city: joi.string().required(),
		address: joi.string().required(),
		phoneNumber: joi.string().min(10).max(15).required().regex(/^\d+$/),
		mail: joi.string().email().required(),
	}),
	updateTransportSub: joi.object().keys({
		name: joi.string(),
		city: joi.string(),
		address: joi.string(),
		phoneNumber: joi.string().min(10).max(15).regex(/^\d+$/),
		mail: joi.string().email(),
		FK_Transport: joi.string()
	}),
	deleteTransportSub: joi.object().keys({
		status: joi.string().required()
	}),
	changeStatusTransportSub:joi.object().keys({
		idSub:joi.string().regex(/^[A-Fa-f0-9]{24}$/),
		status:joi.boolean()
	})
};
export default validate;
