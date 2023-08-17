import { Workday } from "../models/Workday.js";
import { Woker } from "../models/Worker.js";
import dayjs from "dayjs";

export const checkIn = async (req, res) => {
  try {
    const { date } = req.params;
    const { rut } = req.body;
    const checkInHour =
      dayjs().hour() + ":" + dayjs().minute() + ":" + dayjs().second();

    const workerInfo = await Woker.findAll({
      where: {
        rut: rut,
      },
    });
    const workerId = workerInfo[0].id;
    const newWorkDay = await Workday.create({ date, checkInHour, workerId });
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
    const checkoutHour =
      dayjs().hour() + ":" + dayjs().minute() + ":" + dayjs().second();
    const workerInfo = await Woker.findAll({
      where: {
        rut: rut,
      },
    });
    const workerId = workerInfo[0].id;
    await Workday.update(
      { checkoutHour },
      { where: { date: date, id: workerId } }
    );
    res.json({ mensaje: "Registro de salida creado exitosamente" });
  } catch (err) {
    res.json({
      mensaje: "Algo salió mal al crear la nueva jornada",
      errores: err.errors,
    });
  }
};
