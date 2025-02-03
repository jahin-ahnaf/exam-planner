"use client"

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

interface ExamModalProps {
    show: boolean;
    onClose: () => void;
}

export default function ExamModal({ show, onClose }: ExamModalProps) {
    const supabase = createClient();
    const [examDate, setExamDate] = useState("");
    const [examSubject, setExamSubject] = useState("");
    const [examType, setExamType] = useState("");
    const [examMarks, setExamMarks] = useState(0);
    const [examTotalMarks, setExamTotalMarks] = useState(0);

    if (!show) return null;

    const handleCreateExam = async () => {
        // Validate required fields
        if (!examDate || !examSubject || !examType || !examMarks || !examTotalMarks) {
            console.error("All fields are required");
            return;
        }

        const user = await supabase.auth.getUser();
        if (!user.data.user) {
            console.error("User not found");
            return;
        }

        const Grade = examMarks / examTotalMarks * 100;
        let examGrade = "";
        if (Grade >= 80) {
            examGrade = "A+";
        } else if (Grade >= 70) {
            examGrade = "A";
        } else if (Grade >= 60) {
            examGrade = "A-";
        } else if (Grade >= 50) {
            examGrade = "B";
        } else {
            examGrade = "F";
        }

        const { data, error } = await supabase.from('exams').insert({
            exam_date: new Date(examDate).toISOString().split('T')[0], // Format date as YYYY-MM-DD
            exam_name: examSubject,
            exam_type: examType,
            marks: examMarks,
            total_marks: examTotalMarks,
            grade: examGrade,
            user_id: user.data.user.id,
        });

        if (error) {
            console.error("Error creating exam:", error.message);
        } else {
            console.log("Exam created");
            window.location.reload();
            onClose(); // Close modal on success
        }
    }

    return (
        <>
            <div className="absolute transition-all duration-300 bg-black opacity-50 top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col gap-2"></div>
            <div className="bg-zinc-900 rounded-md p-5 w-full h-full flex flex-col gap-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 items-center justify-center ">
                <h1 className="text-2xl font-bold">Create Exam</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="exam-date">Exam Date</label>
                    <input type="date" id="exam-date" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setExamDate(e.target.value)} />
                    <label htmlFor="exam-subject">Exam Subject</label>
                    <select id="exam-subject" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setExamSubject(e.target.value)}>
                        <option value="Select Subject">Select Subject</option>
                        <option value="Math">Math</option>
                        <option value="Higher Math">Higher Math</option>
                        <option value="Science">Physics</option>
                        <option value="History">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
                    </select>
                    <label htmlFor="exam-type">Exam Type</label>
                    <select id="exam-type" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setExamType(e.target.value)}>
                        <option value="Select Exam Type">Select Exam Type</option>
                        <option value="Quiz">Quiz</option>
                        <option value="CT">CT</option>
                        <option value="Model Test">Model Test</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Practical">Practical</option>
                        <option value="Pre-Test">Pre-Test</option>
                        <option value="Test">Test</option>
                    </select>
                    <label htmlFor="exam-marks">Exam Marks</label>
                    <input type="number" id="exam-marks" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setExamMarks(Number(e.target.value))} />
                    <label htmlFor="exam-total-marks">Total Marks</label>
                    <input type="number" id="exam-total-marks" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setExamTotalMarks(Number(e.target.value))} />
                </div>
                <button className="bg-zinc-700 rounded-md p-2" onClick={handleCreateExam}>Create Exam</button>
                <button className="bg-zinc-700 rounded-md p-2" onClick={onClose}>Close</button>
            </div>
        </>
    );
}