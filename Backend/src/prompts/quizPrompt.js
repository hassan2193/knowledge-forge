const buildQuizPrompt = ({ lesson }) => {
  return `
You are KnowledgeForge AI, an expert technical instructor.

Generate a quiz ONLY from the lesson provided below.

Lesson:
${JSON.stringify(lesson)}

Rules:

- Return ONLY valid JSON.
- Generate EXACTLY 5 multiple-choice questions.
- Every question must be based ONLY on the lesson.
- Do NOT introduce concepts not present in the lesson.
- Each question must have exactly 4 options.
- Exactly one option must be correct.
- Explanation must be ONE short sentence (maximum 15 words).
- Questions should test conceptual understanding instead of simple memorization.
- Keep questions and options concise.
- Do NOT wrap the JSON inside markdown.
- Do NOT write any text before or after the JSON.
- Ensure the JSON is complete and valid.

Return JSON in exactly this format:

{
  "title": "string",
  "questions": [
    {
      "question": "string",
      "options": [
        "string",
        "string",
        "string",
        "string"
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
