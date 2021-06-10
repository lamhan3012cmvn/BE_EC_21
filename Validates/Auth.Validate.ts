import joi from '@hapi/joi';

const validate = {
	login: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().min(6).max(24).required()
	}),
	register: joi.object().keys({
		//username, password, phone, fullName
		email: joi.string().email().required(),
		password: joi.string().min(6).max(24).required(),
		phone: joi.string().required(),
		fullName: joi.string().required()
	}),
	registerStaff: joi.object().keys({
		//username, password, phone, fullName
		email: joi.string().email().required(),
		password: joi.string().min(6).max(24).required(),
		phone: joi.string().required(),
		fullName: joi.string().required(),
		image:joi.string().required()
	}),
	verifyOtp:joi.object().keys({
		email: joi.string().email().required(),
		otp:joi.string().min(6).max(6).required()
	}),
	changePassword:joi.object().keys({
		oldPassword:joi.string().min(6).max(24).required(),
		newPassword:joi.string().min(6).max(24).required()
	})
};
export default validate;
