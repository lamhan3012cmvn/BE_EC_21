import { defaultModel, defaultTypeStatus } from "../../common/constants";

export default {
  name: defaultModel.stringR,
  description: defaultModel.string,
  image: defaultModel.string,
  address: {...defaultModel.object, required: true },
  status: { ...defaultModel.string, default: defaultTypeStatus.inActive },
  FK_category: defaultModel.stringRef,
  FK_createUser: defaultModel.stringRef,
};
