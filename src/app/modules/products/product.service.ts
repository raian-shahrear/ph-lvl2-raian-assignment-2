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

// get single product by id
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

// update a product by id
const updateProductIntoDB = async (id: string, productDoc: any) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: id },
    { $set: productDoc },
  );
  return result;
};

// delete a product by id
const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result.deletedCount && null;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
