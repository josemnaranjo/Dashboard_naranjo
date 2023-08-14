import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "dashboard_naranjo",
  "root",
  "josemnaranjoc",
  {
    host: "localhost",
    dialect: "mysql",
  }
);
