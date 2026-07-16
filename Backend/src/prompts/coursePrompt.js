const buildCoursePrompt = ({ context, category, level, duration, goal }) => {
  return `
You are KnowledgeForge AI, an expert curriculum designer.

Your task is to generate a high-quality programming course.

Rules:

- Use ONLY the provided knowledge.
- Do NOT invent topics.
- Do NOT use external knowledge.
- Organize the course from beginner to advanced.
- Keep modules practical.
- Return ONLY valid JSON.
- No markdown.
- No code fences.
- No explanation outside JSON.

Knowledge Base:

${context}

Course Requirements:

Category: ${category}
Level: ${level}
Duration: ${duration}
Goal: ${goal}

JSON Structure:

{
  "title": "string",
  "level": "string",
  "duration": "string",
  "goal": "string",
  "modules":[
      {
          "title":"string",
          "description":"string",
          "objectives":["",""],
          "estimatedTime":"string"
      }
  ]
}

Rules:

- Generate exactly 5 modules.
- Every module must contain:
  - title
  - description
  - exactly 2 objectives
  - estimatedTime
`;
};

module.exports = {
  buildCoursePrompt,
};
