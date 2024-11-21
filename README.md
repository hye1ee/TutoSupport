# TutoSupport

## Getting Started

Follow these steps to set up and run the project in development mode.

### Prerequisites

- Ensure you have **Node.js** and **npm** installed on your machine.

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment:**

   - Copy `.env.example` and rename it to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Open `.env` and fill in each field with your Firebase configuration values.

3. **Run in development mode:**

   ```bash
   npm run dev
   ```
---

### Implementation Details:

1. The backend is implemented in src/apis. The ```src/apis/API_Documentation.md``` document provides comprehensive documentation on how to use the banckend API. 

2. ```src/components``` and ```src/assets``` hold the components for front end. 

3. ```src/services``` includes login and notification system.
