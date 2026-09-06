import { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function AdminDashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();

        setArticles(data.articles || []);
      } catch (err) {
        setError("Failed to load documentation");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get unique documentation sources/domains
  const uniqueSources = new Set(
    articles.map((article) => article.source)
  ).size;

  // Show latest 5 documents
  const recentArticles = articles.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-950 p-6">

        <h1 className="text-xl font-bold mb-10 select-none">
          KnowledgeForge
        </h1>

        <nav className="space-y-2">

          <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800 cursor-pointer">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-900 cursor-pointer">
            Knowledge Base
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-900 cursor-pointer">
            Sources
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-900 cursor-pointer">
            Analytics
          </button>

        </nav>
      </aside>


      {/* Main Content */}
      <main className="ml-64 p-8">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-10">

            <p className="text-sm text-slate-500 uppercase tracking-wider select-none">
              Super Admin
            </p>

            <h2 className="text-3xl font-bold mt-2 select-none">
              Dashboard
            </h2>

            <p className="text-slate-400 mt-2 select-none">
              Manage your documentation and knowledge base.
            </p>

          </div>


          {/* Loading */}
          {loading && (
            <div className="text-slate-400">
              Loading knowledge base...
            </div>
          )}


          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-900 bg-red-950/30 p-5 text-red-400">
              {error}
            </div>
          )}


          {/* Dashboard */}
          {!loading && !error && (
            <>

              {/* Stats */}
              <div className="grid md:grid-cols-2 gap-6">

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <p className="text-slate-400 select-none">
                    Sources
                  </p>

                  <h3 className="text-3xl font-bold mt-2 select-none">
                    {uniqueSources}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 select-none">
                    Documentation sources
                  </p>
                </div>


                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <p className="text-slate-400 select-none">
                    Documents
                  </p>

                  <h3 className="text-3xl font-bold mt-2 select-none">
                    {articles.length}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 select-none">
                    Indexed documents
                  </p>
                </div>

              </div>


              {/* Recent Sources */}
              <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-semibold select-none">
                    Recent Documentation
                  </h3>

                  <span className="text-sm text-slate-500 select-none">
                    {articles.length} total
                  </span>

                </div>


                <div className="mt-6 space-y-4">

                  {recentArticles.map((article) => (

                    <div
                      key={article.id}
                      className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-none"
                    >

                      <div className="min-w-0">

                        <p className="font-medium truncate select-none">
                          {article.title}
                        </p>

                        <p className="text-sm text-slate-500 mt-1 select-none">
                          {article.source}
                        </p>

                      </div>


                      <span className="text-sm text-slate-400 ml-6 select-none">
                        ✓ Ready
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </>
          )}

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;