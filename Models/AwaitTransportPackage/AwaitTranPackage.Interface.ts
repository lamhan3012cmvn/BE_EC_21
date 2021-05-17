import { Document } from 'mongoose';

export interface IAwaitTransportPackage{
	packages:string,
  status:string,
  FK_from:string,
  FK_to:string,
}
export interface IAwaitTransportPackageDocument extends Document,IAwaitTransportPackage {

}