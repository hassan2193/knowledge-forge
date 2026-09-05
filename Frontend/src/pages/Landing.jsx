function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          KnowledgeForge
        </h1>

        <button className="px-5 py-2 rounded-lg bg-white text-slate-950 font-medium hover:bg-slate-200 transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center px-6 py-28">

        <p className="text-sm uppercase tracking-widest text-slate-400 mb-5">
          AI-Powered Course Authoring
        </p>

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Turn Documentation Into
          <span className="block text-slate-400">
            Powerful Learning Experiences
          </span>
        </h2>

        <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400">
          KnowledgeForge uses AI and Retrieval-Augmented Generation
          to transform technical documentation into structured courses,
          lessons, and quizzes.
        </p>

        <div className="flex justify-center gap-4 mt-10">

          <button className="px-7 py-3 rounded-lg bg-white text-slate-950 font-semibold hover:bg-slate-200 transition">
            Explore KnowledgeForge
          </button>

          <button className="px-7 py-3 rounded-lg border border-slate-700 hover:bg-slate-900 transition">
            View Demo
          </button>

        </div>

      </section>

    </div>
  )
}

export default Landing