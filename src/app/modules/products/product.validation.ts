import Joi from 'joi';

const variantValidationSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

const productValidationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required()).required(),
  variants: Joi.array().items(variantValidationSchema).required(),
  inventory: inventoryValidationSchema.required(),
});

// Create a schema for updating a product where all fields are optional
const productUpdateValidationSchema = productValidationSchema.fork(
  ['name', 'description', 'price', 'category', 'tags', 'variants', 'inventory'],
  (schema) => schema.optional(),
);

export { productValidationSchema, productUpdateValidationSchema };
