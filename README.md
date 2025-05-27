# Ambyint-Videos

> Dive into a world of movies—search by title, explore in-depth reviews and ratings,
> discover cast & crew details, and effortlessly build a personalized watchlist.
>
> 🔗 **Live Demo:** https://main.d3hqhituzf9s4m.amplifyapp.com/

---

## 📖 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Running Locally](#running-locally)
   - [Production Build](#production-build)
4. [Testing](#-testing)

---

## 🚀 Features

### Home page

- **Movie Listings**: Browse lists of movies fetched from TMDB.
- **Category Filters**: Filter movies by category:
  - **Now Playing**
  - **Popular**
  - **Top Rated**
  - **Upcoming**
- **Movie Search**: Quickly find any movie by title.

### Movie Details page

- **Movie Details**: View synopsis, ratings, reviews, and full cast & crew.
- **Top Actors**: See top-billed cast for each film.
- **Production Companies**: Discover studios behind the movies.
- **Image Gallery**: Browse stills and posters.

---

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Ant Design
- **Icons**: lucide-react
- **Testing**: Playwright

---

## 🏁 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x or Yarn ≥ 1.x

---

### Installation

1. **Clone the repository**

```
git clone https://github.com/savalanpour/Ambyint-Videos.git
cd Ambyint-Videos
```

2. **Install dependencies**

```
npm install
# or
yarn
```

### Environment Variables

Create a `.env.local` file in the project root with the following contents:

```dotenv
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TEST_URL=http://localhost:3000
NEXT_PUBLIC_TMDB_API_KEY={YOUR themoviedb.org API KEY}
```

#### Getting a TMDB API Key

1. Sign up or log in at [themoviedb.org](https://www.themoviedb.org).
2. Go to **Settings** → **API** in your account menu.
3. Apply for an **API v3 Key**, then copy it into `NEXT_PUBLIC_TMDB_API_KEY` in your `.env.local`.

### Running Locally

To start the development server, run:

```
npm run dev
# or
yarn dev
```

### Production Build

To create a production build, run:

```
npm run build
npm start
# or
yarn build
yarn start
```

## 🧪 Testing

This project uses Playwright for end-to-end tests:

```
npm run e2e
# or
npm run e2e:browser
```

npm run e2e

- Runs all tests in headless mode (no UI), which is faster and ideal for CI pipelines.

npm run e2e:browser

- Runs tests in headed mode (browsers open visibly) so you can watch and debug them.
