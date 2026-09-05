import { useNavigate } from "react-router-dom";

function RoleSelect() {
  const roles = [
    {
      title: "Super Admin",
      description:
        "Manage documentation sources and maintain the knowledge base.",
      path: "/admin",
    },
    {
      title: "Content Creator",
      description:
        "Generate courses, lessons, and quizzes using AI.",
      path: "/creator",
    },
    {
      title: "Student",
      description:
        "Explore published courses, learn from lessons, and take quizzes.",
      path: "/student",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-slate-500">
            Demo Mode
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Choose Your Role
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-slate-400">
            Explore KnowledgeForge from the perspective of an
            administrator, content creator, or student.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {roles.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-slate-600 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6">
                <span className="text-xl">→</span>
              </div>

              <h2 className="text-2xl font-semibold">
                {role.title}
              </h2>

              <p className="text-slate-400 mt-3 leading-relaxed">
                {role.description}
              </p>

              <button
               onClick={() => navigate(role.path)}
                className="mt-8 w-full rounded-lg bg-white text-slate-950 py-3 font-semibold hover:bg-slate-200 transition"
              >
                Enter Demo
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default RoleSelect;