import { Schema, model } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  productId: {
    type: String,
    required: [true, 'Product Id is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

export const OrderModel = model<Order>('Order', orderSchema);
