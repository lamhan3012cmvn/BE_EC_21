import { ReturnServices } from "../Interfaces/Services";
import { Merchant, Package, User } from "../Models";
import { defaultStatusPackage, defaultTypeStatus } from "../common/constants";
import { IAddress } from "../Models/User/User.Interface";
import { defaultRoleAccount } from "../common/constants";

export default class MerchantService {
  constructor() {}
  public createMerchant = async (body: any): Promise<ReturnServices> => {
    try {
      const user = await User.findById(body.FK_createUser);
      if (!user) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      const address: IAddress = {
        id: user.email + new Date().toISOString(),
        fullAddress: body.fullAddress,
        coordinates: {
          lat: body.lat,
          lng: body.lng,
        },
        phoneNumber: body.phone,
      };
      body.address = address;
      const merchant = await Merchant.find({
        FK_createUser: body.FK_createUser,
        status: { $ne: defaultTypeStatus.deleted },
      });
      if (merchant.length == 0) {
        const newMerchant = await Merchant.create(body);
        if (!newMerchant) {
          return {
            message: "Create merchant failure",
            success: false,
          };
        }
        return {
          message: "Create merchant successfully",
          success: true,
          data: newMerchant,
        };
      } else {
        return {
          message: "Your store already",
          success: false,
          status: 400,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateMerchant = async (body: any): Promise<ReturnServices> => {
    try {
      const user = await User.findById(body.FK_createUser);
      if (!user) {
        return {
          message: "User does not exists",
          success: false,
        };
      }
      const address: IAddress = {
        id: user.email + new Date().toISOString(),
        fullAddress: body.fullAddress,
        coordinates: {
          lat: body.lat,
          lng: body.lng,
        },
        phoneNumber: body.phone,
      };
      const merchantInfo = {
        name: body.name,
        description: body.description,
        image: body.image,
        address: address,
        FK_category: body.FK_category,
      };
      const merchant = await Merchant.findOneAndUpdate(
        { _id: body.id, FK_createUser: body.FK_createUser },
        merchantInfo,
        { new: true }
      );
      if (!merchant) {
        return {
          message: "Merchant does not exists",
          success: false,
        };
      }
      return {
        message: "Update merchant successfully",
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public adminUpdateMerchant = async (
    idUser: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.findOneAndUpdate(
        { _id: body.idMerchant },
        { status: body.status },
        { new: true }
      );
      if (!merchant) {
        return {
          message: "Merchant does not exists",
          success: false,
        };
      }
      return {
        message: "Update merchant successfully",
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
  
  public getOrderByStatus=async (idUser:string,status:string):Promise<ReturnServices>=>{
    try {
			const packages = await Package.find(
				{
					isMerchantSend: true,
					status: status
				},
				{
					_id: 1,
					status: 0,
					FK_SubTransport: 0,
					FK_SubTransportAwait: 0
				}
			)
      const currentMerchant= await Merchant.findOne({FK_createUser:idUser})
      if(!currentMerchant)
      return {
				message: 'Dont fine merchant',
				success: false,
			};
      const idMerchant=currentMerchant._id
      console.log(`LHA:  ===> file: Merchant.Services.ts ===> line 166 ===> idMerchant`, idMerchant)
      const convertPackage=JSON.parse(JSON.stringify(packages))
      const findMerchant=convertPackage.reduce((t:any,v:any)=>{
        const FK_Product=v.FK_Product
        const res=FK_Product.find((merchant:any)=>merchant.FK_Merchant+""===idMerchant+"")
        if(res)
        {
          t.push(v)
        }
        return t
      },[])
      console.log(`LHA:  ===> file: Merchant.Services.ts ===> line 170 ===> findMerchant`, findMerchant)


			const sortPackages=findMerchant.sort(
				(a: any, b: any) =>
				new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
			);
			let canReceive=false
			let canDelete=false
			if(status===defaultStatusPackage.waitForConfirmation)
			{
				canDelete=true
			}
			if(status===defaultStatusPackage.onGoing)
			{
				canReceive=true
			}
			const resData=sortPackages.map((pack:any)=>{
				console.log("canReceive",canReceive)
				console.log("not is Await",pack.isAwait)
				console.log("=======================================")
				return Object.assign(pack,{canReceive:canReceive&&(!pack.isAwait),canDelete})
			})
			// 	//canReceive
				// canDelete
			return {
				message: 'Get all order by Status',
				success: true,
				data: resData
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
  }

  public getMerchant = async (idUser: string): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.findOne({
        FK_createUser: idUser,
        status: { $ne: defaultTypeStatus.deleted },
      });
      if (!merchant) {
        return {
          message: "You don't have a store",
          success: false,
        };
      } else {
        return {
          message: "Get merchant info successfully",
          success: true,
          data: merchant,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getMerchantByStatus = async ( status: string): Promise<ReturnServices> => {
    try {
      const merchant = await Merchant.find({
        status: status,
      });
      return {
        message: "Get merchant info successfully",
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getMerchantInfoById = async (idMerchant:string): Promise<ReturnServices> => {
    try {
      const merchant= await Merchant.findById(idMerchant);
      return {
        message: 'Get merchant successfully',
        success: true,
        data: merchant,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getCoordinate = async (senderIdMerchant:string): Promise<any> => {
    try {
      const merchant=await Merchant.findById(senderIdMerchant)
      return merchant
    } catch (e) {
      console.log(e);
      return null
    }
  };

	public cancelPackage=async (idPackage:string):Promise<ReturnServices>=>{
		try {
			
			const _package = await Package.findOne(
				{
					_id: idPackage,
					isAwait: false,
					status:defaultStatusPackage.waitForConfirmation
				}
			)
				if(!_package) 
			return {
				message: 'Dont find package receive',
				success: false,
			};

			_package.status=defaultStatusPackage.cancel
			_package.historyStatus&&_package.historyStatus.push({createAt:new Date(),title:"Order has been delivered successfully. Thank you for using the service"})
			await _package.save()
			const _user=await User.findById(_package.FK_Recipient)
      if(_user&&_package.prices)
			{
				_user.point=_user.point+(+_package.prices||0)
				await _user.save()
			}
			return {
				message: 'Dont find package receive',
				success: false,
			};
		} catch (e) {
			console.log(e);
			return { message: 'An error occurred', success: false };
		}
	}
}
