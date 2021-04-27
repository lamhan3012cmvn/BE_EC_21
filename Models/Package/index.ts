import { IPackage } from './Package.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import PackageSchema from "./Package.Model"

const Package = mongoose.model<IPackage>('Package', createSchema(PackageSchema));
export default Package

