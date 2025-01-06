import ClassworkCard from "@/components/ui/classworkCard";

export default async function TasksPage() {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <div className="block mt-5 grid gap-2">
                <h1 className="text-lg font-medium">Classworks</h1>
                <ClassworkCard />
            </div>
        </div>
    );
}