import joi from "@hapi/joi";

const validate = {
  createCategory: joi.object().keys({
    name: joi.string().required(),
    image: joi.string().required(),
  }),
  updateCategory: joi.object().keys({
      _id: joi.string().required(),
      name: joi.string(),
      image: joi.string(),
  }),
  deleteCategory: joi.object().keys({
  }),
};
export default validate;
