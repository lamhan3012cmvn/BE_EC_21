import { defaultModel, defaultTypeStatus } from '../../common/constants';

export default {
  name:defaultModel.stringR,
  description:defaultModel.string,
  price:defaultModel.stringR,
  total:defaultModel.stringR,
  image:defaultModel.string,
  status: { ...defaultModel.string, default: defaultTypeStatus.active },
  FK_groupProduct: defaultModel.stringRef,
  FK_merchant: defaultModel.stringRef,
}
