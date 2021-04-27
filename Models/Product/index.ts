import { IProduct } from './Product.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import ProductSchema from "./Product.Model"

const Product = mongoose.model<IProduct>('Product', createSchema(ProductSchema));
export default Product

