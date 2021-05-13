import { defaultModel } from '../../common/constants';

export default {
	name:defaultModel.stringR,
	district:defaultModel.stringR,
  ward: defaultModel.string,
  coordinates:defaultModel.string,
  phoneNumber:defaultModel.string,
  mail:defaultModel.string,
  status:{...defaultModel.string,default:'INACTIVE'},
  
  FK_Transport_Sub:defaultModel.stringRef,
  FK_Staff:defaultModel.array,
  FK_AwaitPackage:defaultModel.array,
  FK_CreateUser:defaultModel.string
};
