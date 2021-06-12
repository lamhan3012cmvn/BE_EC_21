import joi from "@hapi/joi";

const validate = {
  createMerchant: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    fullAddress: joi.string().required(),
    lat: joi.string().required(),
    lng: joi.string().required(),
    productType: joi.string().required(),
    phone: joi.string().required(),
  }),
  updateMerchant: joi.object().keys({
    name: joi.string(),
    description: joi.string(),
    image: joi.string(),
    fullAddress: joi.string(),
    lat: joi.string(),
    lng: joi.string(),
    productType: joi.string(),
    phone: joi.string(),
    id: joi.string().required(),
  }),
};
export default validate;
