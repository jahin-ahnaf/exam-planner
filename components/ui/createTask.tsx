"use client"

import { useState } from "react";
import { Button } from "./button";
import CreateTaskModal from "./createTaskModal";

export default function CreateTaskButton() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button onClick={() => setShowModal(true)} className="bg-blue-500 text-white hover:bg-blue-600 m-4 rounded-full">
                Create Task
            </Button>
            {showModal && <CreateTaskModal show={showModal} onClose={() => setShowModal(false)} />}
        </>
    );
}