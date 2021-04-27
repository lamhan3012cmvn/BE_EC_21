import { defaultModel } from './../common/constants';

export default {
  email: defaultModel.stringUnique,
	fullName: defaultModel.string,
	phone: { ...defaultModel.stringUnique },
	password: defaultModel.string,
	isVerify: defaultModel.booleanFalse,
	role: { ...defaultModel.string, default: 'USER' },
  image:defaultModel.string,
};
