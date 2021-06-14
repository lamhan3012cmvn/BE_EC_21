import joi from "@hapi/joi";

const validate = {
  addProductToCartid: joi.object().keys({
    name: joi.string().required(),
    weight: joi.string().required(),
    type: joi.string().required(),
    image: joi.string().required(),
  }),
  updateProductToCartid: joi.object().keys({
    idProduct: joi.string().required(),
    name: joi.string().required(),
    weight: joi.string().required(),
    type: joi.string().required(),
    image: joi.string().required(),
  }),
  deleteProductFromCart: joi.object().keys({
    idProduct: joi.string().required(),
  }),
  paymentPointClientCart: joi.object().keys({
    title: joi.string().required(),
    description: joi.string().min(0).max(100).required(),

    recipientAddress: joi.string().empty().required(),
    recipientLat: joi.string().empty().required(),
    recipientLng: joi.string().empty().required(),
    recipientPhone: joi
      .string()
      .required()
      .regex(/^0\d{9,14}$/),

    recipientName: joi.string().empty().required(),
    senderPhone: joi
      .string()
      .required()
      .regex(/^0\d{9,14}$/),
    senderAddress: joi.string().empty().required(),
    senderLat: joi.string().empty().required(),
    senderLng: joi.string().empty().required(),

    estimatedDate: joi.string().empty().required(),
    FK_Transport: joi.string().empty().required(),
    FK_SubTransport: joi.string().empty().required(),
    FK_SubTransportAwait: joi.string().empty().required(),
    distance: joi.string().empty().required(),
    prices: joi.string().empty().required(),
    weight: joi.string().empty().required(),
	typePayment: joi.string().empty().required(),
  }),
};
export default validate;
