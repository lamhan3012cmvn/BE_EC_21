import AuthService from './Auth.Services';
import TransportServices from './Transport.Services';

interface IServices {
	createServices: Function;
}
export enum TypeService {
	AUTH,
	TRANSPORT
}
export class Services implements IServices {
	createServices(type: TypeService) {
		switch (type) {
			case TypeService.AUTH:
				return new AuthService();
			case TypeService.TRANSPORT:
				return new TransportServices();
			default:
				return null;
		}
	}
}
