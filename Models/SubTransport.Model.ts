import { defaultModel } from './../common/constants';

export default {
	name:defaultModel.stringR,
  city:defaultModel.stringR,
  // district:defaultModel.stringR,
  // ward: defaultModel.stringR,
  address:defaultModel.stringR,
  phoneNumber:defaultModel.stringR,
  mail:defaultModel.stringR,
  //Nhan Vien,
  FK_Transport:defaultModel.stringRef,
  //?
  FK_TransportCity:defaultModel.array
};
