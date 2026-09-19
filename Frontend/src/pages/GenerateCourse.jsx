import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function GenerateCourse() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState("2 weeks");
  const [goal, setGoal] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [course, setCourse] = useState(null);

  const [generatingLesson, setGeneratingLesson] = useState(null);
  const [lessonError, setLessonError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError("Please enter a topic or category.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLessonError("");
      setCourse(null);

      const response = await api.post("/courses/generate", {
        category: category.trim(),
        level,
        duration,
        goal:
          goal.trim() ||
          `learn ${category.trim()} clearly`,
      });

      setCourse(response.data.course || response.data.content);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to generate course."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLesson = async (module) => {
    try {
      setGeneratingLesson(module.title);
      setLessonError("");

      const response = await api.post("/lessons/generate", {
        category: category.trim(),
        moduleTitle: module.title,
        moduleDescription: module.description || "",
        level: course.level,
        goal: course.goal,
      });

      const savedLessonId = response.data.savedLessonId;

      navigate(`/creator/lessons/${savedLessonId}`);
    } catch (err) {
      console.error(err);

      setLessonError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to generate lesson."
      );
    } finally {
      setGeneratingLesson(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/creator")}
            className="mb-5 text-sm text-slate-400 hover:text-white transition cursor-pointer"
          >
            ← Back to Creator Dashboard
          </button>

          <p className="text-sm text-slate-500 uppercase tracking-wider">
            Content Creator
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Generate Course
          </h1>

          <p className="text-slate-400 mt-2 max-w-2xl">
            Create an AI-generated course using the knowledge available
            in your knowledge base.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <form
            onSubmit={handleGenerate}
            className="space-y-6"
          >

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Topic / Category
              </label>

              <input
                type="text"
                placeholder="e.g. JavaScript"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-slate-600"
              />
            </div>

            {/* Level + Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Difficulty Level
                </label>

                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none cursor-pointer focus:border-slate-600"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">
                    Intermediate
                  </option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration
                </label>

                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none cursor-pointer focus:border-slate-600"
                >
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                  <option value="4 weeks">4 weeks</option>
                  <option value="6 weeks">6 weeks</option>
                  <option value="8 weeks">8 weeks</option>
                </select>
              </div>

            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Learning Goal
              </label>

              <textarea
                rows="4"
                placeholder="What should learners be able to achieve?"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 resize-none focus:border-slate-600"
              />
            </div>

            {/* Course Error */}
            {error && (
              <div className="rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Generate Course Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "Generating Course..."
                : "Generate Course"}
            </button>

          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-white" />

            <p className="font-medium">
              Generating your course...
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Retrieving knowledge and creating the course with AI.
            </p>
          </div>
        )}

        {/* Generated Course */}
        {!loading && course && (
          <div className="mt-8 space-y-6">

            {/* Course Header */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Generated Course
                  </p>

                  <h2 className="text-2xl font-bold mt-2">
                    {course.title || "Generated Course"}
                  </h2>

                  {course.goal && (
                    <p className="text-slate-400 mt-3 max-w-3xl">
                      {course.goal}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">

                  {course.level && (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {course.level}
                    </span>
                  )}

                  {course.duration && (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                      {course.duration}
                    </span>
                  )}

                </div>

              </div>
            </div>

            {/* Modules */}
            <div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Course Modules
                </h3>

                {Array.isArray(course.modules) && (
                  <span className="text-sm text-slate-500">
                    {course.modules.length} modules
                  </span>
                )}
              </div>

              {/* Lesson Error */}
              {lessonError && (
                <div className="mb-4 rounded-xl border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                  {lessonError}
                </div>
              )}

              <div className="space-y-4">

                {Array.isArray(course.modules) &&
                  course.modules.map((module, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
                    >

                      <div className="flex gap-4">

                        {/* Module Number */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-semibold text-slate-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="min-w-0 flex-1">

                          {/* Module Title */}
                          <h4 className="text-lg font-semibold">
                            {module.title ||
                              module.moduleTitle ||
                              `Module ${index + 1}`}
                          </h4>

                          {/* Module Description */}
                          {(module.description ||
                            module.moduleDescription) && (
                            <p className="text-sm text-slate-400 mt-2 leading-6">
                              {module.description ||
                                module.moduleDescription}
                            </p>
                          )}

                          {/* Lesson Button + Estimated Time */}
                          <div className="mt-5 flex items-center justify-between">

                            <div className="text-xs text-slate-500">
                              {module.estimatedTime ||
                                "Estimated time not specified"}
                            </div>

                            <button
                              onClick={() =>
                                handleGenerateLesson(module)
                              }
                              disabled={
                                generatingLesson === module.title
                              }
                              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                            >
                              {generatingLesson === module.title
                                ? "Generating Lesson..."
                                : "Generate Lesson"}
                            </button>

                          </div>

                          {/* Topics / Lessons */}
                          {Array.isArray(module.lessons) &&
                            module.lessons.length > 0 && (
                              <div className="mt-5 space-y-2">

                                {module.lessons.map(
                                  (lesson, lessonIndex) => (
                                    <div
                                      key={lessonIndex}
                                      className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
                                    >
                                      <p className="text-sm text-slate-300">
                                        {lesson.title ||
                                          lesson.name ||
                                          lesson}
                                      </p>
                                    </div>
                                  )
                                )}

                              </div>
                            )}

                        </div>
                      </div>
                    </div>
                  ))}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default GenerateCourse;