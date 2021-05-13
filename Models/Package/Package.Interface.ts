import { Document } from 'mongoose';
interface ICoordinate {
	city: string;
	county: string;
	ward: string;
	address: string;
	coordinate: string;
}

export interface IPackage {
	title: string;
	description: string;
	recipientName: string;
	senderName: string;
	recipientPhone: string;
	senderPhone: string;
	to: ICoordinate;
	from: ICoordinate;
}
export interface IPackageDocument extends Document {}
