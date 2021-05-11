import { ITransportSubCity } from "./../Models/TransportSubCity/TransportSubCity.Interface";
import { ITransportSub } from "./../Models/TransportSub/TransportSub.Interface";
import { defaultTypeSupport } from "./../common/constants";
import { ITransport } from "../Models/Transport/Transport.interface";
import { Request, Response, NextFunction } from "express";
import {
  Transport,
  TransportSub,
  TransportSubCity,
  User,
} from "../Models/index";
import { ReturnServices } from "../Interfaces/Services";

export default class TransportServices {
  constructor() {}

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
        typeSupport: typeSupport,
        phone,
        headquarters,
        FK_createUser: user._id,
      };
      const newTransport = new Transport(obj);
      await newTransport.save();
      return {
        message: "Successfully created transport",
        success: true,
        data: newTransport,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
    }
  };

  //Transport Sub

  private findTransportByUser = async (id: string, option = {}) => {
    const user = await User.findById(id);
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
      current: idTransport,
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

      const { name, city, address, phoneNumber, mail } = data;

      const obj: ITransportSub = {
        name,
        city,
        address,
        phoneNumber,
        mail,
        FK_Transport: _transport.current._id,
      };

      const newTransportSub = new TransportSub(obj);
      await newTransportSub.save();

      return {
        message: "Successfully created transportSub",
        success: true,
        data: newTransportSub,
      };
    } catch (e) {
      console.log(e);
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
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
      return { message: "An error occured", success: false };
    }
  };
}
