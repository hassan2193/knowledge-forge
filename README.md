# KnowledgeForge – AI-Powered Knowledge Retrieval, Course, Lesson & Quiz Generation Platform

KnowledgeForge is a scalable AI-powered learning content generation platform built with Node.js, Express.js, PostgreSQL, Gemini AI, Axios, Puppeteer, JSDOM, and Mozilla Readability.

The platform automatically extracts technical content from trusted documentation sources, transforms it into a structured knowledge repository, and generates AI-powered courses, lessons, and quizzes. It combines knowledge retrieval, content processing, intelligent search, caching, and AI-driven educational content generation into a unified learning system.

---

## Features

### Content Acquisition

- URL Validation & Normalization
- SSRF Protection
- DNS-Based SSRF Detection
- HTML Fetching with Axios
- Dynamic Website Rendering with Puppeteer
- HTML Decoding with Iconv Lite
- Content Extraction using JSDOM & Mozilla Readability

### Knowledge Base Management

- PostgreSQL Knowledge Repository
- Automatic Source Detection
- Content Categorization
- Duplicate URL Prevention
- Metadata Storage
- Structured Knowledge Persistence

### Search & Retrieval

- Search API
- Title-Based Search
- Category-Based Content Discovery
- Knowledge Base Querying
- Optimized Content Retrieval

### AI-Powered Learning

#### AI Course Generation

- Gemini AI Integration
- Structured JSON Course Generation
- Custom Learning Goals
- Configurable Course Duration
- Difficulty-Based Learning Paths
- Persistent Course Storage
- Course Retrieval APIs

#### AI Lesson Generation

- Module-Based Lesson Creation
- Structured JSON Lesson Output
- Section-Wise Explanations
- Key Concepts & Examples
- Practice Tasks
- Interview Questions & Answers
- Persistent Lesson Storage
- Database-Based Lesson Reuse

#### AI Quiz Generation

- AI-Generated MCQ Assessments
- Knowledge Base Driven Quiz Creation
- Multiple Choice Questions
- Correct Answers & Explanations
- Persistent Quiz Storage
- Database-Based Quiz Reuse
- Quiz Retrieval APIs

### Performance & Optimization

- In-Memory Caching
- Database Reuse Strategy
- Configurable Content Limits
- Optimized Prompt Construction
- Reduced Token Consumption
- Faster AI Response Times
- Duplicate Lesson Prevention
- Duplicate Quiz Prevention

### Security

- SSRF Protection
- DNS Validation
- Express Rate Limiting
- Environment Variable Management
- Centralized Error Handling

---

## System Architecture

Documentation Sources
↓
Content Extraction Pipeline
↓
Knowledge Processing
↓
PostgreSQL Knowledge Base
↓
Search & Retrieval Layer
↓
Gemini AI Layer
↓
Course Generation Engine
↓
Lesson Generation Engine
↓
Quiz Generation Engine
↓
Persistent Storage
↓
Learning APIs

---

## API Endpoints

### Content Extraction

GET /api/gethtml?url=https://example.com

### Articles

GET /api/articles

GET /api/articles/:id

### Search

GET /api/search?q=node

### AI Course Generation

POST /api/generate-course

GET /api/courses

GET /api/courses/:id

### AI Lesson Generation

POST /api/generate-lesson

GET /api/lessons/:id

### AI Quiz Generation

POST /api/generate-quiz

GET /api/quizzes/:id

---

## Database Schema

### extracted_content

Stores extracted documentation and technical articles.

### courses

Stores AI-generated courses.

### lessons

Stores AI-generated lessons.

### quizzes

Stores AI-generated quizzes and assessments.

---

## Current Workflow

Documentation Sources
↓
Knowledge Extraction
↓
PostgreSQL Knowledge Base
↓
Search Layer
↓
Gemini AI
↓
Course Generation
↓
Lesson Generation
↓
Quiz Generation
↓
Persistent Storage
↓
Learning APIs

---

## Performance Optimizations

- Prompt Size Optimization
- Configurable Article Limits
- Configurable Content Character Limits
- AI Response Caching
- Database-Based Lesson Reuse
- Database-Based Quiz Reuse
- Reduced Token Usage
- Faster Content Generation

---

## Future Improvements

- Embedding Generation
- pgvector Integration
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Personalized Learning Paths
- Course Progress Tracking
- Redis Caching
- Docker Support
- Automated Testing
- Frontend Learning Dashboard
- Interactive Assessments

---

## Resume Highlights

- Built a scalable AI-powered learning content generation platform using Node.js, Express.js, PostgreSQL, and Gemini AI.
- Developed a secure content extraction pipeline with SSRF protection, DNS validation, and rate limiting.
- Designed a structured knowledge retrieval system for technical documentation.
- Implemented AI-powered course, lesson, and quiz generation using a custom knowledge repository.
- Engineered persistent storage and retrieval APIs for AI-generated educational content.
- Optimized AI performance through caching, database reuse strategies, and prompt engineering techniques.
- Designed the architecture for future Retrieval-Augmented Generation (RAG), semantic search, embeddings, and vector-based retrieval.
- Built an end-to-end automated learning content generation workflow from documentation ingestion to assessment creation.

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### AI

- Gemini AI

### Content Extraction

- Axios
- Puppeteer
- JSDOM
- Mozilla Readability
- Iconv Lite

### Caching

- Node Cache

### Security

- Express Rate Limit
- SSRF Protection
- DNS Validation

---

## Author

Hasan Raza

KnowledgeForge demonstrates backend engineering, knowledge retrieval systems, AI integration, educational content generation, caching strategies, prompt engineering, search architecture, and scalable AI-powered learning platform design.
