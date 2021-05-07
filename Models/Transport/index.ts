import {  ITransportDocument } from './Transport.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import TransportSchema from "./Transports.Model"

const Transport = mongoose.model<ITransportDocument>('Transport', createSchema(TransportSchema));
export default Transport