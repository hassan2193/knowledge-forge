import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [quizError, setQuizError] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/lessons/${id}`);

        const lessonData = response.data.lesson;

        if (!lessonData) {
          setError("Lesson not found.");
          return;
        }

        const lessonContent = lessonData.lesson_content || {};

        setLesson({
          ...lessonData,
          ...lessonContent,
        });
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load lesson."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const handleGenerateQuiz = async () => {
    try {
      setGeneratingQuiz(true);
      setQuizError("");

      const response = await api.post("/quizzes/generate", {
        lessonId: Number(id),
      });

      const savedQuizId = response.data.savedQuizId;

      if (!savedQuizId) {
        setQuizError(
          "Quiz was generated but no quiz ID was returned."
        );
        return;
      }

      navigate(`/creator/quizzes/${savedQuizId}`);
    } catch (err) {
      console.error(err);

      setQuizError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to generate quiz."
      );
    } finally {
      setGeneratingQuiz(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-white" />

            <p className="font-medium">
              Loading lesson...
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Fetching lesson content.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-sm text-slate-400 hover:text-white transition cursor-pointer"
          >
            ← Go Back
          </button>

          <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-400 hover:text-white transition cursor-pointer"
        >
          ← Back
        </button>

        {/* Lesson Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Content Creator
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {lesson.module || "Generated Lesson"}
          </h1>

          {lesson.description && (
            <p className="text-slate-400 mt-4 leading-7">
              {lesson.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-5">
            {lesson.category && (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {lesson.category}
              </span>
            )}

            {lesson.level && (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {lesson.level}
              </span>
            )}
          </div>
        </div>

        {/* Learning Goal */}
        {lesson.goal && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Learning Goal
            </p>

            <p className="text-slate-300 mt-2 leading-7">
              {lesson.goal}
            </p>
          </div>
        )}

        {/* Topics */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Lesson Content
            </h2>

            {Array.isArray(lesson.topics) && (
              <span className="text-sm text-slate-500">
                {lesson.topics.length} topics
              </span>
            )}
          </div>

          {Array.isArray(lesson.topics) &&
          lesson.topics.length > 0 ? (
            <div className="space-y-4">

              {lesson.topics.map((topic, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                >
                  <div className="flex gap-4">

                    {/* Number */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-semibold text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0 flex-1">

                      {/* Topic Title */}
                      <h3 className="text-lg font-semibold">
                        {topic.title ||
                          `Topic ${index + 1}`}
                      </h3>

                      {/* Actual Lesson Content */}
                      {topic.details && (
                        <p className="text-sm text-slate-400 mt-3 leading-7 whitespace-pre-line">
                          {topic.details}
                        </p>
                      )}

                    </div>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-slate-500">
                No lesson topics available.
              </p>
            </div>
          )}
        </div>

        {/* Quiz */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Assessment
              </p>

              <h2 className="text-xl font-semibold mt-1">
                Test Learner Understanding
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Generate an AI-powered quiz from this lesson.
              </p>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={generatingQuiz}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {generatingQuiz
                ? "Generating Quiz..."
                : "Generate Quiz"}
            </button>

          </div>

          {quizError && (
            <div className="mt-4 rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {quizError}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Lesson;