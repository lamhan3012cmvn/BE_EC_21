import joi from "@hapi/joi";

const validate = {
  createCoupon: joi.object().keys({
    name: joi.string().required(),
    image: joi.string().required(),
    totalCode: joi.string().required(),
    discountByAmount: joi.string().required(),
    discountByPercent: joi.string().required(),
    discountAmount: joi.string().required(),
    discountPercent: joi.string().required(),
    expiredDate: joi.string().required(),
  }),
  updateCoupon: joi.object().keys({
    id: joi.string().required(),
    name: joi.string(),
    image: joi.string(),
    totalCode: joi.string(),
    discountByAmount: joi.string(),
    discountByPercent: joi.string(),
    discountAmount: joi.string(),
    discountPercent: joi.string(),
    expiredDate: joi.string(),
  }),
  deleteCoupon: joi.object().keys({}),
};
export default validate;
