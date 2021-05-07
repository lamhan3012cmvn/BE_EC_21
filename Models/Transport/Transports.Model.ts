import { defaultModel } from './../../common/constants';

export default {
	name:defaultModel.stringR,
	description:defaultModel.string,
	avatar:defaultModel.stringR,
	imageVerify:defaultModel.stringR,
	typeSupport:[{
		title:defaultModel.stringR,
		price:{
			km:defaultModel.stringR,
			kg:defaultModel.stringR
		},
		available:defaultModel.stringR
	}],
	phone:defaultModel.stringR,
	status:{...defaultModel.string,default:'INACTIVE'},
	headquarters: defaultModel.stringR,
	payment:{
		paymentMethod:[{
			title: defaultModel.stringR,
			token: defaultModel.stringR,
			status:{...defaultModel.string,default:'ACTIVE'}
		}],
		defaultGateway:
		{
			type:{
				title: defaultModel.stringR,
				token: defaultModel.stringR,
				status:{...defaultModel.string,default:'ACTIVE'}
			}
		}
	},
	FK_createUser:defaultModel.stringRef
};
