const {
  getChunksWithoutEmbeddings,
  saveEmbedding,
} = require("./contentService");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateEmbeddings = async (texts) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: texts,
    config: {
      outputDimensionality: 768,
    },
  });

  return response.embeddings.map((e) => e.values);
};



const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const processAllEmbeddings = async () => {
  const batchSize = 5;

  const chunks = await getChunksWithoutEmbeddings();

  let processed = 0;

  console.log(`Found ${chunks.length} chunks without embeddings`);

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);

    const texts = batch.map((chunk) => chunk.content);

    let embeddings = null;

   while (!embeddings) {
  try {
    embeddings = await generateEmbeddings(texts);

    console.log(
      `Generated ${embeddings.length} embeddings for Batch ${
        Math.floor(i / batchSize) + 1
      }`
    );
  } catch (error) {
    if (error.status === 429) {
      console.log("Rate limit hit. Waiting 60 seconds...");
      await sleep(60000);
      continue;
    }

    throw error;
  }
}

    for (let j = 0; j < batch.length; j++) {
      await saveEmbedding(batch[j].id, embeddings[j]);
      processed++;

      console.log(
    `[${processed}/${chunks.length}] Saved Chunk ${batch[j].id}`);
    }
  }

  return {
    processedChunks: processed,
  };
};

module.exports = {
  generateEmbeddings,
  processAllEmbeddings,
};

