import { Document } from "mongoose";
import { IAddress } from "../User/User.Interface";

export interface IMerchant extends Document {
  name: string;
  description: string;
  image: string;
  address: IAddress;
  status: string;
  FK_category: string;
  FK_CreateUser: string;
}
