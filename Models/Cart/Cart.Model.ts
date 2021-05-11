import { defaultModel } from './../../common/constants';

export default {
	products: {
		current: [{...defaultModel.string}],
		quantity: defaultModel.number,
		status: defaultModel.string
	},
	FK_CreateUser: { ...defaultModel.stringR, match: /^[a-fA-F0-9]{24}$/ }
};
