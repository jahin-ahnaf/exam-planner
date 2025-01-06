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
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 fixed top-0 left-0 right-0 z-50">
                <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center p-3 px-5 text-sm">
                  <div className="flex flex-col md:flex-row gap-5 items-center font-semibold w-full md:w-auto">
                    <Link href={"/"} className="text-lg mb-2 md:mb-0">Study Planner</Link>
                    
                    {/* Mobile Menu */}
                    <div className="md:hidden w-full">
                      <details className="w-full">
                        <summary className="list-none bg-zinc-800 p-2 rounded-md text-center cursor-pointer hover:bg-zinc-700 transition-all duration-300">
                          Menu
                        </summary>
                        <div className="mt-2 flex flex-col gap-2 bg-zinc-800 rounded-md p-2">
                          <Link className="w-full text-center hover:text-black hover:bg-white rounded-md p-2 transition-all duration-300" href="/protected/tasks">Tasks</Link>
                          <Link className="w-full text-center hover:text-black hover:bg-white rounded-md p-2 transition-all duration-300" href="/protected/exams">Exams</Link>
                          <a className="w-full text-center hover:text-black hover:bg-white rounded-md p-2 transition-all duration-300" href="#">Payments</a>
                        </div>
                      </details>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex flex-wrap justify-center md:flex-nowrap items-center gap-2 font-medium w-full md:w-auto">
                      <Link className="w-full md:w-auto text-center hover:text-black hover:bg-white rounded-md p-2 transition-all duration-300" href="/protected/tasks">Tasks</Link>
                      <Link className="w-full md:w-auto text-center hover:text-black hover:bg-white rounded-md p-2 transition-all duration-300" href="/protected/exams">Exams</Link>
                      <a className="w-full md:w-auto text-center hover:text-black hover:bg-white rounded-md p-2 transition-all duration-300" href="#">Payments</a>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5 mt-40 md:mt-20">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
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
