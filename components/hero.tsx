export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-white px-6 -mt-10 md:mt-10">
      <div className="text-center max-w-2xl dark:bg-zinc-800 p-36 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold dark:text-white text-black">Study Planner</h1>
        <p className="text-lg dark:text-gray-300 mt-2 text-zinc-500">
          The study management tool for students!
        </p>
        <button className="mt-6 border-2 border-black dark:border-white dark:bg-zinc-7=800 dark:text-white text-black dark:hover:text-black hover:bg-zinc-900 hover:text-white px-6 py-3 rounded-xl shadow-md dark:hover:bg-white transition">
          <a href="http://studyplannerbd.vercel.app/protected/">Get Started</a>
        </button>
        <div className="dark:invisible visible fixed right-5 bottom-5">
          <a href="https://www.producthunt.com/posts/study-planner?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-study&#0045;planner" target="_blank">
            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=908055&theme=light&t=1740410284396" alt="Study&#0032;Planner - Efficient&#0032;way&#0032;to&#0032;keep&#0032;your&#0032;studies&#0032;in&#0032;one&#0032;place&#0033; | Product Hunt" style={{ width: "200px", height: "auto" }} />
          </a>
        </div>
        <div className="dark:visible invisible fixed right-5 bottom-5">
          <a href="https://www.producthunt.com/posts/study-planner?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-study&#0045;planner" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=908055&theme=dark&t=1740413760950" alt="Study&#0032;Planner - Efficient&#0032;way&#0032;to&#0032;keep&#0032;your&#0032;studies&#0032;in&#0032;one&#0032;place&#0033; | Product Hunt" style={{ width: "200px", height: "auto" }} /></a>
        </div>
      </div>
    </section>
  )
}