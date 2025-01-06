'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
    id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
    const supabase = createClient();
    const router = useRouter();
    
    const handleDelete = async () => {
        try {
            // Add confirmation dialog
            if (!confirm('Are you sure you want to delete this classwork?')) {
                return;
            }

            const { error } = await supabase
                .from('classworks')
                .delete()
                .eq('id', id);
            
            if (error) {
                console.error('Error deleting classwork:', error);
                alert('Failed to delete classwork');
                return;
            }

            // Force a hard refresh of the page
            window.location.reload();
            
            // Also trigger Next.js router refresh for good measure
            router.refresh();
        } catch (err) {
            console.error('Error deleting classwork:', err);
            alert('Failed to delete classwork');
        }
    };

    return (
        <button 
            onClick={(e) => {
                e.preventDefault();
                handleDelete();
            }}
            className="border border-red-800 text-red-800 px-4 py-2 rounded-md hover:bg-red-800 hover:text-white transition-all duration-300"
        >
            Delete
        </button>
    );
}
