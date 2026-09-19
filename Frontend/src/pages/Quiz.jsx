import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/quizzes/${id}`);

        const quizData = response.data.quiz;

        if (!quizData) {
          setError("Quiz not found.");
          return;
        }

        let quizContent =
          quizData.quiz_content ||
          quizData.content ||
          quizData;

        // In case JSON is returned as a string
        if (typeof quizContent === "string") {
          try {
            quizContent = JSON.parse(quizContent);
          } catch {
            setError("Invalid quiz content received.");
            return;
          }
        }

        setQuiz({
          ...quizData,
          ...quizContent,
        });
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load quiz."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-white" />

            <p className="font-medium">
              Loading quiz...
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Fetching quiz content.
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
            ← Back
          </button>

          <div className="rounded-2xl border border-red-900 bg-red-950/30 p-6 text-red-400">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const questions = Array.isArray(quiz?.questions)
    ? quiz.questions
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-400 hover:text-white transition cursor-pointer"
        >
          ← Back to Lesson
        </button>

        {/* Quiz Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7">

          <p className="text-xs uppercase tracking-wider text-slate-500">
            Assessment
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {quiz.title || "Generated Quiz"}
          </h1>

          {quiz.description && (
            <p className="text-slate-400 mt-3 leading-7">
              {quiz.description}
            </p>
          )}

          <div className="mt-5">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              {questions.length} Questions
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="mt-8 space-y-6">

          {questions.map((question, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
            >

              <div className="flex gap-4">

                {/* Question Number */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-semibold text-slate-300">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">

                  {/* Question */}
                  <h2 className="text-lg font-semibold leading-7">
                    {question.question ||
                      question.text ||
                      `Question ${index + 1}`}
                  </h2>

                  {/* Options */}
                  {Array.isArray(question.options) && (
                    <div className="mt-5 space-y-3">

                      {question.options.map(
                        (option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xs font-semibold text-slate-400">
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                            </div>

                            <p className="text-sm text-slate-300">
                              {typeof option === "string"
                                ? option
                                : option.text ||
                                  option.label ||
                                  JSON.stringify(option)}
                            </p>
                          </div>
                        )
                      )}

                    </div>
                  )}

                  {/* Correct Answer */}
                  {question.answer && (
                    <div className="mt-5 rounded-xl border border-emerald-900 bg-emerald-950/20 px-4 py-3">
                      <p className="text-xs uppercase tracking-wider text-emerald-500">
                        Correct Answer
                      </p>

                      <p className="text-sm text-emerald-300 mt-1">
                        {question.answer}
                      </p>
                    </div>
                  )}

                  {question.correctAnswer && (
                    <div className="mt-5 rounded-xl border border-emerald-900 bg-emerald-950/20 px-4 py-3">
                      <p className="text-xs uppercase tracking-wider text-emerald-500">
                        Correct Answer
                      </p>

                      <p className="text-sm text-emerald-300 mt-1">
                        {question.correctAnswer}
                      </p>
                    </div>
                  )}

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3">
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Explanation
                      </p>

                      <p className="text-sm text-slate-400 mt-1 leading-6">
                        {question.explanation}
                      </p>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Empty */}
        {questions.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <p className="text-slate-500">
              No quiz questions available.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Quiz;