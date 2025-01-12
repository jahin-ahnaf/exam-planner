"use client"

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Sort() {
    const [isOpen, setIsOpen] = useState(false);
    const supabase = createClient();

    function toggleSort() {
        setIsOpen(!isOpen);
    }

    async function sortDate() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: classworks, error } = await supabase
            .from('classworks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error sorting by date:', error);
            return;
        }

        // Refresh the page to show sorted results
        window.location.reload();
    }

    async function sortType() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: classworks, error } = await supabase
            .from('classworks')
            .select('*')
            .eq('user_id', user.id)
            .order('task_type', { ascending: true });

        if (error) {
            console.error('Error sorting by type:', error);
            return;
        }

        // Refresh the page to show sorted results
        window.location.reload();
    }

    return (
        <div className="flex flex-col gap-2">
            <div onClick={toggleSort} className="w-32 flex p-2 bg-zinc-900 rounded-lg border-2 border-zinc-800 gap-5 justify-center items-center cursor-pointer hover:bg-zinc-800 transition-all duration-300">
                <p className="text-white text-sm">Sort by</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div onClick={sortDate} className="w-40 flex p-2 bg-zinc-900 rounded-lg border-2 border-zinc-800 gap-5 justify-center items-center cursor-pointer hover:bg-zinc-800 transition-all duration-300 transform translate-y-0">
                    <p className="text-white text-sm">Sort by Date</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                <div onClick={sortType} className="w-40 flex p-2 bg-zinc-900 rounded-lg border-2 border-zinc-800 gap-5 justify-center items-center cursor-pointer hover:bg-zinc-800 transition-all duration-300 transform translate-y-0">
                    <p className="text-white text-sm">Sort by Type</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}