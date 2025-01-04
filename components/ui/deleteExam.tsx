"use client"

import { createClient } from "@/utils/supabase/client";

type Exam = {
  id: string;
}

const handleDeleteExam = async (examId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('exams').delete().eq('id', examId);
    if (error) {
        console.error("Error deleting exam:", error);
        return;
    }
    window.location.reload();
};

export default function DeleteExam({ exam }: { exam: Exam }) {
    return (
        <button onClick={() => handleDeleteExam(exam.id)} className="bg-red-700 rounded-md p-2 hover:bg-red-800 transition-all duration-300">Delete</button>
    );
}