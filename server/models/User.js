import { DataTypes } from "sequelize";
import { sequelize } from "../config/mysql.config.js";
import bcrypt from "bcrypt";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: { msg: "El nombre de usuario solo puede contener letras" },
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
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, "a");
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSaltSync(10, "a");
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
  },
  {
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);
