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
		payment: joi.object().keys({
			paymentMethod: joi.array().items({
				title: joi.string().required(),
				token: joi.string().required(),
				status: joi.string().required()
			}),
			defaultGateway: joi.string().regex(/^[A-Fa-f0-9]{24}$/)
		}),
		status: joi.string(),
		typeSupport: joi.array().items({
			id:joi.string().required().regex(/^[A-Fa-f0-9]{24}$/),
			price: joi.object().keys({
					km: joi.string(),
					kg: joi.string()
			}),
			available: joi.string()
		}).min(0).max(3),
	
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
	assignStaff:joi.object().keys({
		idUser:joi.string().regex(/^[A-Fa-f0-9]{24}$/),
		idSub:joi.string().regex(/^[A-Fa-f0-9]{24}$/)
	})

};
export default validate;
