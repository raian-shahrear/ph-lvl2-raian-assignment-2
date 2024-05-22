import { Request, Response } from 'express';
import { OrderServices } from './order.service';

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
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

export const OrderControllers = {
  createOrder,
};
