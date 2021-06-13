import { defaultModel } from './../../common/constants';

export default {
	name:defaultModel.string,
  location:{
    address:defaultModel.stringR,
    coordinate:{
      lat: defaultModel.stringR,
      lng: defaultModel.stringR 
    }
  },
  phoneNumber:defaultModel.string,
  mail:defaultModel.string,
  status:{...defaultModel.string,default:'INACTIVE'},
  FK_Transport:defaultModel.stringRef,
  FK_CreateUser:{...defaultModel.stringRef,required: false,default:''}
};
