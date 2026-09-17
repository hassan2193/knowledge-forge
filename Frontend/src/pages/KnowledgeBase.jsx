import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function KnowledgeBase() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [chunking, setChunking] = useState(false);
  const [embedding, setEmbedding] = useState(false);

  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data.articles || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load knowledge base");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Unique sources
  const sources = [...new Set(
    articles.map((article) => article.source)
  )];

  // Search + source filter
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.source.toLowerCase().includes(search.toLowerCase());

    const matchesSource =
      selectedSource === "All" ||
      article.source === selectedSource;

    return matchesSearch && matchesSource;
  });

  // Chunk new documents
  const handleChunkDocuments = async () => {
  try {
    setChunking(true);
    setActionMessage("");
    setActionError("");

    const response = await api.post("/knowledge/chunks");

    const { processedDocuments, totalChunks } = response.data;

    if (processedDocuments === 0) {
      setActionMessage("No new documents to chunk.");
    } else {
      setActionMessage(
        `${processedDocuments} document${
          processedDocuments > 1 ? "s" : ""
        } chunked successfully. ${totalChunks} new chunks created.`
      );
    }
  } catch (err) {
    console.error(err);

    setActionError(
      err.response?.data?.message ||
      "Failed to chunk documents."
    );
  } finally {
    setChunking(false);
  }
};

  // Generate embeddings
  const handleGenerateEmbeddings = async () => {
  try {
    setEmbedding(true);
    setActionMessage("");
    setActionError("");

    const response = await api.post("/knowledge/embeddings");

    const { processedChunks } = response.data;

    if (processedChunks === 0) {
      setActionMessage("No new embeddings to generate.");
    } else {
      setActionMessage(
        `${processedChunks} embedding${
          processedChunks > 1 ? "s" : ""
        } generated successfully.`
      );
    }
  } catch (err) {
    console.error(err);

    setActionError(
      err.response?.data?.message ||
      "Failed to generate embeddings."
    );
  } finally {
    setEmbedding(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-slate-500 uppercase tracking-wider select-none">
            Super Admin
          </p>

          <h1 className="text-3xl font-bold mt-2 select-none">
            Knowledge Base
          </h1>

          <p className="text-slate-400 mt-2 select-none">
            Browse and manage your indexed documentation.
          </p>
        </div>

        {/* Processing Actions */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>
              <h2 className="text-lg font-semibold">
                Knowledge Processing
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Process newly imported documentation in stages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleChunkDocuments}
                disabled={chunking}
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {chunking ? "Chunking..." : "Chunk Documents"}
              </button>

              <button
                onClick={handleGenerateEmbeddings}
                disabled={embedding}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {embedding
                  ? "Generating..."
                  : "Generate Embeddings"}
              </button>

            </div>

          </div>

          {/* Success Message */}
          {actionMessage && (
            <div className="mt-4 rounded-xl border border-emerald-900 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-400">
              {actionMessage}
            </div>
          )}

          {/* Error Message */}
          {actionError && (
            <div className="mt-4 rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {actionError}
            </div>
          )}

        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            type="text"
            placeholder="Search documentation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-slate-600"
          />

          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none cursor-pointer"
          >
            <option value="All">All Sources</option>

            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

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

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Summary */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-slate-400">
                Showing{" "}
                <span className="text-white font-medium">
                  {filteredArticles.length}
                </span>{" "}
                documents
              </p>

              <p className="text-sm text-slate-500">
                {sources.length} sources
              </p>
            </div>

            {/* Documents */}
            <div className="space-y-4">

              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() =>
                    navigate(`/admin/knowledge-base/${article.id}`)
                  }
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-600 hover:bg-slate-900 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="min-w-0">

                      <h2 className="font-semibold text-lg truncate select-none">
                        {article.title}
                      </h2>

                      <p className="text-sm text-slate-500 mt-2 select-none">
                        {article.source}
                      </p>

                    </div>

                    <div className="flex items-center gap-4 shrink-0">

                      <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 select-none">
                        Indexed
                      </span>

                      <span className="text-sm text-slate-500 select-none">
                        {new Date(
                          article.created_at
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* No Results */}
            {filteredArticles.length === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-10 text-center">
                <p className="text-slate-400">
                  No documents found.
                </p>
              </div>
            )}

          </>
        )}

      </div>
    </div>
  );
}

export default KnowledgeBase;