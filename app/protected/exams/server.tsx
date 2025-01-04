// This file will handle data fetching on the server-side

import { createClient } from "@/utils/supabase/server";

export default async function ExamsServer({ userId }: { userId: string }) {
    const supabase = await createClient();
    
    const { data: exams, error } = await supabase.from('exams').select('*').eq('user_id', userId);

    if (error) {
        console.error(error);
        return <div>Error loading exams</div>;
    }

    return exams;
}
