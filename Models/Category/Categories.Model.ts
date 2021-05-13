import { defaultModel, defaultTypeStatus } from '../../common/constants';

export default {
	name:defaultModel.stringR,
  image:defaultModel.string,
  status:{...defaultModel.string,default:defaultTypeStatus.active}
};
