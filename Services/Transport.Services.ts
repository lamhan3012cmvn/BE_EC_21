import { ITransport } from '../Models/Transport/Transport.interface';
import { Request, Response, NextFunction } from 'express';
import { Transport, User } from '../Models/index';
import bcrypt from 'bcrypt';
import { ReturnServices } from '../Interfaces/Services';

export default class TransportServices {
	constructor(
	) {}

  public createTransport = async (data:any): Promise<ReturnServices> => {
   try{
      const newTransport= new Transport(data)
      await newTransport.save()
      return {
        message: 'Successfully created transport',
        success: true,
        data: newTransport
      };
    }
    catch(e){
      console.log(e);
			return { message: 'An error occured', success: false };
    }
  }
  public updateTransport = async (id:string,newData:any): Promise<ReturnServices> => {
    try{
      const transport = await Transport.findById(IDBRequest);
      if(transport)
      {
        transport.update(newData)
        await transport.save()
        return {
					message: 'Successful updated transport',
					success: true,
					data: transport
				};
      }
      else {
        return { message: 'transport  already does not exists', success: false };
      }
   }
    catch(e){
      console.log(e);
			return { message: 'An error occured', success: false };
    }
  }
  public deleteTransport = async (id:string,status:string="IS_ACTIVE"): Promise<ReturnServices> => {
    try{
      const transport = await Transport.findById(id);
      if(transport)
      {
        transport.update({status})
        await transport.save()
        return {
					message: 'Successful updated transport',
					success: true,
					data: transport
				};
      }
      else {
        return { message: 'transport  already does not exists', success: false };
      }
    }
    catch(e){
      console.log(e);
			return { message: 'An error occured', success: false };
    }
  }
  public getTransport = async (id:string): Promise<ReturnServices> => {
    try{
      const transport = await Transport.findById(id);
      if(transport)
      {
        return {
					message: 'Successful data retrieval',
					success: true,
					data: transport
				};
      }
      else {
        return { message: 'transport  already does not exists', success: false };
      }
    }
    catch(e){
      console.log(e);
			return { message: 'An error occured', success: false };
    }
  }
}
