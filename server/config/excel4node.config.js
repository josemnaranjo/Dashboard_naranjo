import xl from "excel4node";

const wb = new xl.Workbook();

const colStyle = wb.createStyle({
  font: {
    name: "Arial",
    color: "#000000",
    size: 14,
  },
});

const contentStyle = wb.createStyle({
  font: {
    name: "Arial",
    color: "#494949",
    size: 12,
  },
});

export { wb, colStyle, contentStyle };
