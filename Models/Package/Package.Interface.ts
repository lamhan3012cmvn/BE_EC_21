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

  FK_Transport:string,
  FK_SubTransport:string,
	FK_SubTransportAwait:string,

  status?:string,
	isAwait?:boolean,
	prices?:string,
	distance:string,
	weight:string,
	
	FK_ProductId: string;

	FK_ProductType: string;
	recipient: IInfoUser;
	sender: IInfoUser;
}
export interface IPackageDocument extends Document,IPackage {}
