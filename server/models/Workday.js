import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.config.js";

export const Workday = sequelize.define(
  "Workday",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    startTime: {
      type: DataTypes.TIME,
      defaultValue: "00:00:00",
    },
    finishTime: {
      type: DataTypes.TIME,
      defaultValue: "00:00:00",
    },
    wasAbsent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    paranoid: true,
    deleteAt: "deleteAt",
    timestamps: true,
  }
);
