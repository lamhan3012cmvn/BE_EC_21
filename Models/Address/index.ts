import { IAddress } from './Address.Interface';
import  createSchema from "../Base.Model";
import AddressSchema from './Address.Model';
import mongoose from 'mongoose';


const Address = mongoose.model<IAddress>('Address', createSchema(AddressSchema));
export default Address