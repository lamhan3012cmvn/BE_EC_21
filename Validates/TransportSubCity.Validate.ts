import joi from '@hapi/joi';

const validate = {
	createTransportSubCity: joi.object().keys({
		name: joi.string().required(),
		district: joi.string().required(),
		ward: joi.string().required(),
		coordinates: joi.string().min(10).max(15).required().regex(/^\d+$/),
		phoneNumber: joi.string().email().required(),
		mail: joi.string().required()
	}),
	updateTransportSubCity: joi.object().keys({
		name: joi.string().required(),
		district: joi.string().required(),
		ward: joi.string().required(),
		coordinates: joi.string().min(10).max(15).required().regex(/^\d+$/),
		phoneNumber: joi.string().email().required(),
		mail: joi.string().required(),
		FK_Staff:joi.array(),
		FK_AwaitPackage:joi.array()
	}),
	deleteTransportSubCity: joi.object().keys({
		status: joi.string().required()
	}),
};
export default validate;
