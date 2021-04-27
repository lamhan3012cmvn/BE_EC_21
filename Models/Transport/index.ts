import { ITransport } from './Transport.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import TransportSchema from "./Transports.Model"

const Transport = mongoose.model<ITransport>('Transport', createSchema(TransportSchema));
export default Transport