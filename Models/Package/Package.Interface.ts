import { Document } from 'mongoose';
interface ICoordinate
{
  city:string,
    county:string,
    ward: string,
    address:string,
    coordinate:string
}
export interface IPackage extends Document {
  title:string,
	description:string,
  recipientName:string,
  senderName:string,
  recipientPhone:string,
  senderPhone:string,
  to:ICoordinate,
  from:ICoordinate
};
