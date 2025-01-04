import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let time = new Date().getHours();

  return (
    <>
      <div className="flex flex-col gap-2 text-center mt-40">
        <h1 className="text-2xl font-bold">Good {time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening"}, {user.email}</h1>
        <h2 className="text-lg font-medium">What would you like to do today?</h2>

        <div className="block mt-10 grid gap-2 cursor-pointer">
          <div className="flex justify-between gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-md p-5 items-center w-full hover:bg-zinc-200 hover:dark:bg-zinc-800 transition-all duration-300">
            <div className="block text-left">
              <h2 className="text-lg font-medium">Checkout your tasks</h2>
              <p className="text-sm text-muted-foreground">View and manage your tasks</p>
            </div>
            <div className="block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2d7af7" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
            </div>
          </div>

          <Link href="/protected/exams" className="flex justify-between gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-md p-5 items-center w-full hover:bg-zinc-200 hover:dark:bg-zinc-800 transition-all duration-300">
            <div className="block text-left">
              <h2 className="text-lg font-medium">Plan your exams</h2>
              <p className="text-sm text-muted-foreground">Plan your exams and get ready for your exams</p>
            </div>
            <div className="block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#32ba5b" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>
          </Link>

          <div className="flex justify-between gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-md p-5 items-center w-full hover:bg-zinc-200 hover:dark:bg-zinc-800 transition-all duration-300">
            <div className="block text-left">
              <h2 className="text-lg font-medium">See payments</h2>
              <p className="text-sm text-muted-foreground">View your payments</p>
            </div>
            <div className="block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fc7f03" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
