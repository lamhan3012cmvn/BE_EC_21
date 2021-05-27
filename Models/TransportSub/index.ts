import {  ITransportSubDocument } from './TransportSub.Interface';
import mongoose from 'mongoose';
import createSchema from '../Base.Model';

import model from "./TransportSub.Model"
import { defaultTypeStatus } from '../../common/constants';

const schemaTransportSub = createSchema(model);

schemaTransportSub.pre<ITransportSubDocument>('save', function (next: any) {
	try {
		const current = this;
		if (current.FK_CreateUser==="")
			current.status = defaultTypeStatus.inActive;
		else current.status = defaultTypeStatus.active;
		next();
	} catch (err) {
		next(err);
	}
});
const TransportSub = mongoose.model<ITransportSubDocument>(
	'TransportSub',
	schemaTransportSub
);
// const TransportSub = mongoose.model<ITransportSubDocument>('TransportSub', createSchema(model));
export default TransportSub