import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const createSchema = (schema: any) => {
	const model = new Schema(schema, { timestamps: true });
	return model;
};

export default createSchema
