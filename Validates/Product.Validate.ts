import joi from "@hapi/joi";

const validate = {
  createProduct: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.string().required(),
    total: joi.number().required(),
    image: joi.string().required(),
    FK_groupProduct: joi.string().required(),
    FK_merchant: joi.string().required(),
  }),
  updateProduct: joi.object().keys({
    idProduct: joi.string().required(),
    name: joi.string(),
    description: joi.string(),
    price: joi.string(),
    total: joi.number(),
    image: joi.string(),
    FK_groupProduct: joi.string().required(),
    FK_merchant: joi.string().required(),
  }),
  deleteProduct: joi.object().keys({}),
};
export default validate;
