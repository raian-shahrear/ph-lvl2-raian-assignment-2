import { Product } from './product.interface';
import { ProductModel } from './product.model';

// create product
const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all product
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
};
