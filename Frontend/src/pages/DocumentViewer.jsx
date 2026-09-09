import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data.article);
      } catch (err) {
        console.error(err);
        setError("Failed to load document");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading document...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">
            {error || "Document not found"}
          </p>

          <button
            onClick={() => navigate("/admin/knowledge-base")}
            className="px-5 py-2 rounded-lg bg-white text-slate-950 font-medium cursor-pointer"
          >
            Back to Knowledge Base
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/knowledge-base")}
          className="text-sm text-slate-400 hover:text-white mb-8 cursor-pointer"
        >
          ← Back to Knowledge Base
        </button>

        {/* Header */}
        <div className="border-b border-slate-800 pb-8">

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-slate-500">

            <span>
              Source: {article.source}
            </span>

            <span>•</span>

            <span>
              Added:{" "}
              {new Date(article.created_at).toLocaleDateString()}
            </span>

            <span>•</span>

            <span>
              {article.content_length.toLocaleString()} characters
            </span>

          </div>

        </div>

        {/* Document Content */}
        <article className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-8">

          <div className="whitespace-pre-wrap text-slate-300 leading-8 text-[15px]">
            {article.content}
          </div>

        </article>

      </div>

    </div>
  );
}

export default DocumentViewer;