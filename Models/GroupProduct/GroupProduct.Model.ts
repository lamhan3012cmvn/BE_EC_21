import { defaultModel, defaultTypeStatus } from '../../common/constants';

export default {
	name:defaultModel.stringR,
  FK_merchant: defaultModel.stringR,
  status:{...defaultModel.string,default: defaultTypeStatus.active},
};
