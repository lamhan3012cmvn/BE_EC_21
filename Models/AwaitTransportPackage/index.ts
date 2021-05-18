import mongoose from 'mongoose';

import { IAwaitTransportPackageDocument } from './AwaitTranPackage.Interface';
import  createSchema  from '../Base.Model';
import Schema from './AwaitTranPackage.Mode';

const AwaitTranPackage = mongoose.model<IAwaitTransportPackageDocument>('AwaitTranPackage', createSchema(Schema));
export default AwaitTranPackage