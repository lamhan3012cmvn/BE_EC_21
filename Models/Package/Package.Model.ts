import { defaultModel, defaultStatusPackage } from './../../common/constants';

export default {
  title:defaultModel.stringR,
	description:defaultModel.stringR,
  

  FK_Product:[defaultModel.object],
  FK_ProductType:defaultModel.stringR,

  codeBill:defaultModel.stringR,

  estimatedDate:defaultModel.stringR,

  FK_Transport:defaultModel.stringRef,
  FK_SubTransport:defaultModel.stringRef,
  FK_SubTransportAwait:defaultModel.stringRef,

  status:{...defaultModel.string,default:defaultStatusPackage.waitForConfirmation},

  isAwait:defaultModel.booleanFalse,

  prices:defaultModel.string,
  weight:defaultModel.string,

  FK_Recipient:defaultModel.stringRef,
  isMerchantSend:defaultModel.boolean,

  recipient:{
    name:defaultModel.stringR,
    phone:defaultModel.stringR,
    location:{
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
      address:defaultModel.stringR,
      coordinate:{
        lat: defaultModel.stringR,
        lng: defaultModel.stringR 
      }
    }
  }
};
