# KnowledgeForge – AI-Powered Knowledge Retrieval, Course & Lesson Generation Platform

KnowledgeForge is a scalable AI-powered learning platform built with Node.js, Express.js, PostgreSQL, Gemini AI, Axios, Puppeteer, JSDOM, and Mozilla Readability.

The platform automatically collects technical content from trusted documentation sources, extracts structured knowledge, stores it in a PostgreSQL knowledge base, enables intelligent search, and generates AI-powered courses and lessons using a custom knowledge repository.

---

## Features

### Content Acquisition

- URL Validation
- URL Normalization
- SSRF Protection
- DNS-Based SSRF Detection
- HTML Fetching using Axios
- Dynamic Website Rendering using Puppeteer
- HTML Decoding using Iconv Lite
- Content Extraction using JSDOM and Mozilla Readability

### Knowledge Base Management

- PostgreSQL Storage
- Automatic Source Detection
- Article Categorization
- Content Type Classification
- Duplicate URL Prevention
- Content Metadata Storage
- Knowledge Repository Management

### Search & Retrieval

- Search API
- Title-Based Search
- Knowledge Base Querying
- Category-Based Content Discovery
- Optimized Content Retrieval

### AI-Powered Learning

#### AI Course Generation

- Gemini AI Integration
- Knowledge Base Driven Course Creation
- Structured JSON Course Output
- Custom Learning Goals
- Beginner to Advanced Course Generation
- Persistent Course Storage
- Course Retrieval APIs

#### AI Lesson Generation

- Detailed Lesson Generation
- Module-Based Learning Content
- Section-Wise Explanations
- Key Concepts & Examples
- Practice Tasks
- Interview Questions & Answers
- Persistent Lesson Storage
- Lesson Reuse from Database

### Performance & Optimization

- In-Memory Caching
- Course Generation Caching
- Configurable Content Limits
- Reduced Prompt Size Optimization
- Faster AI Response Times
- Duplicate Lesson Prevention

### Security

- SSRF Protection
- DNS Validation
- Rate Limiting
- Environment Variable Configuration
- Centralized Error Handling

---

## System Architecture

Technical Documentation
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
Persistent Storage
↓
Learning APIs

---

## API Endpoints

### Content Extraction

```http
GET /api/gethtml?url=https://example.com
```

### Get All Articles

```http
GET /api/articles
```

### Get Single Article

```http
GET /api/articles/:id
```

### Search Knowledge Base

```http
GET /api/search?q=node
```

### Generate AI Course

```http
POST /api/generate-course
```

Request:

```json
{
  "category": "Backend",
  "level": "Beginner",
  "duration": "4 Weeks",
  "goal": "Interview Preparation"
}
```

### Get All Courses

```http
GET /api/courses
```

### Get Course By ID

```http
GET /api/courses/:id
```

### Generate AI Lesson

```http
POST /api/generate-lesson
```

Request:

```json
{
  "category": "Backend",
  "moduleTitle": "Express Middleware",
  "level": "Beginner",
  "goal": "Interview Preparation"
}
```

---

## Database Schema

### extracted_content

Stores extracted technical articles and documentation.

### courses

Stores AI-generated courses.

### lessons

Stores AI-generated lessons.

---

## Current Workflow

Documentation Sources
↓
Content Extraction
↓
Knowledge Base
↓
Search Layer
↓
Gemini AI
↓
Course Generation
↓
Lesson Generation
↓
Persistent Storage
↓
Learning APIs

---

## Performance Improvements

- Optimized Prompt Construction
- Configurable Article Limits
- Configurable Content Character Limits
- AI Response Caching
- Database-Based Lesson Reuse
- Reduced Token Consumption
- Faster Course Generation

---

## Future Improvements

- Quiz Generation API
- AI Tutor Endpoint
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

---

## Resume Highlights

- Built a scalable AI-powered learning platform using Node.js, Express.js, PostgreSQL, and Gemini AI.
- Developed a secure content extraction pipeline with SSRF protection, DNS validation, and rate limiting.
- Designed a structured knowledge retrieval system for technical documentation.
- Implemented AI-powered course generation using a custom knowledge repository.
- Developed AI-generated lesson creation with interview preparation and practice tasks.
- Optimized AI response times through caching and prompt engineering techniques.
- Designed persistent storage and retrieval APIs for AI-generated educational content.
- Architected the platform for future RAG, semantic search, embeddings, and AI tutoring capabilities.

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

KnowledgeForge demonstrates backend engineering, knowledge retrieval systems, AI integration, content extraction, search architecture, course generation, lesson generation, caching strategies, and AI-powered educational content delivery.
