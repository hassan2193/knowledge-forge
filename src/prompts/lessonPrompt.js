const buildLessonPrompt = ({
  context,
  category,
  moduleTitle,
  moduleDescription,
  level,
  goal,
}) => {
  return `
You are KnowledgeForge AI, an expert programming instructor.

Use ONLY the provided knowledge.

Knowledge Base:

${context}

Lesson Requirements:

Category: ${category}
Module: ${moduleTitle}
Description: ${moduleDescription}
Level: ${level}
Goal: ${goal}

Return ONLY valid JSON.

...
`;
};

module.exports = {
  buildLessonPrompt,
};
