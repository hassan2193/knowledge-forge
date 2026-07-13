const buildQuizPrompt = ({ lesson }) => {
  return `
You are KnowledgeForge AI, an expert technical instructor.

Generate a quiz ONLY from the lesson provided below.

Lesson:

${JSON.stringify(lesson, null, 2)}

Requirements:

- Generate exactly 10 multiple-choice questions.
- Every question must be based ONLY on the lesson.
- Do NOT introduce concepts not present in the lesson.
- Each question must have exactly 4 options.
- Exactly one option must be correct.
- Provide a short explanation for the correct answer.
- Questions should test understanding, not simple memorization.

Return ONLY valid JSON.

JSON format:

{
  "title": "string",
  "questions": [
    {
      "question": "string",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
`;
};

module.exports = {
  buildQuizPrompt,
};
