
import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import {ITransportSubCity} from './TransportSubCity.Interface'
import model from "./TransportSubCity.Mode"


const TransportSubCity = mongoose.model<ITransportSubCity>('Transport', createSchema(model));
export default TransportSubCity