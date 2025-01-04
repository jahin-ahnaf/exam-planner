"use client"

import ExamModal from "./ui/exam-modal";
import { useState } from "react";



export default function CreateExam() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="bg-zinc-700 rounded-md p-2">Create Exam</button>
      <ExamModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
