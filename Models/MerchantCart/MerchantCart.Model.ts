import { defaultModel, defaultTypeStatus } from '../../common/constants';

export default {
	products: {
		type:[{
			idProduct: defaultModel.stringRef,
			quantity: defaultModel.number,
		}],
		default:[]

	},
	status: {...defaultModel.string,default:defaultTypeStatus.active},
	FK_CreateUser: defaultModel.stringRef
};
