import path from "path";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'boburbek0119',
  database: 'n37',
  entities: [
    path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')
  ],
  migrations: [
    path.join(__dirname, '..', 'migrations', '*.{ts,js}')
  ],
  logging: true,
  synchronize: false
})