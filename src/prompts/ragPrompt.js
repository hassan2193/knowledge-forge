const buildRagPrompt = (question, chunks) => {
  const context = chunks.map((chunk) => chunk.content).join("\n\n");

  return `
You are an AI assistant.

Answer ONLY using the context provided below.

If the answer is not present in the context, say:
"I don't have enough information to answer that."

Context:
${context}

Question:
${question}

Answer:
`;
};

module.exports = {
  buildRagPrompt,
};
