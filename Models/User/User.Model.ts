import { defaultModel,defaultRoleAccount, defaultTypeLogin } from './../../common/constants';

export default {
	email: defaultModel.stringUnique,
	fullName: defaultModel.string,
	phone: defaultModel.stringR,
	password: defaultModel.string,
	isVerify: defaultModel.booleanFalse,
	typeLogin: { ...defaultModel.string, default: defaultTypeLogin.EMAIL },
	role: { ...defaultModel.string, default: defaultRoleAccount.USER },
	otp: defaultModel.string,
	image: defaultModel.string,
	address: defaultModel.object,
};
