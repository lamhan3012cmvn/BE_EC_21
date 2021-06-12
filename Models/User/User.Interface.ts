import { Document } from "mongoose";

export interface ICoordinates {
  lat: string;
  lng: string;
}

export interface IAddress {
  id?: string;
  fullAddress: string;
  coordinates: ICoordinates;
  phoneNumber: string;
}
export interface IUser {
  email: string;
  fullName?: string;
  phone: string;
  password: string;
  isVerify?: boolean;
  typeLogin: string;
  role: string;
  otp: string;
  address?: Array<IAddress>;
  image: string;
  favorites: Array<string>;
  point: number;
}
export interface IUserDocument extends Document, IUser {}
