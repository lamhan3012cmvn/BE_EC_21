import { defaultModel } from './../../common/constants';

export default {
	name:defaultModel.string,
  city:defaultModel.string,
  address:defaultModel.string,
  phoneNumber:defaultModel.string,
  mail:defaultModel.string,
  status:{...defaultModel.string,default:'INACTIVE'},
  FK_Transport:defaultModel.stringRef,
  FK_CreateUser:{...defaultModel.stringRef,required: false,default:''}
};
