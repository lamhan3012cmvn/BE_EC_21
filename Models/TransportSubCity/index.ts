
import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import {ITransportSubCityDocument} from './TransportSubCity.Interface'
import model from "./TransportSubCity.Mode"


const TransportSubCity = mongoose.model<ITransportSubCityDocument>('TransportSubCity', createSchema(model));
export default TransportSubCity