import { ITransportSub } from './TransportSub.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import model from "./TransportSub.Model"

const TransportSub = mongoose.model<ITransportSub>('TransportSub', createSchema(model));
export default TransportSub