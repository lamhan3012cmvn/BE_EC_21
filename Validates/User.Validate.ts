import joi from "@hapi/joi";

const validate = {
  updateUser: joi.object().keys({
    fullName: joi.string(),
    phone: joi.string(),
    image: joi.string(),
    address: joi.string(),
  }),
  favorite: joi.object().keys({
    id: joi.string().required(),
  }),
  addAddress: joi.object().keys({
    fullAddress: joi.string().required(),
    lat: joi.string().required(),
    lng: joi.string().required(),
    phone: joi.string().required(),
  }),
  updateAddress: joi.object().keys({
    id: joi.string().required(),
    fullAddress: joi.string(),
    lat: joi.string(),
    lng: joi.string(),
    phone: joi.string(),
  }),
  deleteAddress: joi.object().keys({
    id: joi.string().required(),
  }),
  buyPoint: joi.object().keys({
    point: joi.string().required(),
    typePayment: joi.string().required(),
  }),
  
};
export default validate;
