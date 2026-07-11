const buildQuizPrompt = ({ lesson }) => {
  return `

You are KnowledgeForge AI.

Generate a quiz ONLY from the lesson below.

Lesson:

${JSON.stringify(lesson)}

Rules:

- Generate exactly 10 MCQs.
- Every question must be based ONLY on the lesson.
- Do not introduce concepts not present in the lesson.
- 4 options.
- One correct answer.
- Short explanation.
- Return ONLY JSON.

`;
};
