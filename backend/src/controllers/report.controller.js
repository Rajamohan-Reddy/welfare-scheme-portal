import { exportApplicationsReport } from "../services/report.service.js";

export const exportApplications = async (req, res) => {
  const workbook = await exportApplicationsReport();

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=applications-report.xlsx",
  );

  await workbook.xlsx.write(res);

  res.end();
};
