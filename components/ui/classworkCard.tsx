import { createClient } from "@/utils/supabase/server";
import DeleteButton from "./deleteClasswork";

interface Classwork {
    id: string;
    user_id: string;
    classworkSubject: string;
    classworkTeacher: string;
    classworkTask: string;
    created_at: string;
}
interface NoClassworksProps {
    userId?: string;
}

function NoClassworks({ userId }: NoClassworksProps) {
    return (
        <div className="text-center p-8 bg-zinc-900 rounded-lg border-2 border-zinc-800">
            <h3 className="text-xl font-semibold text-zinc-200 mb-2">No Classworks Found</h3>
            <p className="text-zinc-400 mb-4">You haven't added any classworks yet.</p>
            {userId && (
                <p className="text-sm text-zinc-500">
                    Debug info: User ID = {userId}
                </p>
            )}
        </div>
    );
}

export default async function ClassworkCard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return <div>Please log in to view classworks.</div>;

    // Let's add some debug logging
    console.log("Current user ID:", user.id);

    const { data: classworks, error } = await supabase
        .from('classworks')
        .select('*')
        .eq('user_id', user.id)
        .returns<Classwork[]>();

    // Debug logging for the query results
    console.log("Fetched classworks:", classworks);
    console.log("Query error if any:", error);

    if (error) {
        console.error('Error fetching classworks:', error);
        return <div>Error fetching classworks</div>;
    }

    // Additional check to ensure classworks is not null
    if (!classworks) {
        return <NoClassworks userId={user.id} />;
    }

    return (
        <>
            {classworks.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-2 border-zinc-800 rounded-md">
                        <thead className="hidden md:table-header-group">
                            <tr className="text-center text-zinc-400 font-bold text-sm uppercase tracking-wider">
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Teacher</th>
                                <th className="px-4 py-2">Tasks</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-zinc-900 divide-y divide-white/10 text-white text-sm">
                            {classworks.map((classwork) => (
                                <>
                                    {/* Mobile view */}
                                    <tr className="md:hidden block bg-zinc-900 mb-4 p-4 rounded-lg" key={`mobile-${classwork.id}`}>
                                        <td className="block mb-2">
                                            <span className="font-bold text-zinc-400">Date:</span> {classwork.created_at}
                                        </td>
                                        <td className="block mb-2">
                                            <span className="font-bold text-zinc-400">Subject:</span> {classwork.classworkSubject}
                                        </td>
                                        <td className="block mb-2">
                                            <span className="font-bold text-zinc-400">Teacher:</span> {classwork.classworkTeacher}
                                        </td>
                                        <td className="block mb-2">
                                            <span className="font-bold text-zinc-400">Tasks:</span> {classwork.classworkTask}
                                        </td>
                                        <td className="block">
                                            <DeleteButton id={classwork.id} />
                                        </td>
                                    </tr>
  
                                    {/* Desktop view */}
                                    <tr
                                        className="hidden md:table-row text-center hover:bg-zinc-800 transition-all duration-300"
                                        key={`desktop-${classwork.id}`}
                                    >
                                        <td className="px-4 py-2 w-20">{classwork.created_at}</td>
                                        <td className="px-4 py-2 w-20">{classwork.classworkSubject}</td>
                                        <td className="px-4 py-2 w-20">{classwork.classworkTeacher}</td>
                                        <td className="px-4 py-2 text-left w-56">{classwork.classworkTask}</td>
                                        <td className="px-4 py-2">
                                            <DeleteButton id={classwork.id} />
                                        </td>
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <NoClassworks userId={user.id} />
            )}
        </>
    );
}