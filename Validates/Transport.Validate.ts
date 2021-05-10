import joi from '@hapi/joi';

const validate = {
	createTransport: joi.object().keys({
		name: joi.string().required(),
		description: joi.string().required(),
		avatar: joi.string().required(),
		imageVerify: joi.string().required(),
		phone: joi.string().min(10).max(15).required().regex(/^\d+$/),
		headquarters: joi.string().required()
	}),
	updateTransport: joi.object().keys({
		name: joi.string(),
		description: joi.string(),
		avatar: joi.string(),
		imageVerify: joi.string(),
		phone: joi.string().min(10).max(15).regex(/^\d+$/),
		headquarters: joi.string()
	}),
	deleteTransport: joi.object().keys({
		status: joi.string().required(),
	}),

	createTransportSub: joi.object().keys({
		name: joi.string().required(),
		city: joi.string().required(),
		address: joi.string().required(),
		phoneNumber: joi.string().min(10).max(15).required().regex(/^\d+$/),
		mail: joi.string().email().required(),
		FK_Transport: joi.string().required()
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