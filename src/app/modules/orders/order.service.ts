import { ProductModel } from '../products/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

// create order
const createOrderIntoDB = async (order: Order) => {
  // before creating order matching it's productId with the _id of product collection
  const matchedProduct = await ProductModel.findById(order.productId);
  // matching id
  if (!matchedProduct) {
    return {
      success: false,
      message: 'The given ProductId does not exist!',
    };
  }
  // checking product is inStock or not
  else if (
    matchedProduct.inventory.quantity === 0 &&
    !matchedProduct.inventory.inStock
  ) {
    return {
      success: false,
      message: 'Out of stock!',
    };
  }
  // checking ordered quantity is zero or not
  // ordered quantity is exceeded available quantity or not
  else if (
    order.quantity == 0 ||
    Number(order.quantity) > Number(matchedProduct.inventory.quantity)
  ) {
    return {
      success: false,
      message:
        order.quantity == 0
          ? "Ordered quantity can't be zero!"
          : `Insufficient quantity available in inventory where current quantity is ${matchedProduct.inventory.quantity}!`,
    };
  } else {
    // create a order
    const result = await OrderModel.create(order);

    // update product's quantity while order placed
    const updatedProductQuantity = await ProductModel.findByIdAndUpdate(
      { _id: order.productId },
      { $inc: { 'inventory.quantity': -order.quantity } },
      { new: true },
    );
    // update product's inStock status when product's quantity reached to zero
    if (
      updatedProductQuantity &&
      updatedProductQuantity?.inventory?.quantity == 0
    ) {
      await ProductModel.updateOne(
        { _id: order.productId },
        { $set: { 'inventory.inStock': false } },
        { new: true },
      );
    }

    return {
      success: true,
      data: result,
    };
  }
};

// get all order
const getAllOrderFromDB = async (email: string) => {
  // get all data
  if (!email) {
    const result = await OrderModel.find();
    return {
      success: true,
      data: result,
    };
  }
  // get searched data
  const searchQuery = { email: email };
  const result = await OrderModel.find(searchQuery);

  if (result.length === 0) {
    return {
      success: false,
      message: 'Order is not found!',
    };
  } else {
    return {
      success: true,
      data: result,
    };
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
