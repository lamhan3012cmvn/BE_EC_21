import { IProductInfo } from './ProductInfo.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import ProductInfoSchema from "./ProductInfo.Model"

const ProductInfo= mongoose.model<IProductInfo>('ProductInfo',createSchema(ProductInfoSchema))
export default ProductInfo