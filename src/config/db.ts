import { Sequelize } from "sequelize-typescript";
import * as dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER , process.env.DB_PASSWORD,{
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  models: [__dirname + '/../models/**/*.ts']
});

export default db;