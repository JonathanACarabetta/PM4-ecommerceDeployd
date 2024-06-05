import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';;
import {DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT,DB_TYPE,DB_USERNAME} from "./envs"
//dotenvConfig({ path:`"./src/config/.env"`});

const config = {
    type:'postgres',
    database:DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    username:DB_USERNAME,
    password: DB_PASSWORD,
    entities:["dist/**/*.entity{.ts,.js}"],
    migrations:["dist/migrations/*{.ts,.js}"],
    autoLoadEntities:true,
    logging:true,
    synchronize: true, 
    dropSchema: false,
   }

export default registerAs('typeorm', () => config)

export const connectSource = new DataSource(config as DataSourceOptions)