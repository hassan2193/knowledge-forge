import { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function Sources() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data.articles || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load sources");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Group documents by source
  const sourceMap = {};

  articles.forEach((article) => {
    if (!sourceMap[article.source]) {
      sourceMap[article.source] = [];
    }

    sourceMap[article.source].push(article);
  });

  const sources = Object.entries(sourceMap);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <p className="text-sm text-slate-500 uppercase tracking-wider select-none">
              Super Admin
            </p>

            <h1 className="text-3xl font-bold mt-2 select-none">
              Sources
            </h1>

            <p className="text-slate-400 mt-2 select-none">
              Manage your documentation sources.
            </p>
          </div>

          <button
            className="px-5 py-3 rounded-lg bg-white text-slate-950 font-semibold hover:bg-slate-200 transition cursor-pointer"
          >
            + Add Documentation
          </button>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-slate-400">
            Loading sources...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-900 bg-red-950/30 p-5 text-red-400">
            {error}
          </div>
        )}

        {/* Sources */}
        {!loading && !error && (
          <>
            <p className="text-slate-400 mb-5 select-none">
              {sources.length} sources
            </p>

            <div className="grid md:grid-cols-2 gap-5">

              {sources.map(([source, documents]) => (
                <div
                  key={source}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold truncate select-none">
                        {source}
                      </h2>

                      <p className="text-sm text-slate-500 mt-2 select-none">
                        Documentation source
                      </p>
                    </div>

                    <span className="shrink-0 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm select-none">
                      {documents.length} docs
                    </span>

                  </div>

                  <div className="mt-6">
                    <span className="text-sm text-slate-500 select-none">
                      {documents.length === 1
                        ? "1 document indexed"
                        : `${documents.length} documents indexed`}
                    </span>
                  </div>

                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Sources;