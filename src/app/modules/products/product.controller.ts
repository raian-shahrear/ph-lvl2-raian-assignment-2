import { Request, Response } from "express";
import { ProductServices } from "./product.service";


// create product
const createProduct = async(req:Request, res:Response) => {
    try{
        const {product: productData} = req.body;
        const result = await ProductServices.createProductIntoDB(productData);

        // send response
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error
        });
    }
};





export const ProductController = {
    createProduct,
    
}