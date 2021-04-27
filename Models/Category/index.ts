import mongoose from 'mongoose';

import { ICategories } from './Categories.Interface';
import  createSchema from '../Base.Model';
import CategoriesSchema from './Categories.Model'

const Categories = mongoose.model<ICategories>('Categories', createSchema(CategoriesSchema));
export default Categories