
import * as nodemailer from 'nodemailer';
export class SendMail {
	private _transporter: nodemailer.Transporter;
  private _ADMIN_EMAIL:string;
  private _ADMIN_EMAIL_PASSWORD:string;
	constructor() {
    const mailHost = 'smtp.gmail.com';
    this._ADMIN_EMAIL= process.env.ADMIN_EMAIL!;
    this._ADMIN_EMAIL_PASSWORD= process.env.ADMIN_EMAIL_PASSWORD!;

		this._transporter = nodemailer.createTransport({
			host: mailHost,
			port: 587, 
			secure: false,
			auth: {
				user: this._ADMIN_EMAIL,
				pass: this._ADMIN_EMAIL_PASSWORD
			}
		});
	}
	sendMail(to: string, subject: string, content: string) {
		let options = {
			from: this._ADMIN_EMAIL,
			to: to,
			subject: subject,
			text: content
		};

		this._transporter.sendMail(options, (error, info) => {
			if (error) {
				return console.log(`error: ${error}`);
			}
			console.log(`Message Sent ${info.response}`);
		});
	}
}


