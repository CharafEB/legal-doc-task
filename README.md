# Server Documentation

The `server` directory contains the backend logic for the application, built with Node.js and Express. It provides endpoints for searching, summarizing, and retrieving legal documents.

## Technology Stack
- **Node.js**: Runtime environment.
- **Express**: Web framework for handling HTTP requests.
- **TypeScript**: Typed superset of JavaScript for better code safety.

## Setup & specific scripts

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Server**:
   Check `package.json` for specific scripts, but typically:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```

The server runs on port `3001` by default (or as defined in `PORT` env variable).

## API Endpoints

### Base URL
`http://localhost:3001` (default)

### 1. Search Documents
- **Endpoint**: `/search`
- **Method**: `POST`
- **Description**: Searches through the indexed documents.
- **Handler**: `searchRouter` -> `flexSearchController`

### 2. Summarize Document
- **Endpoint**: `/summarize`
- **Method**: `POST`
- **Description**: Generates a summary for a provided document or file.
- **Handler**: `summarizeDocRouter` -> `summarizeDocController`

### 3. Retrieve Document
- **Endpoint**: `/document`
- **Method**: `POST`
- **Description**: Fetches specific document details.
- **Handler**: `documentsRouter` -> `documentController`

### 4. Health Check / Data
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Returns a static list of mock documents (Healthcare, Corporate, Intellectual Property cases) to verify the server is up and serving data.

## Environment Variables

The server requires the following environment variables.
Copy `server/.env.example` to `server/.env` and update the values:

```bash
cp server/.env.example server/.env
```

| Variable | Description |
| :--- | :--- |
| `PORT` | The port the server will list on (default: 3001). |
| `GEMINI_API_KEY` | API Key for Google Gemini (required for summarization). |
| `NODE_ENV` | Environment mode (`development` or `production`). |

## Architecture

The server follows a **Layered Architecture** pattern to separate concerns:

1.  **Routes (`server/router`)**:
    - Entry points for API requests.
    - Define HTTP methods and paths.
    - Delegate processing to Controllers.

2.  **Controllers (`server/controller`)**:
    - Handle request/response logic.
    - Parse inputs and validate data.
    - Call Services for business logic.
    - Return responses to the client.

3.  **Services (`server/service`)**:
    - Contain core business logic.
    - Interact with external APIs (like Gemini AI) or databases.
    - Reusable and independent of the HTTP layer.

4.  **Middleware (`server/middleware`)**:
    - Handle cross-cutting concerns like Error Handling (`AppErrorMiddleware`).
