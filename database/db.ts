import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  // 'sqlite::memory:'
  {
    dialect: 'sqlite',
    storage: `${process.cwd()}/data/properties.db`,
  }
);
