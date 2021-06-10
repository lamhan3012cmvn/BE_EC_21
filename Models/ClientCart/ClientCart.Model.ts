import { defaultModel ,defaultTypeStatus} from '../../common/constants';

export default {
	products: {
		type:[{
			name:defaultModel.stringR,
			weight:defaultModel.stringR,
			type:defaultModel.stringR,
			image:defaultModel.array
		}],
		default:[]
	},
	status: {...defaultModel.string,default:defaultTypeStatus.active},
	FK_CreateUser: defaultModel.stringRef
};
