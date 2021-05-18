import { ITransportSubCity } from "./../Models/TransportSubCity/TransportSubCity.Interface";
import { ITransportSub } from "./../Models/TransportSub/TransportSub.Interface";
import { defaultRoleAccount ,defaultTypeSupport} from "./../common/constants";
import { ITransport } from "../Models/Transport/Transport.interface";
import {
  Transport,
  TransportSub,
  TransportSubCity,
  User,
} from "../Models/index";
import { ReturnServices } from "../Interfaces/Services";

export default class TransportServices {
  constructor() {}

  public getPrice=async ():Promise<ReturnServices> =>{
    return {
      message: "Can not find a user to create transport",
      success: false,
      status: 400,
    };
  }
  public createTransport = async (
    idUser: string,
    data: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "Can not find a user to create transport",
          success: false,
          status: 400,
        };
      }

      const typeSupport = defaultTypeSupport;
      const { name, description, avatar, imageVerify, phone, headquarters } =
        data;

      const obj: ITransport = {
        name,
        description,
        avatar,
        imageVerify,
        phone,
        headquarters,
        typeSupport: typeSupport,
        FK_createUser: user._id,
        FK_Staffs:[]
      };

      const newTransport = new Transport(obj);
      await newTransport.save();

      user.role=defaultRoleAccount.TRANSPORT
      await user.save()

      const objTransportSubHCM: ITransportSub = {
        name:`${newTransport.name}_${"HCM"}`,
        city:"HCM",
        FK_Transport: newTransport._id,
      };

      const objTransportSubHN: ITransportSub = {
        name:`${newTransport.name}_${"HN"}`,
        city:"HN",
        FK_Transport: newTransport._id,
      };

      const newTransportSubHCM = new TransportSub(objTransportSubHCM);
      await newTransportSubHCM.save();
      
      const newTransportSubHN = new TransportSub(objTransportSubHN);
      await newTransportSubHN.save();

      const objSubHCMQ1: ITransportSubCity = {
        name:`${newTransport.name}_${"HCM"}_${"Q1"}`,
	      district:"HO_CHI_MINH",
        FK_Transport_Sub: newTransportSubHCM._id,
      };

      const objSubHNHHK: ITransportSubCity = {
        name:`${newTransport.name}_${"HCM"}_${"Q1"}`,
	      district:"HO_HOAN_KIEM",
        FK_Transport_Sub: newTransportSubHN._id,
      };

      const subHCMQ1 = new TransportSubCity(objSubHCMQ1);
      await subHCMQ1.save();

      const subHNHHK = new TransportSubCity(objSubHNHHK);
      await subHNHHK.save();

      return {
        message: "Successfully created transport",
        success: true,
        data: {},
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateTransport = async (
    id: string,
    body: any
  ): Promise<ReturnServices> => {
    try {
      const transport = await Transport.findOneAndUpdate(
        { FK_createUser: id },
        body,
        { new: true }
      );
      console.log(transport);
      if (!transport) {
        return {
          message: "transport already does not exists",
          success: false,
        };
      }
      return {
        message: "Successful updated transport",
        success: true,
        data: transport,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public deleteTransport = async (
    id: string,
    status: string = "IS_ACTIVE"
  ): Promise<ReturnServices> => {
    try {
      const transport = await Transport.findById(id);
      if (transport) {
        transport.update({ status });
        await transport.save();
        return {
          message: "Successful updated transport",
          success: true,
          data: transport,
        };
      } else {
        return {
          message: "transport  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public getTransport = async (id: string): Promise<ReturnServices> => {
    try {
      const transport = await Transport.findOne({FK_createUser: id });
      if (transport) {
        return {
          message: "Successful data retrieval",
          success: true,
          data: transport,
        };
      } else {
        return {
          message: "transport  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  //Transport Sub
  private findTransportByUser = async (id: string, option = {}) => {
    const user = await User.findById(id);
    console.log(`LHA:  ===> file: Transport.Services.ts ===> line 177 ===> user`, user)
    if (!user) {
      return {
        current: null,
        message: "Can not find a user to create transportSub",
      };
    }
    const idTransport = await Transport.findOne(
      { FK_createUser: user._id },
      option
    );
    if (!idTransport) {
      return {
        current: null,
        message: "Can not find a Transport to create transportSub",
      };
    }
    return {
      current: {transport:idTransport,user:user},
    };
  };

  public createTransportSub = async (
    idUser: string,
    data: any
  ): Promise<ReturnServices> => {
    try {
      const _transport = await this.findTransportByUser(idUser);
      if (!_transport.current) {
        return {
          message: _transport.message,
          success: false,
        };
      }

      const { city, address, phoneNumber, mail } = data;

      const obj: ITransportSub = {
        name:`${_transport.current.transport.name}_${city}`,
        city,
        address,
        phoneNumber,
        mail,
        FK_Transport: '',
        FK_CreateUser:_transport.current.user._id
      };

      const newTransportSub = new TransportSub(obj);
      await newTransportSub.save();

      // _transport.current.user.FK_transport=newTransportSub._id
      await _transport.current.user.save()

      return {
        message: "Successfully created transportSub",
        success: true,
        data: {},
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public updateTransportSub = async (
    id: string,
    newData: any
  ): Promise<ReturnServices> => {
    try {
      const _transport = await this.findTransportByUser(id);
      if (!_transport.current) {
        return {
          message: _transport.message,
          success: false,
        };
      }

      const idFind = "";
      const transportSub = await TransportSub.findById(idFind);
      if (transportSub) {
        transportSub.update(newData);
        await transportSub.save();
        return {
          message: "Successful updated transportSub",
          success: true,
          data: transportSub,
        };
      } else {
        return {
          message: "transportSub  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  public deleteTransportSub = async (
    id: string,
    status: string = "IS_ACTIVE"
  ): Promise<ReturnServices> => {
    try {
      const transportSub = await TransportSub.findById(id);
      if (transportSub) {
        transportSub.update({ status });
        await transportSub.save();
        return {
          message: "Successful updated transportSub",
          success: true,
          data: transportSub,
        };
      } else {
        return {
          message: "transportSub  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
  public getTransportSub = async (id: string): Promise<ReturnServices> => {
    try {
      const transportSub = await TransportSub.findById(id);
      if (transportSub) {
        return {
          message: "Successful data retrieval",
          success: true,
          data: transportSub,
        };
      } else {
        return {
          message: "transportSub  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };

  // Transport Sub City

  public createTransportSubCity = async (
    idUser: string,
    data: any
  ): Promise<ReturnServices> => {
    try {
      const user = await User.findById(idUser);
      if (!user) {
        return {
          message: "Can not find a user to create transportSubCity",
          success: false,
          status: 400,
        };
      }

      const { name, district, ward, coordinates, phoneNumber, mail } = data;

      const obj: ITransportSubCity = {
        name,
        district,
        ward,
        coordinates,
        phoneNumber,
        mail,
        FK_Transport_Sub:""
      };
      const newTransportSubCity = new TransportSubCity(obj);
      await newTransportSubCity.save();
      return {
        message: "Successfully created transportSubCity",
        success: true,
        data: newTransportSubCity,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
  public updateTransportSubCity = async (
    id: string,
    newData: any
  ): Promise<ReturnServices> => {
    try {
      const idSubCity = "";
      const transportSubCity = await TransportSubCity.findById(idSubCity);
      if (transportSubCity) {
        transportSubCity.update(newData);
        await transportSubCity.save();
        return {
          message: "Successful updated transportSubCity",
          success: true,
          data: transportSubCity,
        };
      } else {
        return {
          message: "transportSubCity  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
  public deleteTransportSubCity = async (
    id: string,
    status: string = "IS_ACTIVE"
  ): Promise<ReturnServices> => {
    try {
      const transportSubCity = await TransportSubCity.findById(id);
      if (transportSubCity) {
        transportSubCity.update({ status });
        await transportSubCity.save();
        return {
          message: "Successful updated transportSubCity",
          success: true,
          data: transportSubCity,
        };
      } else {
        return {
          message: "transportSubCity  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
  public getTransportSubCity = async (id: string): Promise<ReturnServices> => {
    try {
      const transportSubCity = await TransportSubCity.findById(id);
      if (transportSubCity) {
        return {
          message: "Successful data retrieval",
          success: true,
          data: transportSubCity,
        };
      } else {
        return {
          message: "transportSubCity  already does not exists",
          success: false,
        };
      }
    } catch (e) {
      console.log(e);
      return { message: "An error occurred", success: false };
    }
  };
}
