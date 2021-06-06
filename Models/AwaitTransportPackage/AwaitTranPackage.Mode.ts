import { defaultModel } from '../../common/constants';

export default {
	packages:defaultModel.array,
  status:defaultModel.string,
  FK_Transport:defaultModel.stringRef,
  FK_from:defaultModel.stringRef,
  FK_to:defaultModel.stringRef,
  // FK_Transport_SubCity:defaultModel.stringRef
};
