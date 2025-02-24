import Signup from "@/app/(auth-pages)/sign-up/page";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-white px-6 mt-10">
      <div className="text-center max-w-2xl bg-zinc-800 p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-white">Study Planner</h1>
        <p className="text-lg text-gray-300 mt-2">
          The study management tool for students!
        </p>
        <button className="mt-6 bg-zinc-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-zinc-600 transition">
          <a href="http://studyplannerbd.vercel.app/protected/">Get Started</a>
        </button>
      </div>
    </section>
  );
}