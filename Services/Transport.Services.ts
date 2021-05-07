import { defaultTypeSupport } from './../common/constants';
import { ITransport } from '../Models/Transport/Transport.interface';
import { Request, Response, NextFunction } from 'express';
import { Transport, User } from '../Models/index';
import bcrypt from 'bcrypt';
import { ReturnServices } from '../Interfaces/Services';
import e from 'cors';

export default class TransportServices {
	constructor() {}

	public createTransport = async (
		idUser: string,
		data: any
	): Promise<ReturnServices> => {
		try {
			const user = await User.findById(idUser);
			if (!user) {
				return {
					message: 'Can not find a user to create transport',
					success: false,
					status: 400
				};
			}
      
      const typeSupport=defaultTypeSupport

      const {name,description,avatar,imageVerify,phone,headquarters}=data

			const obj: ITransport = {
				name,
				description,
				avatar,
				imageVerify,
				typeSupport: typeSupport,
				phone,
				headquarters,
				FK_createUser: user._id
			};
			const newTransport = new Transport(obj);
			await newTransport.save();
			return {
				message: 'Successfully created transport',
				success: true,
				data: newTransport
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
	public updateTransport = async (
		id: string,
		newData: any
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findById(IDBRequest);
			if (transport) {
				transport.update(newData);
				await transport.save();
				return {
					message: 'Successful updated transport',
					success: true,
					data: transport
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
	public deleteTransport = async (
		id: string,
		status: string = 'IS_ACTIVE'
	): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findById(id);
			if (transport) {
				transport.update({ status });
				await transport.save();
				return {
					message: 'Successful updated transport',
					success: true,
					data: transport
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
	public getTransport = async (id: string): Promise<ReturnServices> => {
		try {
			const transport = await Transport.findById(id);
			if (transport) {
				return {
					message: 'Successful data retrieval',
					success: true,
					data: transport
				};
			} else {
				return {
					message: 'transport  already does not exists',
					success: false
				};
			}
		} catch (e) {
			console.log(e);
			return { message: 'An error occured', success: false };
		}
	};
}
