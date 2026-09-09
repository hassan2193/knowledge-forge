import { useEffect, useState } from "react";
import { getArticles, importDocs } from "../services/api";

function Sources() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
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

  const handleImport = async () => {
    if (!url.trim()) {
      setMessage("Please enter a documentation URL");
      return;
    }

    try {
      setImporting(true);
      setMessage("");

      const data = await importDocs(url.trim());

      if (!data.success) {
        throw new Error(
          data.message || data.error || "Import failed"
        );
      }

      setMessage("Documentation imported successfully!");
      setUrl("");

      // Refresh source list after successful import
      await fetchArticles();

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage(
        err.message || "Failed to import documentation"
      );
    } finally {
      setImporting(false);
    }
  };

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
            onClick={() => setShowModal(true)}
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

      {/* Add Documentation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">

          <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6">

            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-semibold select-none">
                Add Documentation
              </h2>

              <button
                onClick={() => {
                  if (importing) return;

                  setShowModal(false);
                  setUrl("");
                  setMessage("");
                }}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>

            </div>

            {/* Input */}
            <p className="text-sm text-slate-400 mb-3 select-none">
              Documentation URL
            </p>

            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/docs"
              disabled={importing}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-slate-500 disabled:opacity-50"
            />

            {/* Message */}
            {message && (
              <p
                className={`text-sm mt-4 ${
                  message.includes("successfully")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowModal(false);
                  setUrl("");
                  setMessage("");
                }}
                disabled={importing}
                className="px-5 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleImport}
                disabled={importing}
                className="px-5 py-2 rounded-lg bg-white text-slate-950 font-semibold hover:bg-slate-200 cursor-pointer disabled:opacity-50"
              >
                {importing
                  ? "Importing..."
                  : "Import Documentation"}
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default Sources;