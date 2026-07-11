const { generateText } = require("./aiService");

const {
  generateQueryEmbedding,
  searchSimilarChunks,
} = require("./searchService");

const { buildRagPrompt } = require("../prompts/ragPrompt");

//Retrieve relevant chunks from Vector DB

const retrieveContext = async (query, limit = 5) => {
  const embedding = await generateQueryEmbedding(query);

  return await searchSimilarChunks(embedding, limit);
};

//Format retrieved chunks for the LLM prompt

const formatContext = (chunks) => {
  return chunks
    .map(
      (chunk, index) => `
Source ${index + 1}

Title: ${chunk.title}
URL: ${chunk.url}

${chunk.content}
`,
    )
    .join("\n\n----------------------------------------\n\n");
};

//Return lightweight sources for frontend

const buildSources = (chunks) => {
  return chunks.map(({ title, url, distance }) => ({
    title,
    url,
    distance,
  }));
};

//Chat RAG
const answerQuestion = async (question) => {
  const chunks = await retrieveContext(question);

  const formattedContext = formatContext(chunks);

  const prompt = buildRagPrompt(question, formattedContext);

  const answer = await generateText(prompt);

  return {
    answer,
    sources: buildSources(chunks),
  };
};

//Course Retrieval

const generateCourseContext = async (
  category,
  level,
  duration,
  goal,
  limit = 8,
) => {
  const query = `
Category: ${category}
Level: ${level}
Duration: ${duration}
Goal: ${goal}
`;

  const chunks = await retrieveContext(query, limit);

  return formatContext(chunks);
};

//Lesson Retrieval

const generateLessonContext = async (
  category,
  moduleTitle,
  moduleDescription,
  level,
  goal,
  limit = 8,
) => {
  const query = `
Category: ${category}
Module: ${moduleTitle}
Description: ${moduleDescription}
Level: ${level}
Goal: ${goal}
`;

  const chunks = await retrieveContext(query, limit);

  return formatContext(chunks);
};

//Quiz Retrieval

const generateQuizContext = async (
  category,
  lessonTitle,
  level,
  goal,
  limit = 8,
) => {
  const query = `
Category: ${category}
Lesson: ${lessonTitle}
Level: ${level}
Goal: ${goal}
`;

  const chunks = await retrieveContext(query, limit);

  return formatContext(chunks);
};

module.exports = {
  retrieveContext,
  formatContext,
  buildSources,
  answerQuestion,
  generateCourseContext,
  generateLessonContext,
  generateQuizContext,
};
