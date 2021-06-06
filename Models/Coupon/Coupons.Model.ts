import { defaultModel } from '../../common/constants';
import { defaultTypeStatus } from '../../common/constants';

export default {
  name:defaultModel.string,
  image:defaultModel.string,
  totalCode:defaultModel.number,
  discountByAmount:defaultModel.boolean,
  discountByPercent:defaultModel.boolean,
  discountAmount:defaultModel.string,
  discountPercent:defaultModel.string,
  status:{...defaultModel.string, default: defaultTypeStatus.active},
  expiredDate:defaultModel.string
};
