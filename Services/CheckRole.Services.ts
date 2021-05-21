import { NextFunction ,Response} from 'express';
import { IValidateRequest } from "../common/DefineRequest";
import { User } from '../Models';


export default class CheckRole{
  public  isRole(roles:Array<string>): Function {
    return async (req: IValidateRequest|any,res: Response,next: NextFunction):Promise<void> =>
      {
        const tokenId=req.value.body.token.data
        console.log(`LHA:  ===> file: CheckRole.Services.ts ===> line 11 ===> tokenId`, tokenId)
        const user=await User.findById(tokenId,{_id:1,role:1})
        console.log(`LHA:  ===> file: CheckRole.Services.ts ===> line 12 ===> user`, user)
        
        if(user)
        {
          const i=roles.indexOf(user.role)
          if(i!== -1) next()
        }
           res.status(500).json({
            message: "Verify Role Fail",
          });
      }
  }
}