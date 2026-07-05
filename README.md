# KnowledgeForge – AI-Powered Retrieval-Augmented Generation (RAG) Platform

KnowledgeForge is an AI-powered Retrieval-Augmented Generation (RAG) platform that automatically extracts technical documentation, builds a semantic vector knowledge base using PostgreSQL and pgvector, performs semantic search, and generates context-aware AI responses, courses, lessons, and quizzes using Gemini AI.

The platform automatically extracts technical documentation from trusted sources, builds a semantic vector knowledge base using Gemini Embeddings and pgvector, performs intelligent semantic search, and generates AI-powered answers, courses, lessons, and quizzes using Retrieval-Augmented Generation (RAG).

---

# Features

## Documentation Ingestion

- URL Validation
- URL Normalization
- SSRF Protection
- DNS Rebinding Protection
- HTML Fetching (Axios)
- Dynamic Website Rendering (Puppeteer)
- HTML Decoding (Iconv Lite)
- Content Extraction (Mozilla Readability + JSDOM)
- Automatic Source Detection
- Metadata Extraction

---

## Knowledge Base

- PostgreSQL Knowledge Repository
- Duplicate URL Prevention
- Structured Knowledge Storage
- Content Categorization
- Metadata Persistence

---

## Chunking Pipeline

- Automatic Content Chunking
- Overlapping Chunk Strategy
- Configurable Chunk Size
- Configurable Chunk Overlap
- Chunk Persistence

---

## Vector Search (RAG)

- Gemini Embedding API
- Batch Embedding Generation
- 768-Dimensional Embeddings
- pgvector Integration
- Vector Indexing
- Query Embedding Generation
- Cosine Similarity Search
- Semantic Search
- Retrieval-Augmented Generation (RAG)
- Context-Aware Prompt Construction

---

## AI Learning Engine

### AI Chat

- Retrieval-Augmented Responses
- Context-Aware Answer Generation
- Semantic Knowledge Retrieval
- Hallucination Reduction

### AI Course Generation

- Structured JSON Output
- Learning Goal Based Courses
- Difficulty Levels
- Course Duration Control
- Persistent Storage

### AI Lesson Generation

- Module-Based Lessons
- Section-wise Explanations
- Examples
- Interview Questions
- Practice Tasks
- Persistent Storage

### AI Quiz Generation

- AI Generated MCQs
- Correct Answers
- Detailed Explanations
- Persistent Storage

---

## Search & Retrieval

- Keyword Search
- Semantic Search
- Article Search
- Knowledge Base Querying
- Vector Similarity Search

---

## Performance Optimizations

- Node Cache
- Prompt Optimization
- Configurable Prompt Size
- Reduced Token Usage
- Database Reuse
- Batch Embedding Generation
- Optimized Chunk Retrieval

---

## Security

- SSRF Protection
- DNS Validation
- Express Rate Limiting
- Environment Variables
- Centralized Error Handling

---

# Project Architecture

```
                 Documentation Sources
                          │
                          ▼
                HTML Extraction Pipeline
                          │
                          ▼
                  Content Processing
                          │
                          ▼
                 Chunk Generation Engine
                          │
                          ▼
             Gemini Embedding Generation
                          │
                          ▼
          PostgreSQL + pgvector Knowledge Base
                          │
                          ▼
               Semantic Vector Search (RAG)
                          │
                          ▼
               Context-Aware Prompt Builder
                          │
                          ▼
                    Gemini AI Generation
                          │
      ┌───────────────────┼───────────────────┐
      ▼                   ▼                   ▼
 AI Chat            Course Generator    Lesson Generator
                                              │
                                              ▼
                                       Quiz Generator
                                              │
                                              ▼
                                      Persistent Storage
```

---

# Folder Structure

