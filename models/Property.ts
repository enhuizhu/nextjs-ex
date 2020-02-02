import { Model, DataTypes } from  'sequelize';
import { sequelize } from '../database/db'; 

export class Property extends Model {
  
}

Property.init({
  numberOfBedrooms: DataTypes.SMALLINT,
  numberOfBathrooms: DataTypes.SMALLINT,
  numberOfReceptionRooms: DataTypes.SMALLINT,
  postCode: DataTypes.STRING,
  firstLineOfAddress: DataTypes.STRING,
  leaseholdLength: DataTypes.INTEGER,
  isChainFree: DataTypes.BOOLEAN,
  description: DataTypes.TEXT,
  price: DataTypes.BIGINT,
  img: DataTypes.STRING,
}, {sequelize: sequelize, modelName: 'property'});

