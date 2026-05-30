import ExcelJS from "exceljs";

import { Application } from "../models/application.model.js";

export const exportApplicationsReport = async () => {
  const applications = await Application.find()
    .populate("citizenId", "firstName lastName")
    .populate("schemeId", "schemeName");

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Applications");

  worksheet.columns = [
    {
      header: "Application Number",

      key: "applicationNumber",

      width: 25,
    },

    {
      header: "Applicant",

      key: "applicant",

      width: 25,
    },

    {
      header: "Scheme",

      key: "scheme",

      width: 25,
    },

    {
      header: "Status",

      key: "status",

      width: 20,
    },
  ];

  applications.forEach((application) => {
    worksheet.addRow({
      applicationNumber: application.applicationNumber,

      applicant: `${application.citizenId?.firstName || ""} ${application.citizenId?.lastName || ""}`,

      scheme: application.schemeId?.schemeName,

      status: application.status,
    });
  });

  return workbook;
};
