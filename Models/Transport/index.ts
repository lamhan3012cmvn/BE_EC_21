import { NextFunction } from 'express';
import { ITransportDocument } from './Transport.interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import TransportSchema from './Transports.Model';

import { defaultTypeStatus } from '../../common/constants';
const schemaTransport = createSchema(TransportSchema);

schemaTransport.pre<ITransportDocument>('save', function (next: any) {
	try {
		const current = this;
		if (current.FK_Staffs.length <= 7)
			current.status = defaultTypeStatus.inActive;
		else current.status = defaultTypeStatus.active;
		next();
	} catch (err) {
		next(err);
	}
});
const Transport = mongoose.model<ITransportDocument>(
	'Transport',
	schemaTransport
);
export default Transport;
