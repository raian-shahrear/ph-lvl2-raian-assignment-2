import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import {
  orderUpdatedValidationSchema,
  orderValidationSchema,
} from './order.validation';

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    // validate data using Joi
    const { error, value } = orderValidationSchema.validate(order);
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.details[0].message,
      });
    }
    const result = await OrderServices.createOrderIntoDB(value);

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

    // validate data using Joi
    const { error, value } = orderUpdatedValidationSchema.validate({ email });
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.details[0].message,
      });
    }
    const result = await OrderServices.getAllOrderFromDB(value.email);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        errorMessage: result?.message,
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: email
        ? `Orders is fetched successfully for email: ${email}!`
        : 'Order is fetched successfully!',
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
  getAllOrder,
};
