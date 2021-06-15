import { defaultModel } from '../../common/constants';

export default {
	packages:defaultModel.array,
  status:defaultModel.string,
  
  isDone:defaultModel.booleanFalse,
  FK_Transport:defaultModel.stringRef,
  FK_from:defaultModel.stringRef,
  FK_to:defaultModel.stringRef,
};
