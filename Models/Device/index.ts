import { IDevice } from './Device.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';
import DevicesSchema from './Devicces.Model'


const Devices = mongoose.model<IDevice>('Devices', createSchema(DevicesSchema));
export default Devices