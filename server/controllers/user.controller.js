import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { where } from "sequelize";

export const Register = async (req, res) => {
  try {
    const { id, name, lastName, email, password } = req.body;
    const newUser = await User.create({
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    });
    const jwToken = jwt.sign({ id: id }, "secretUserToken");
    return res
      .cookie("usertoken", jwToken, "secretUserToken", {
        httpOnly: true,
      })
      .json({ mensaje: "", newUser });
  } catch (err) {
    res.json({
      mensaje: "Algo salió mal al crear el usuario",
      errores: err.errors,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("usertoken");
    res.json({ mensaje: "Ususario deslogueado", success: true });
  } catch (err) {
    return res.json({
      mensaje: "Ocurrió un error al intentar desloguearse",
      error: err.errors,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findAll({ where: { email: email } });

    if (user === null) {
      return res.json({
        errores: {
          error: { mensaje: "El usuario no existe en la base de datos" },
        },
      });
    }
    const correctPassword = await bcrypt.compare(password, user[0].password);

    if (!correctPassword) {
      return res.json({
        errores: {
          error: { mensaje: "La contraseña es incorrecta" },
        },
      });
    }
    const jwtToken = jwt.sign({ id: user.id }, "tokensecreto");

    return res
      .cookie("usertoken", jwtToken, "tokensecreto", { httpOnly: true })
      .json({ mensaje: "Sesión iniciada con éxito", user });
  } catch (err) {
    res.json({
      mensaje: "Algo salió mal al iniciar sesión",
      err,
    });
  }
};

export const EditUser = async (req, res) => {
  try {
    const { name, lastName, email } = req.body;
    await User.update(
      {
        name,
        lastName,
        email,
      },
      { where: { email: email } }
    );

    res.json({ mensaje: "Datos del usuario actualizados con éxito" });
  } catch (err) {
    return res.json({
      mensaje: "Ocurrió un error al intentar editar el usuario",
      error: err.errors,
    });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    await User.destroy({ where: { email: email } });
    res.clearCookie("usertoken");
    res.json({ mensaje: "Ususario borrado" });
  } catch (err) {
    return res.json({
      mensaje: "Ocurrió un error al intentar borrar el usuario",
      error: err.errors,
    });
  }
};

export const GetUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findAll({ where: { email: email } });
    res.json(user);
  } catch (err) {
    return res.json({
      mensaje: "Ocurrio un error al intentar obtener la información",
      error: err.errors,
    });
  }
};
