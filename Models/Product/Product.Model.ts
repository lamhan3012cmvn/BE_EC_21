import { defaultModel, defaultTypeStatus } from "../../common/constants";

export default {
  status: { ...defaultModel.string, default: defaultTypeStatus.active },
  FK_groupProduct: defaultModel.stringRef,
  FK_merchant: defaultModel.stringRef,
  FK_currentInfo: defaultModel.stringRef,
};
