import { NextFunction, Response } from 'express';
import { IValidateRequest } from '../common/DefineRequest';
import { User } from '../Models';

export default class CheckRole {
	public isRole(roles: Array<string>): Function {
		return async (
			req: IValidateRequest | any,
			res: Response,
			next: NextFunction
		): Promise<void> => {
			try {
        console.log(`LHA:  ===> file: CheckRole.Services.ts ===> line 14 ===> roles`, roles.length<=0)
				if(roles.length<=0)	next()
				const tokenId = req.value.body.token.data;
				const user = await User.findById(tokenId, { _id: 1, role: 1 });
        console.log(`LHA:  ===> file: CheckRole.Services.ts ===> line 16 ===> user`, user)
				
				if (user && roles.includes(user.role)){
					console.log(user)
					next()
					return;
				}
				res.status(403).json({
					message: 'Verify Role Fail'
				});
			} catch (err) {
				res.status(500).json({
					message: 'Error Fail'
				});
			}
		};
	}
}
