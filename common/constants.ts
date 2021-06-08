import { ITypeSupport } from "./../Models/Transport/Transport.interface";
import dotenv from "dotenv";
dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_EMAIL_PASSWORD = process.env.ADMIN_EMAIL_PASSWORD;

export const defaultModel = {
  date: { type: Date },
  string: { type: String, default: "" },
  stringR: { type: String, required: true },
  stringRef: { type: String, required: true, match: /^[a-fA-F0-9]{24}$/ },
  stringPhone: { type: String, required: true, match: /^0\d{9}$/ },
  stringUnique: { type: String, required: true, unique: true },
  array: { type: Array, default: [] },
  number: { type: Number, default: 0 },
  boolean: { type: Boolean, default: true },
  booleanFalse: { type: Boolean, default: false },
  object: { type: Object, default: {} },
};

export const defaultTypeSupport: Array<ITypeSupport> = [
  {
    title: "Standard",
    price: {
      km: "0",
      kg: "0",
    },
    available: "INACTIVE",
  },
  {
    title: "Frozen",
    price: {
      km: "0",
      kg: "0",
    },
    available: "INACTIVE",
  },
  {
    title: "Jewelry",
    price: {
      km: "0",
      kg: "0",
    },
    available: "INACTIVE",
  },
];

export const defaultTypeStatus = {
  active: "ACTIVE",
  inActive: "INACTIVE",
  deleted: "DELETED",
};

export const defaultRoleAccount={
  USER:"USER",
  ADMIN:"ADMIN",
  TRANSPORT:"TRANSPORT",
  TRANSPORT_SUB:"TRANSPORT_SUB",
  TRANSPORT_SUB_CITY:"TRANSPORT_SUB_CITY",
  MERCHANT:"MERCHANT",
  STAFF:"STAFF"
}

export const defaultTypeLogin={
  EMAIL : 'EMAIL',
	GOOGLE : 'GOOGLE',
	FACEBOOK : 'FACEBOOK'
}

export const defaultStatusPackage={
  waitForConfirmation:"AWAIT_FOR_CONFIRMATION",
  onGoing:"ON_GOING",
  delivered:"DELIVERED"
}

export const defaultStatusAwaitPackage={
  goingClientToSub:"GOING_CLIENT_TO_SUB",
  goingSubToSub:"GOING_SUB_TO_SUB",
  goingSubToClient:"GOING_SUB_TO_CLIENT"
}
export const defaultTypeOrders={
  POINT: "POINT",
  ORDER: "ORDER",
}

export const defaultTypePayment={
  POINT: "POINT",
  PAYPAL: "PAYPAL",
  VNPAY: "VNPAY",
}