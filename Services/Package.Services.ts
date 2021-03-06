import {
  ITransportSub,
  ITransportSubDocument,
} from "./../Models/TransportSub/TransportSub.Interface";
import { defaultStatusPackage, defaultTypeStatus } from "./../common/constants";
import {
  IPackage,
  ILocation,
  IInfoUser,
} from "./../Models/Package/Package.Interface";
import { ReturnServices } from "../Interfaces/Services";
import { Package, Transport, TransportSub } from "../Models";
import { getDistanceFromLatLonInKm } from "../common/helper";

export default class PackageService {
  constructor() {}

  private findSubTransport = (
    SubPackage: Array<ITransportSubDocument>,
    currentLocation: ILocation
  ): ITransportSubDocument | null => {
    if (SubPackage.length <= 0) return null;
    const minSub = {
      current: SubPackage[0],
      value: getDistanceFromLatLonInKm(
        +SubPackage[0].location.coordinate.lat,
        +SubPackage[0].location.coordinate.lng,
        +currentLocation.coordinate.lat,
        +currentLocation.coordinate.lng
      ),
    };
    SubPackage.forEach((elm) => {
      const coordinateSub = elm.location.coordinate;
      const min = getDistanceFromLatLonInKm(
        +coordinateSub.lat,
        +coordinateSub.lng,
        +currentLocation.coordinate.lat,
        +currentLocation.coordinate.lng
      );
      if (min < minSub.value) {
        minSub.current = elm;
        minSub.value = min;
      }
    });
    return minSub.current;
  };
  public createPackage = async (
    body: any,
    isMerchantSend: boolean = true
  ): Promise<ReturnServices> => {
    try {
      const {
        status,
        title,
        description,
        estimatedDate,
        FK_Recipient,
        FK_Transport,
        FK_SubTransport,
        FK_SubTransportAwait,
        prices,
        distance,
        weight,
        FK_Product, //Get from cart
        FK_ProductType, //Get from cart
        recipient,
        sender,
      } = body;

      const currentTransport = await Transport.findById(FK_Transport);
      if (!currentTransport)
        return { message: "Don't find transport", success: false };
      // const recipientLocation: ILocation = {
      // 	address: recipientAddress,
      // 	coordinate: {
      // 		lat: recipientCoordinateLat,
      // 		lng: recipientCoordinateLng
      // 	}
      // };

      // const currentRecipient: IInfoUser = {
      // 	name: recipientName,
      // 	phone: recipientPhone,
      // 	location: recipientLocation
      // };

      // const senderLocation: ILocation = {
      // 	address: senderAddress,
      // 	coordinate: {
      // 		lat: senderCoordinateLat,
      // 		lng: senderCoordinateLng
      // 	}
      // };
      // const currentSender: IInfoUser = {
      // 	name: senderName,
      // 	phone: senderPhone,
      // 	location: senderLocation
      // };

      // const transportSub=await TransportSub.find({FK_Transport:FK_Transport,status:defaultTypeStatus.active})

      // const findLocationSender=this.findSubTransport(transportSub,senderLocation)
      // if(!findLocationSender)
      // 	return { message: 'Dont find Sub transport sender', success: false };
      // const FK_LocationSub=findLocationSender._id

      // const findLocationNext=this.findSubTransport(transportSub,recipientLocation)
      // if(!findLocationNext)
      // 	return { message: 'Dont find Sub transport sender', success: false };
      // const FK_LocationNext=findLocationNext._id

      const obj: IPackage = {
        title,
        recipient: recipient,
        sender: sender,
        FK_Product,
        FK_ProductType,
        FK_Transport,
        FK_Recipient,
        FK_SubTransport,
        FK_SubTransportAwait,
        estimatedDate: `${estimatedDate + 172800}`,
        codeBill: `${currentTransport.name
          .slice(0, 3)
          .toLocaleUpperCase()}${new Date().getTime()}`,
        description,
        prices,
        weight,
        distance,
        isMerchantSend,
        status,
      };

      const newPackage = new Package(obj);
      await newPackage.save();

      return {
        message: "Create Successfully",
        success: true,
        data: newPackage,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getPackageDetailByStatus = async (
    body: any
  ): Promise<ReturnServices> => {
    try {
      const { id } = body;
      const resPackage = await Package.findById(id);
      if (!resPackage)
        return {
          message: "get package detail successfully",
          success: true,
          data: {},
        };
      return {
        message: "get packages successfully",
        success: true,
        data: resPackage,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getPackageByStatus = async (body: any): Promise<ReturnServices> => {
    try {
      const { name } = body;
      const packages = await Package.find(
        { status: name },
        { _id: 1, codeBill: 1, estimatedDate: 1, FK_Transport: 1 }
      );
      const clonePackage = await Promise.all(
        packages.map(async (elm: any) => {
          const { FK_Transport, ...cloneObj } = elm;
          const res = await Transport.findById(elm.FK_Transport, {
            _id: 1,
            name: 1,
          });
          cloneObj.Transport = res;
          return cloneObj;
        })
      );
      return {
        message: "get packages successfully",
        success: true,
        data: clonePackage,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getPackageSubByStatus = async (body: any): Promise<ReturnServices> => {
    try {
      ///???
      const { name } = body;
      const packages = await Package.find(
        { status: name },
        { _id: 1, codeBill: 1, estimatedDate: 1, FK_Transport: 1 }
      );
      const clonePackage = await Promise.all(
        packages.map(async (elm: any) => {
          const { FK_Transport, ...cloneObj } = elm.toObject();
          const res = await Transport.findById(elm.FK_Transport, {
            _id: 1,
            name: 1,
          });
          cloneObj.Transport = res;
          return cloneObj;
        })
      );
      return {
        message: "get packages successfully",
        success: true,
        data: clonePackage,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public automaticPackageToSub = async (): Promise<ReturnServices> => {
    try {
      const autoPackage = await Package.find({
        isAwait: false,
        status: defaultStatusPackage.onGoing,
      });

      console.log(
        `LHA:  ===> file: Package.Services.ts ===> line 234 ===> autoPackage`,
        autoPackage
      );
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public automaticSubToPackage = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public confirmPackage = async (body: any): Promise<ReturnServices> => {
    try {
      const { idPackage } = body;
      const resPackage = await Package.findById(idPackage);

      if (!resPackage)
        return { message: "No package found to confirm", success: false };

      resPackage.status = defaultStatusPackage.onGoing;
      await resPackage.save();

      //Create await package

      return { message: "Change the package to in-delivery", success: true };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public confirmPackages = async (body: any): Promise<ReturnServices> => {
    try {
      const { idPackages } = body;
      idPackages.forEach(async (id: string) => {
        const resPackage = await Package.findById(id);
        if (resPackage) {
          resPackage.status = defaultStatusPackage.onGoing;
          await resPackage.save();
        }
      });

      // if(!resPackage) return { message: 'No package found to confirm', success: false };

      //Create await package

      return { message: "Change the package to in-delivery", success: true };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public functionInit = async (): Promise<ReturnServices> => {
    try {
      return { message: "An error occurred", success: false };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
}
