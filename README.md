# KnowledgeForge – AI-Powered Knowledge Retrieval Platform

KnowledgeForge is a scalable content extraction and knowledge retrieval platform built with Node.js, Express, PostgreSQL, Axios, Puppeteer, JSDOM, and Mozilla Readability.

The platform automatically collects technical content from documentation websites, extracts readable knowledge, stores it in a structured knowledge base, categorizes articles, and provides search capabilities for future AI-powered learning, course generation, and Retrieval-Augmented Generation (RAG) workflows.

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

### Performance & Security

- Rate Limiting
- In-Memory Caching
- Centralized Error Handling
- Environment Variable Configuration

---

## Architecture

```text
Seed URLs / User URL
            ↓
     URL Validation
            ↓
    SSRF Protection
            ↓
    DNS Resolution Check
            ↓
 Axios Fetch / Puppeteer
            ↓
      HTML Decoding
            ↓
  JSDOM + Readability
            ↓
   Content Extraction
            ↓
      PostgreSQL
            ↓
      Knowledge Base
            ↓
       Search API
            ↓
 Future AI / RAG Layer
```

---

## Tech Stack

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

### Content Extraction

- Axios
- Puppeteer
- JSDOM
- Mozilla Readability
- Iconv Lite

### Security

- Express Rate Limit
- SSRF Protection
- DNS Resolution Validation

### Caching

- Node Cache

---

## API Endpoints

### Extract Content

```http
GET /api/gethtml?url=https://example.com
```

### Render JavaScript Websites

```http
GET /api/gethtml?url=https://example.com&render=true
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

---

## Example Search Response

```json
{
  "success": true,
  "count": 3,
  "articles": [
    {
      "id": 26,
      "title": "Introduction to Node.js",
      "category": "Backend"
    }
  ]
}
```

---

## Knowledge Categories

- AI
- Backend
- JavaScript
- Python
- Database
- SQL
- Java
- C++
- DSA
- Cloud
- Git
- System Design
- Operating System
- Computer Networks
- DBMS

---

## Current Workflow

```text
Content Source
      ↓
Extraction
      ↓
Knowledge Base
      ↓
Search API
      ↓
Future AI Layer
      ↓
Course Generation
      ↓
Quiz Generation
```

---

## Future Improvements

- AI Question Answering Endpoint
- Course Generation
- Quiz Generation
- Embedding Generation
- pgvector Integration
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Redis Caching
- Docker Support
- Automated Testing

---

## Resume Highlights

- Built a secure content extraction pipeline with SSRF protection and rate limiting.
- Designed a structured knowledge base using PostgreSQL.
- Implemented automated content seeding and categorization.
- Developed a search and retrieval system for future AI-powered learning workflows.
- Architected the platform for future RAG and semantic search integration.

---

## Author

Hasan Raza

KnowledgeForge demonstrates backend engineering, web scraping, content processing, knowledge retrieval, search systems, and AI-ready architecture for educational applications.
