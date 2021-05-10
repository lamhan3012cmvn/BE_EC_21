import {  ITransportSubDocument } from './TransportSub.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import model from "./TransportSub.Model"

const TransportSub = mongoose.model<ITransportSubDocument>('TransportSub', createSchema(model));
export default TransportSub