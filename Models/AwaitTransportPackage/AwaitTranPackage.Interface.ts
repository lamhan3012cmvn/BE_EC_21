import { IPackage, IPackageDocument } from './../Package/Package.Interface';
import { Document } from 'mongoose';


export interface IAwaitTransportPackage{
	packages:Array<IPackageDocument>,
  status:string,
  isDone:boolean,
  FK_from:string,
  FK_to:string,
}
export interface IAwaitTransportPackageDocument extends Document,IAwaitTransportPackage {

}