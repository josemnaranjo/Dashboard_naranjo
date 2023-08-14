import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.config.js";
import { Workday } from "./Workday.js";

export const Worker = sequelize.define(
  "Worker",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: { msg: "El nombre solo puede contener letras" },
        notEmpty: true,
        min: 4,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          msg: "El apellido solo puede contener letras",
        },
        notEmpty: true,
        min: 4,
      },
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "El rut ya existe en la base de datos",
      },
    },
    licenseStartDate: {
      type: DataTypes.DATE,
    },
    licenseEndDate: {
      type: DataTypes.DATE,
    },
    workerHasLicence: {
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

Worker.hasMany(Workday, {
  foreignKey: "workerId",
  sourceKey: "id",
});

Workday.belongsTo(Worker, {
  foreignKey: "workerId",
  targetId: "id",
});