```
KnowledgeForge
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── articleController.js
│   │   ├── chatController.js
│   │   ├── courseController.js
│   │   ├── getHtmlController.js
│   │   ├── importController.js
│   │   ├── lessonController.js
│   │   └── quizController.js
│   │
│   ├── data
│   │
│   ├── middleware
│   │
│   ├── prompts
│   │   └── ragPrompt.js
│   │
│   ├── routes
│   │   ├── chatRoutes.js
│   │   ├── getHtmlRoutes.js
│   │   └── importRoutes.js
│   │
│   ├── services
│   │   ├── aiService.js
│   │   ├── articleService.js
│   │   ├── cacheService.js
│   │   ├── chunkService.js
│   │   ├── contentService.js
│   │   ├── decodeService.js
│   │   ├── embeddingService.js
│   │   ├── extractionService.js
│   │   ├── fetchService.js
│   │   ├── ragService.js
│   │   ├── renderService.js
│   │   ├── responseService.js
│   │   ├── searchService.js
│   │   ├── securityService.js
│   │   ├── sourceImportService.js
│   │   ├── validationService.js
│   │   └── vectorSearchService.js
│   │
│   ├── utils
│   │
│   └── app.js
│
├── server.js
├── seedKnowledgeBase.js
├── seedChunks.js
├── seedEmbeddings.js
├── testGemini.js
├── testEmbedding.js
└── testSearch.js
```

---

# API Endpoints

## Content Extraction

```
GET /api/gethtml
```

---

## Articles

```
GET /api/articles
GET /api/articles/:id
GET /api/search
```

---

## AI Chat (RAG)

```
POST /api/chat
```

---

## Courses

```
POST /api/generate-course
GET /api/courses
GET /api/courses/:id
```

---

## Lessons

```
POST /api/generate-lesson
GET /api/lessons/:id
```

---

## Quizzes

```
POST /api/generate-quiz
GET /api/quizzes/:id
```

---

# Database Schema

### extracted_content

Stores extracted documentation and metadata.

### content_chunks

Stores overlapping content chunks with vector embeddings.

### courses

Stores AI-generated courses.

### lessons

Stores AI-generated lessons.

### quizzes

Stores AI-generated quizzes.

---

# Tech Stack

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- pgvector

## AI

- Gemini 2.5 Flash
- Gemini Embedding-001

## Content Extraction

- Axios
- Puppeteer
- JSDOM
- Mozilla Readability
- Iconv Lite

## Caching

- Node Cache

## Security

- Express Rate Limit
- SSRF Protection
- DNS Validation

---

# Current Workflow

```
Documentation Sources
        │
        ▼
HTML Extraction
        │
        ▼
Content Cleaning
        │
        ▼
Chunk Generation
        │
        ▼
Embedding Generation
        │
        ▼
Vector Database (pgvector)
        │
        ▼
Semantic Search
        │
        ▼
Prompt Construction
        │
        ▼
Gemini AI
        │
 ┌──────┼──────────────┐
 ▼      ▼              ▼
Chat  Courses      Lessons
                      │
                      ▼
                    Quizzes
```

---

# Resume Highlights

- Built an end-to-end Retrieval-Augmented Generation (RAG) platform using Node.js, PostgreSQL, pgvector, and Gemini AI.
- Developed a secure documentation ingestion pipeline with SSRF protection, DNS validation, and rate limiting.
- Implemented semantic search using vector embeddings, cosine similarity search, and pgvector.
- Designed an automated chunking and embedding pipeline for large-scale documentation indexing.
- Built AI-powered chat, course, lesson, and quiz generation using a custom semantic knowledge base.
- Optimized AI performance using caching, prompt engineering, vector retrieval, and database reuse strategies.
- Engineered a scalable backend architecture for intelligent educational content generation.

---

# Future Improvements

- Hybrid Search (Keyword + Vector)
- Redis Caching
- Conversation Memory
- User Authentication
- Personalized Learning Paths
- Course Progress Tracking
- Streaming AI Responses
- Docker Support
- CI/CD Pipeline
- Frontend Learning Dashboard

---

# Author

**Hasan Raza**

KnowledgeForge demonstrates backend engineering, Retrieval-Augmented Generation (RAG), semantic search, vector databases, prompt engineering, AI integration, scalable REST APIs, educational content generation, and intelligent knowledge retrieval.
