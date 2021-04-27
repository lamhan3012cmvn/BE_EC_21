import { defaultModel } from './../common/constants';

export default {
  title:defaultModel.stringR,
	description:defaultModel.stringR,
  recipientName:defaultModel.stringR,
  senderName:defaultModel.stringR,
  recipientPhone:defaultModel.stringR,
  senderPhone:defaultModel.stringR,
  to:{
    city:defaultModel.stringR,
    county:defaultModel.stringR,
    ward: defaultModel.stringR,
    address:defaultModel.stringR,
    coordinate:defaultModel.stringR
  },
  from:{
    city:defaultModel.stringR,
    county:defaultModel.stringR,
    ward: defaultModel.stringR,
    address:defaultModel.stringR,
    coordinate:defaultModel.stringR
  }
};
