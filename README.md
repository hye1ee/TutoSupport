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

## Technical Details

### Code Structure

```
src
┣ apis
┃ ┣ # backend api implementation
┣ assets
┃ ┣ # react icon components
┣ components
┃ ┣ # react components for pages
┣ config
┃ ┗ # firebase configuration
┣ pages
┃ ┣ # manage pages and routing
┃ ┗ # main features are implemented in the watch.tsx.
┣ services
┃ ┣ # login system
┣ types
┣ utils
┣ index.css
┣ index.tsx
┗ vite-env.d.ts
```

The Watch page (/src/pages/Watch.tsx) is the core page where most of our main interactions take place. Each key feature is implemented as a React component, located in the following directories.

- src/components/Comment.tsx
- src/components/CommonMistakes.tsx
- src/components/Gallery.tsx
- src/components/HallofFame.tsx
- src/components/Encourage.tsx #encourage alert
- src/components/Recommendation.tsx #feedback request alert

---

### Frameworks and Libraries

We used [**`React.js`**](https://react.dev/) (along with react-dom for routing) as our base frontend framework and [**`vite`**](https://vite.dev/) (with rollup for bundling) as our build tool. For the backend, we utilized Firestore from **[`Firebase`](https://firebase.google.com/).**

- **`react-confetti`**
  - Used for creating celebratory visual effects with confetti.
- **`react-icons`**
  - Used for rendering all icons.
- **`react-spinners`**
  - Used for implementing a hashtag-shaped spinner when fetching data from the database.
- **`antd`**
  - Used for implementing some UI components such as tags and buttons.
- **`react-player`**
  - Used for fetching videos from YouTube and implementing all video interactions.
- **`styled-components`**
  - Used for styling React components on the main page, video timeline, and galleries.

---

### Deployment

[https://tutosupport.vercel.app/](https://tutosupport.vercel.app/)

We deployed using Vercel. We used a video Smore Cookies(https://www.youtube.com/watch?v=MvPdE27Otig) from youtube. Using chatGPT, we generate some dummy comment data. We also manually add some comments later.

```
We recommend testing our prototype with a stable internet connection. Sometimes, images are not loaded due to poor connection. You need a keyboard to do video interaction and Google account for login.
```
