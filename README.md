# KnowledgeForge – AI-Powered Knowledge Retrieval & Course Generation Platform

KnowledgeForge is a scalable knowledge retrieval and AI-powered course generation platform built with Node.js, Express.js, PostgreSQL, Gemini AI, Axios, Puppeteer, JSDOM, and Mozilla Readability.

The platform automatically collects technical content from trusted documentation sources, extracts readable knowledge, stores it in a structured knowledge base, enables intelligent search, and generates AI-powered learning courses using a custom knowledge repository.

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
- Duplicate URL Handling
- Content Metadata Storage

### Search & Retrieval

- Search API
- Title-Based Content Discovery
- Category-Based Organization
- Knowledge Base Querying

### AI-Powered Learning

- Gemini AI Integration
- AI Course Generation
- Knowledge Base Driven Course Creation
- Persistent Course Storage
- Course Listing API
- Course Details API

### Performance & Security

- Rate Limiting
- In-Memory Caching
- Centralized Error Handling
- Environment Variable Configuration

---

## Architecture

Content Source
↓
Content Extraction Pipeline
↓
PostgreSQL Knowledge Base
↓
Search & Retrieval Layer
↓
Gemini AI Integration
↓
Course Generation Engine
↓
Course Storage
↓
Course Retrieval APIs

---

## API Endpoints

### Content Extraction

GET /api/gethtml?url=https://example.com

### Get All Articles

GET /api/articles

### Get Single Article

GET /api/articles/:id

### Search Knowledge Base

GET /api/search?q=node

### Generate Course

POST /api/generate-course

Request:

{
"category": "Backend"
}

### Get All Courses

GET /api/courses

### Get Single Course

GET /api/courses/:id

---

## Current Workflow

Technical Documentation
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
Course Storage
↓
Course Retrieval

---

## Database Tables

### extracted_content

Stores extracted articles and documentation.

### courses

Stores AI-generated courses.

---

## Future Improvements

- Quiz Generation
- AI Tutor Endpoint
- Embedding Generation
- pgvector Integration
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Personalized Learning Paths
- Redis Caching
- Docker Support
- Automated Testing

---

## Resume Highlights

- Built a scalable knowledge retrieval platform using Node.js, Express.js, and PostgreSQL.
- Developed a secure content extraction pipeline with SSRF protection, DNS validation, and rate limiting.
- Implemented automated knowledge ingestion from technical documentation sources.
- Integrated Gemini AI for dynamic course generation using a custom knowledge base.
- Designed APIs for AI-generated course creation, storage, retrieval, and search.
- Architected the system for future RAG, semantic search, and AI tutoring capabilities.

---

## Tech Stack

Backend:

- Node.js
- Express.js

Database:

- PostgreSQL

AI:

- Gemini AI

Content Extraction:

- Axios
- Puppeteer
- JSDOM
- Mozilla Readability
- Iconv Lite

Caching:

- Node Cache

Security:

- Express Rate Limit
- SSRF Protection
- DNS Validation

---

## Author

Hasan Raza

KnowledgeForge demonstrates backend engineering, knowledge retrieval systems, AI integration, content extraction, search architecture, and AI-powered educational content generation.
