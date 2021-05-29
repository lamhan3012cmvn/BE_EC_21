import joi from '@hapi/joi';

const validate = {
	createTransportSub: joi.object().keys({
		locationCity: joi.string().required(),
		locationCoordinateLat:joi.string().required(),
		locationCoordinateLng:joi.string().required(),
		locationCounty:joi.string().required(),
		locationWard:joi.string().required(),
		locationAddress:joi.string().required(),
		phoneNumber:joi.string().min(10).max(15).regex(/^\d+$/)
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

	