import { defaultModel, defaultTypeStatus } from '../../common/constants';

export default {
	name:defaultModel.stringR,
   description:defaultModel.string,
   image:defaultModel.string,
   address:defaultModel.stringR,
   FK_category:defaultModel.stringRef,
   phone:defaultModel.stringPhone,
   status:{...defaultModel.string,default: defaultTypeStatus.inActive}
};
