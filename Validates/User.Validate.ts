import joi from "@hapi/joi";

const validate = {
  updateUser: joi.object().keys({
	fullName: joi.string(),
	phone: joi.string(),
	password: joi.string(),
	image: joi.string(),
	address: joi.string(),
  }),
};
export default validate;
