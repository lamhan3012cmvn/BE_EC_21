import { Document } from 'mongoose';

export interface ILocation {
	city: string;
	county: string;
	ward: string;
	address: string;
	coordinate: { lat: string; lng: string };
}
export interface IInfoUser {
	name: string;
	phone: string;
	location: ILocation;
}
export interface IPackage {
	title: string;
	description: string;
	codeBill:string,

  estimatedDate:string,
	FK_Recipient:string,

  FK_Transport:string,
  FK_SubTransport:string,
	FK_SubTransportAwait:string,
	isMerchantSend?:boolean,

  status?:string,
	isAwait?:boolean,
	prices?:string,
	distance:string,
	weight:string,
	
	FK_Product: Array<Object>;

	FK_ProductType: string;
	recipient: IInfoUser;
	sender: IInfoUser;
	createdAt:Date,
	updatedAt:Date
}
export interface IPackageDocument extends Document,IPackage {}
