import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import {
  productUpdateValidationSchema,
  productValidationSchema,
} from './product.validation';

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // validate data using Joi
    const { error, value } = productValidationSchema.validate(productData);
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.details[0].message,
      });
    }
    const result = await ProductServices.createProductIntoDB(value);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductServices.getAllProductsFromDB(
      searchTerm as string,
    );

    // send response
    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products are fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// get single product by id
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product is fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// update a product by id
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productDoc = req.body;

    // validate data using Joi
    const { error, value } = productUpdateValidationSchema.validate(productDoc);
    if (error) {
      res.status(500).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }
    const result = await ProductServices.updateProductIntoDB(productId, value);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product is updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// delete a product by id
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);

    // send response
    res.status(200).json({
      success: true,
      message: 'Product is deleted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
