import { ITransport } from './../Transport/Transport.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import model from "./TransportSub.Model"

const TransportSub = mongoose.model<ITransport>('Transport', createSchema(model));
export default TransportSub