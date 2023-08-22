import { Workday } from "../models/Workday.js";
import { Worker } from "../models/Worker.js";
import dayjs from "dayjs";

export const checkIn = async (req, res) => {
  try {
    const { date } = req.params;
    const { rut } = req.body;
    const startTime =
      dayjs().hour() + ":" + dayjs().minute() + ":" + dayjs().second();

    const workerInfo = await Worker.findAll({
      where: {
        rut: rut,
      },
    });
    const workerId = workerInfo[0].id;
    const newWorkDay = await Workday.create({ date, startTime, workerId });
    res.json({
      mensaje: "Registro de ingreso creado exitosamente",
      workdayInfo: newWorkDay,
    });
  } catch (err) {
    res.json({
      mensaje: "Algo salió mal al crear la nueva jornada",
      errores: err.errors,
    });
  }
};

export const checkOut = async (req, res) => {
  try {
    const { date } = req.params;
    const { rut } = req.body;
    const finishTime =
      dayjs().hour() + ":" + dayjs().minute() + ":" + dayjs().second();
    const workerInfo = await Worker.findAll({
      where: {
        rut: rut,
      },
    });
    const workerId = workerInfo[0].id;
    await Workday.update(
      { finishTime },
      { where: { date: date, workerId: workerId } }
    );
    res.json({ mensaje: "Registro de salida creado exitosamente" });
  } catch (err) {
    res.json({
      mensaje: "Algo salió mal al crear la nueva jornada",
      errores: err.errors,
    });
  }
};

export const setAbsent = async (req, res) => {
  try {
    const { date } = req.params;
    const { rut } = req.body;

    const workerInfo = await Worker.findAll({
      where: {
        rut: rut,
      },
    });

    const workerId = workerInfo[0].id;

    await Workday.update(
      { wasAbsent: true },
      { where: { date: date, workerId: workerId } }
    );
    res.json({ mensaje: "Registro de ausencia actualizado exitosamente" });
  } catch (err) {
    res.json({
      mensaje: "Algo salió mal al registrar la ausencia",
      errores: err.errors,
    });
  }
};
