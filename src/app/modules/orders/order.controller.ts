import { Request, Response } from 'express';
import { OrderServices } from './order.service';

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await OrderServices.createOrderIntoDB(order);

    if (!result?.success) {
      return res.status(500).json({
        success: false,
        errorMessage: result?.message,
      });
    }
    // send response
    res.status(200).json({
      success: true,
      message: 'Order is created successfully!',
      data: result?.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

// get all order
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const result = await OrderServices.getAllOrderFromDB(email as string);

    // send response
    res.status(200).json({
      success: true,
      message: email
        ? `Orders is fetched successfully for email: ${email}!`
        : 'Order is fetched successfully!',
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

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
