import joi from "@hapi/joi";

const validate = {
  updateMerchant: joi.object().keys({
      idMerchant: joi.string().required(),
  }),
};
export default validate;
