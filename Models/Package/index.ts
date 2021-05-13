import { IPackageDocument } from './Package.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import PackageSchema from "./Package.Model"

const Package = mongoose.model<IPackageDocument>('Package', createSchema(PackageSchema));
export default Package

