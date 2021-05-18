import { defaultModel } from './../../common/constants';

export default {
  title:defaultModel.stringR,
	description:defaultModel.stringR,
  

  FK_ProductId:defaultModel.stringRef,
  FK_ProductType:defaultModel.stringR,

  codeBill:defaultModel.stringR,

  estimatedDate:defaultModel.stringR,

  FK_Transport:defaultModel.stringRef,

  status:{...defaultModel.string,default:'INACTIVE'},

  prices:defaultModel.string,
  weight:defaultModel.string,

  recipient:{
    name:defaultModel.stringR,
    phone:defaultModel.stringR,
    location:{
      city:defaultModel.stringR,
      county:defaultModel.stringR,
      ward: defaultModel.stringR,
      address:defaultModel.stringR,
      coordinate:{
        lat: defaultModel.stringR,
        lng: defaultModel.stringR 
      }
    }
  },
  sender:{
    name:defaultModel.stringR,
    phone:defaultModel.stringR,
    location:{
      city:defaultModel.stringR,
      county:defaultModel.stringR,
      ward: defaultModel.stringR,
      address:defaultModel.stringR,
      coordinate:{
        lat: defaultModel.stringR,
        lng: defaultModel.stringR 
      }
    }
  }
};
