import { defaultModel } from '../../common/constants';

export default {
	name:defaultModel.stringR,
	description:defaultModel.string,
	image:defaultModel.stringR,
	imageVerify:defaultModel.stringR,
	typeSupport:{...defaultModel.string,default:''},
	phone:defaultModel.stringR,
	status:{...defaultModel.string,default:''},
	headquarters: defaultModel.stringR,
	bankAccount:defaultModel.stringR,
	FK_createUser:defaultModel.stringRef
};
