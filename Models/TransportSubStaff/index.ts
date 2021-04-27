
import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import {ITransportSubStaff} from './TransportSubStaff.Interface'
import model from "./TransportSubStaff.Mode"


const TransportSubStaff = mongoose.model<ITransportSubStaff>('Transport', createSchema(model));
export default TransportSubStaff