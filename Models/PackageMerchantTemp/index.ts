import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import PackageSchema from "./PackageMerchantTemp.Model"

const PackageMerchantTemp = mongoose.model('PackageMerchantTemp', createSchema(PackageSchema));
export default PackageMerchantTemp
