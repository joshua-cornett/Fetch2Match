# Fetch2Match

Welcome to **Fetch2Match**! This project is a website for dog lovers to search through a database of shelter dogs, with the hope of finding a new home for these dogs. Users can filter by breed, paginate through the results, sort the list, and add dogs to their favorites for matching.

### _NOTE: This is part of a frontend exercise given to me by FetchRewards. The API that this is linked to is theirs, while the frontend is of my design and development._

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Login/Logout).
- Browse and search dogs by breed.
- Filter results by breed.
- Sort dogs by breed (ascending/descending).
- Paginated results.
- Mark dogs as favorites.
- Generate a match based on favorited dogs.

## Live Demo

You can view the live demo of the site here:  
**[Fetch2Match Demo](https://joshua-cornett.github.io/fetch2match/)**

## Screenshots

*(Optional: Add screenshots of your app interface here to showcase the features and UI)*

## Technologies Used

- **React** with **TypeScript**
- **Vite** for build tooling and development
- **Material UI (MUI)** for UI components
- **Axios** for API calls
- **React Context API** for state management
- **GitHub Pages** for deployment
- **ESLint**, **Prettier**, and **Husky** for code formatting and linting

## Getting Started

To get a local copy of the project up and running on your machine, follow the instructions below.

### Prerequisites

Ensure you have **Node.js** installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   cd fetch2match

2. Navigate into the project directory:

   ```bash
   git clone https://github.com/your-username/fetch2match.git

3. Install the dependencies:

   ```bash
   npm install

### Available Scripts

In the project directory, you can run the following scripts:

npm run dev: Runs the app in development mode. Open http://localhost:5173 to view it in the browser.
npm run build: Builds the app for production to the dist folder.
npm run serve: Serves the production build from the dist folder.
npm run lint: Runs ESLint to check for code style and quality issues.
npm run format: Runs Prettier to format the codebase.

## Deployment
### Deploy to GitHub Pages
This project is set up to be deployed to GitHub Pages using the gh-pages package. Here's how to deploy it:

1. Ensure you have installed the gh-pages package:

   ```bash
   npm install gh-pages --save-dev

2. Update the vite.config.ts to include the base path for your repository:

   ```ts
    export default defineConfig({
    plugins: [react()],
    base: '/fetch2match/', // Ensure this matches your repo name
});

3. Add the following scripts to your package.json:

   ```json
     {
      "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
      }
    }

4. Run the deploy script:

   ```bash
     npm run deploy

5. After deploying, go to your repository’s Settings > Pages, and ensure the source is set to gh-pages.

Your project should now be live at:
https://your-username.github.io/fetch2match/

## Contributing
Contributions, issues, and feature requests are welcome!

If you'd like to contribute, feel free to open a pull request or an issue. For significant changes, please discuss them in an issue first to ensure alignment with the project goals.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

```markdown
### Important Sections Explained:
1. **Features**: Highlights the core features of your app.
2. **Live Demo**: Provides the link to the live GitHub Pages deployment.
3. **Technologies Used**: Lists the main tech stack used in the project.
4. **Getting Started**: Instructions on how to clone, install, and run the project locally.
5. **Deployment**: Explains how to deploy the app to GitHub Pages using `gh-pages`.
6. **Contributing**: Invitation for contributions.
7. **License**: States the open-source license.

You can adjust the text as needed, add screenshots, and tweak the instructions to reflect any project-specific configurations.

Let me know if you need further modifications or explanations!
