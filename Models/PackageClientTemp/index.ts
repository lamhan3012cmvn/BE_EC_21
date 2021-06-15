import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import PackageSchema from "./PackageClientTemp.Model"

const PackageClientTemp = mongoose.model('PackageClientTemp', createSchema(PackageSchema));
export default PackageClientTemp
