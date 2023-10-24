import { Worker } from "../models/Worker.js";
import { Workday } from "../models/Workday.js";
import { Op } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { wb, colStyle, contentStyle } from "../config/excel4node.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createWorker = async (req, res) => {
  try {
    const { name, lastName, rut, exWorker } = req.body;
    if (exWorker === false) {
      const newWorker = await Worker.create({
        name: name,
        lastName: lastName,
        rut: rut,
      });
      res.json({ mensaje: "Trabajador creado exitosamente", newWorker });
    } else {
      const restoreTrabajador = await Trabajador.restore({
        where: { rut: rut },
      });
      res.json({
        mensaje: "Trabajador creado exitosamente",
        restoreTrabajador,
      });
    }
  } catch (err) {
    res.status(500).json({
      mensaje: "Algo salió mal al crear un nuevo trabajador",
      errores: err,
    });
  }
};

export const getAllWorkers = async (req, res) => {
  try {
    const workersInfo = await Worker.findAll();
    res.json(workersInfo);
  } catch (err) {
    res.status(500).json({
      mensaje: "Algo salió mal al obtener los trabajadores de la base de datos",
      errores: err,
    });
  }
};

export const getOneWorker = async (req, res) => {
  try {
    const { rut } = req.params;
    const workerInfo = await Worker.findAll({
      where: {
        rut: rut,
      },
    });
    res.json(workerInfo);
  } catch (err) {
    res.status(500).json({
      mensaje: "Algo salió mal al obtener el trabajador de la base de datos",
      errores: err,
    });
  }
};

export const deleteOneWorker = async (req, res) => {
  try {
    const { rut } = req.params;
    const workerInfo = await Worker.findAll({ where: { rut: rut } });
    const workerId = workerInfo[0].id;

    await Workday.destroy({
      where: {
        workerId: workerId,
      },
    });
    await Worker.destroy({
      where: {
        rut: rut,
      },
    });
    res.json({ mensaje: "Trabajador eliminado de la base de datos" });
  } catch (err) {
    res.status(500).json({
      mensaje:
        "Algo salió mal al intentar borrar el trabajador de la base de datos",
      errores: err,
    });
  }
};

export const updateWorker = async (req, res) => {
  try {
    const { name, lastName } = req.body;
    const { rut } = req.params;
    await Worker.update(
      { name, lastName, rut },
      {
        where: {
          rut: rut,
        },
      }
    );
    res.json({ mensaje: "Datos del trabajador actualizados" });
  } catch (err) {
    res.status(500).json({
      mensaje:
        "Algo salió mal al intentar actualizar el trabajador de la base de datos",
      errores: err,
    });
  }
};

export const getAllWorkersOfAWorday = async (req, res) => {
  try {
    const { date } = req.params;
    const workdayInfo = await Workday.findAll({
      where: {
        date: date,
      },
      order: [["workerId", "ASC"]],
      include: Worker,
    });
    res.json({ workdayInfo });
  } catch (err) {
    res.status(500).json({
      mensaje: "Algo salió mal al intentar obtener la información solicitada",
      errores: err,
    });
  }
};

export const updateLicence = async (req, res) => {
  try {
    const { licenceStartDate, licenceEndDate } = req.body;
    const { rut } = req.params;

    await Worker.update(
      { licenceStartDate, licenceEndDate, workerHasLicence: true },
      {
        where: {
          rut: rut,
        },
      }
    );
    res.json({ message: "Inicio y termino de licencia médica actualizada" });
  } catch (err) {
    res.status(500).json({
      mensaje: "Algo salió mal al intentar ingresar la licencia médica",
      errores: err,
    });
  }
};

export const resetLicence = async (req, res) => {
  try {
    const { rut } = req.body;
    await Worker.update(
      {
        licenceStartDate: null,
        licenceEndDate: null,
        workerHasLecence: false,
      },
      { where: { rut: rut } }
    );
    res.json({ mensaje: "Licencia reestablecida" });
  } catch (err) {
    res.status(500).json({
      error: "Algo salió mal al momento de actualizar la licencia",
      err,
    });
  }
};

export const getWorkersWithLicence = async (req, res) => {
  try {
    const workersInfo = await Worker.findAll({
      where: {
        workerHasLicence: true,
      },
    });
    res.json(workersInfo);
  } catch (err) {
    res.status(500).json({
      error: "Algo salió mal al obtener los trabajadores con licencia",
      err,
    });
  }
};

export const getMonthReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const monthInfo = await Workday.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["workerId", "ASC"]],
      include: [
        {
          model: Worker,
          paranoid: false,
        },
      ],
      paranoid: false,
    });
    res.json(monthInfo);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Algo salió mal al obtener la información", err });
  }
};

export const downloadMonthReport = async (req, res) => {
  try {
    const { startDate, endDate, month } = req.body;
    let fileName = "Informe_de_Asistencias" + "_" + month;
    const ws = wb.addWorksheet(fileName);

    ws.cell(1, 1).string("Fecha").style(colStyle);
    ws.cell(1, 2).string("Hora Inicio").style(colStyle);
    ws.cell(1, 3).string("Hora Termino").style(colStyle);
    ws.cell(1, 4).string("Nombre").style(colStyle);
    ws.cell(1, 5).string("Apellido").style(colStyle);
    ws.cell(1, 6).string("Rut").style(colStyle);
    ws.cell(1, 7).string("Inicio Licencia").style(colStyle);
    ws.cell(1, 8).string("Fin Licencia").style(colStyle);

    const monthInfo = await Workday.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["workerId", "ASC"]],
      include: [
        {
          model: Worker,
          paranoid: false,
        },
      ],
      paranoid: false,
    });
    let line = 2;
    monthInfo.forEach((datoActual) => {
      ws.cell(line, 1).string(datoActual.date).style(contentStyle);
      ws.cell(line, 2).string(datoActual.startTime).style(contentStyle);
      ws.cell(line, 3).string(datoActual.finishTime).style(contentStyle);
      ws.cell(line, 4).string(datoActual.Worker.name).style(contentStyle);
      ws.cell(line, 5).string(datoActual.Worker.lastName).style(contentStyle);
      ws.cell(line, 6).string(datoActual.Worker.rut).style(contentStyle);
      ws.cell(line, 7)
        .string(datoActual.Worker.licenceStartDate)
        .style(contentStyle);
      ws.cell(line, 8)
        .string(datoActual.Worker.licenceEndDate)
        .style(contentStyle);
      line++;
    });

    path.join(__dirname, fileName + ".xlsx");
    wb.write(fileName + ".xlsx", res);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Algo salió mal al obtener la información", err });
  }
};
