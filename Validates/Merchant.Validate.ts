import joi from "@hapi/joi";

const validate = {
  createMerchant: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    address: joi.string().required(),
    FK_category: joi.string().required(),
    phone: joi.string().required(),
  }),
};
export default validate;
