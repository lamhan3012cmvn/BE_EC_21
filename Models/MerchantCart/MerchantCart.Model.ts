import { defaultModel } from '../../common/constants';

export default {
	products: {
		type:[{
			idProduct: defaultModel.stringRef,
			quantity: defaultModel.number,
		}],
		default:[]

	},
	status: defaultModel.string,
	FK_CreateUser: defaultModel.stringRef
};
