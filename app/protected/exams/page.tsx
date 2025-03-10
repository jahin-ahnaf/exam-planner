import CreateExam from "@/components/create-exam";
import DeleteExam from "@/components/ui/deleteExam";
import { createClient } from "@/utils/supabase/server";
import ExportPDFButton from "@/components/ExportPDFButton";

interface Exam {
  id: string;
  exam_date: string;
  exam_name: string;
  exam_type: string;
  marks: number;
  total_marks: number;
  grade: string;
}

export default async function ExamsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return <div>Please login to view exams</div>;
  }
  const { data: exams, error } = await supabase.from('exams').select('*').eq('user_id', user.id);
  if (error) {
    console.error('Error fetching exams:', error);
    return <div>Error fetching exams</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Exams</h1>
      <div className="flex gap-4 mt-5">
        <CreateExam />
        <ExportPDFButton exams={exams} />
      </div>

      {exams.length > 0 ? (
        <div id="reportCard" className="mt-5 overflow-x-auto">
          <table className="min-w-full border-2 border-zinc-800 rounded-md">
            <thead className="hidden md:table-header-group">
              <tr className="text-center text-zinc-400 font-bold text-sm uppercase tracking-wider">
                <th className="px-4 py-2">Exam Date</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Exam Type</th>
                <th className="px-4 py-2">Marks</th>
                <th className="px-4 py-2">Total Marks</th>
                <th className="px-4 py-2">Grade</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-white/10 text-white text-sm">
              {exams.map((exam) => (
                <tr
                  className="text-center hover:bg-zinc-800 transition-all duration-300"
                  key={exam.id}
                >
                  <td className="px-4 py-2">{exam.exam_date}</td>
                  <td className="px-4 py-2">{exam.exam_name}</td>
                  <td className="px-4 py-2">{exam.exam_type}</td>
                  <td className="px-4 py-2">{exam.marks}</td>
                  <td className="px-4 py-2">{exam.total_marks}</td>
                  <td className="px-4 py-2">{exam.grade}</td>
                  <td className="px-4 py-2">
                    <DeleteExam exam={exam} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No exams found</p>
      )}
    </div>
  );
}
