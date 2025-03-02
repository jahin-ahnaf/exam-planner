"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct import

interface Exam {
  id: string;
  exam_date: string;
  exam_name: string;
  exam_type: string;
  marks: number;
  total_marks: number;
  grade: string;
}

const ExportPDFButton = ({ exams }: { exams: Exam[] }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Student Exam Report", 14, 20);

    // Define table columns
    const tableColumn = ["Exam Date", "Subject", "Exam Type", "Marks", "Total Marks", "Grade"];
    const tableRows: any[] = [];

    // Add exam data to table
    exams.forEach((exam) => {
      tableRows.push([
        exam.exam_date,
        exam.exam_name,
        exam.exam_type,
        exam.marks.toString(),
        exam.total_marks.toString(),
        exam.grade,
      ]);
    });

    // ✅ Correct way to generate table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    // Save the PDF
    doc.save("Exam_Report.pdf");
  };

  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={exportToPDF}
    >
      Export as PDF
    </button>
  );
};

export default ExportPDFButton;
