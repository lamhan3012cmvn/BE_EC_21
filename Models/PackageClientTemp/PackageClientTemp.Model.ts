import { defaultModel, defaultStatusPackage, defaultTypeStatus } from "../../common/constants";

export default {
  title: defaultModel.stringR,
  description: defaultModel.stringR,
  estimatedDate: defaultModel.stringR,

  FK_Transport: defaultModel.stringR,
  FK_SubTransport: defaultModel.stringR,
  FK_SubTransportAwait: defaultModel.stringR,

  recipientName: defaultModel.stringR,
  recipientAddress: defaultModel.stringR,
  recipientLat: defaultModel.stringR,
  recipientLng: defaultModel.stringR,
  recipientPhone: defaultModel.stringR,
  prices: defaultModel.stringR,
  distance: defaultModel.stringR,
  weight: defaultModel.stringR,

  senderPhone: defaultModel.stringR,
  senderAddress: defaultModel.stringR,
  senderLat: defaultModel.stringR,
  senderLng: defaultModel.stringR,
  status: {...defaultModel.string, default: defaultTypeStatus.active},
};
