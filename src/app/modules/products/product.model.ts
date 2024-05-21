import { Schema, model } from 'mongoose';
import { Inventory, Product, Variant } from './product.interface';


const variantSchema = new Schema<Variant>({
    type: {
        type: String,
        required: [true, "Product variant type is required"]
    },
    value: {
        type: String,
        required: [true, "Product variant value is required"]
    }
})

const inventorySchema = new Schema<Inventory>({
    quantity: {
        type: Number,
        trim: true,
        required: [true, "Product quantity is required"]
    },
    inStock: {
        type: Boolean,
        required: [true, "Product stock status is required"]
    }
})


const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: [true, "Product name is required"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Product price is required"]
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Product category is required"]
    },
    tags: {
        type: [String],
        required: [true, "Product tag is required"]
    },
    variants: {
        type: [variantSchema],
        required: [true, "Product variant is required"]
    },
    inventory: {
        type: inventorySchema,
        required: [true, "Product inventory is required"]
    }
})


export const ProductModel = model<Product>('Product', productSchema);