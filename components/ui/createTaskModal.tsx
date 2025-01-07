"use client"

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface CreateTaskModalProps {
    show: boolean;
    onClose: () => void;
}

export default function CreateTaskModal({ show, onClose }: CreateTaskModalProps) {
    const supabase = createClient();
    const [taskType, setTaskType] = useState("");
    const [taskSubject, setTaskSubject] = useState("");
    const [taskTeacher, setTaskTeacher] = useState("");
    const [task, setTask] = useState("");

    if (!show) return null;

    const handleCreateTask = async () => {
        // Validate required fields
        if (!taskType || !taskSubject || !taskTeacher || !task) {
            console.error("All fields are required");
            return;
        }

        const user = await supabase.auth.getUser();
        if (!user.data.user) {
            console.error("User not found");
            return;
        }
        if (taskType === "Classwork") {
        const { data, error } = await supabase.from('classworks').insert({
            classworkSubject: taskSubject,
            classworkTask: task,
            classworkTeacher: taskTeacher,
            user_id: user.data.user.id,
            created_at: new Date().toISOString(), // Add created_at timestamp
        });

        if (error) {
            console.error("Error creating task:", error.message);
        } else {
            console.log("Task created");
            window.location.reload();
                onClose(); // Close modal on success
            }
        }
    }

    return (
        <>
            <div className="absolute transition-all duration-300 bg-black opacity-50 top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col gap-2"></div>
            <div className="bg-zinc-900 rounded-md p-5 w-full h-full flex flex-col gap-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 items-center justify-center ">
                <h1 className="text-2xl font-bold">Create Task</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="task-type">Task Type</label>
                    <select id="task-type" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setTaskType(e.target.value)}>
                        <option value="Select Task Type">Select Task Type</option>
                        <option value="Classwork">Classwork</option>
                        <option value="Homework">Homework</option>
                    </select>
                    <label htmlFor="task-subject">Subject</label>
                    <select id="task-subject" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setTaskSubject(e.target.value)}>
                        <option value="Select Subject">Select Subject</option>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="English">English</option>
                    </select>
                    <label htmlFor="task-teacher">Teacher</label>
                    <input type="text" id="task-teacher" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setTaskTeacher(e.target.value)} />
                    <label htmlFor="task-description">Task Description</label>
                    <textarea id="task-description" className="bg-zinc-700 rounded-md p-2" onChange={(e) => setTask(e.target.value)} />
                </div>
                <button disabled={!taskType || !taskSubject || !taskTeacher || !task} className="bg-zinc-700 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleCreateTask}>Create Task</button>
                <button className="bg-zinc-700 rounded-md p-2" onClick={onClose}>Close</button>
            </div>
        </>
    );
}