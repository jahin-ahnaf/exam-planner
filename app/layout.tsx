import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Study Planner",
  description: "The best study management tool for students",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
                <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center p-3 px-5 text-sm">
                  <div className="flex flex-col md:flex-row gap-5 items-center font-semibold w-full md:w-auto">
                    <Link href={"/"} className="text-lg mb-2 md:mb-0 hover:text-blue-400 transition-colors invisible md:visible">Study Planner</Link>

                    {/* Mobile Menu */}
                    <div className="md:hidden w-full fixed">
                      <details className="w-full group">
                        
                        <summary className="list-none bg-zinc-100 dark:bg-zinc-800/30 backdrop-blur-md p-3 rounded-lg text-center cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700/30 transition-all duration-300 flex items-center justify-between gap-2">
                        <h2 className="text-black ml-5 dark:text-white"><a href={"/"}>Study Planner</a></h2>
                        <div className="flex items-center gap-1 mr-5">
                          Menu
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          </div>
                        </summary>
                        <div className="absolute right-0 mt-5 mx-4 flex flex-col gap-2 bg-zinc-200 dark:bg-zinc-800/95 backdrop-blur-xl rounded-lg p-3 shadow-lg border border-zinc-700/50 transition-all duration-300 ease-in-out transform origin-top group-open:translate-y-0 group-open:opacity-100 group-open:scale-100 group-closed:translate-y-[-10px] group-closed:opacity-0 group-closed:scale-95 group-closed:pointer-events-none">
                          <Link
                            className="w-full text-center hover:text-black hover:bg-white/90 rounded-md p-3 transition-all duration-300 flex items-center justify-center gap-2"
                            href="/protected/tasks"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Tasks
                          </Link>
                          <Link
                            className="w-full text-center hover:text-black hover:bg-white/90 rounded-md p-3 transition-all duration-300 flex items-center justify-center gap-2"
                            href="/protected/exams"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Exams
                          </Link>
                          <a
                            className="w-full text-center hover:text-black hover:bg-white/90 rounded-md p-3 transition-all duration-300 flex items-center justify-center gap-2"
                            href="#"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Payments
                          </a>
                          <div className="mt-2 pt-2 border-t border-zinc-700/50">
                            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-wrap justify-center md:flex-nowrap items-center gap-2 font-medium w-full md:w-auto">
                      <Link className="w-full md:w-auto text-center hover:bg-zinc-200 dark:hover:text-black hover:bg-zinc-200 dark:hover:bg-white rounded-md p-2 transition-all duration-300" href="/protected/tasks">Tasks</Link>
                      <Link className="w-full md:w-auto text-center hover:bg-zinc-200 dark:hover:text-black hover:bg-zinc-200 dark:hover:bg-white rounded-md p-2 transition-all duration-300" href="/protected/exams">Exams</Link>
                      <a className="w-full md:w-auto text-center hover:bg-zinc-200 dark:hover:text-black hover:bg-zinc-200 dark:hover:bg-white rounded-md p-2 transition-all duration-300" href="#">Payments</a>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 hidden md:block">
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5 mt-40 md:mt-20">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <div>
                  <a className="text-md hover:text-lg transition-all duration-300 cursor-pointer" target="_blank" href="https://github.com/jahin-ahnaf/exam-planner">Wanna contribute?</a>
                </div>
                <p>
                  Powered by{" "}
                  <a
                    href="https://www.youtube.com/@jahinahnaf"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    CTRL
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
