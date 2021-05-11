import joi from "@hapi/joi";

const validate = {
  createDevice: joi.object().keys({
    fcmToken: joi.string().required(),
    deviceUUid: joi.string().required(),
    deviceModel: joi.string().required(),
    appVersion: joi.string().required(),
  }),

  deleteDevice: joi.object().keys({
    status: joi.string().required(),
  }),
};
export default validate;
