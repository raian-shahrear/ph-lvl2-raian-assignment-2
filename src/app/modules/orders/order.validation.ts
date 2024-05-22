import Joi from 'joi';

const orderValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const orderUpdatedValidationSchema = orderValidationSchema.fork(
  ['email', 'productId', 'price', 'quantity'],
  (schema) => schema.optional(),
);

export { orderValidationSchema, orderUpdatedValidationSchema };
