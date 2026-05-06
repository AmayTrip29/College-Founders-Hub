# CollegeFoundersHub

## Project Overview
CollegeFoundersHub is a Next.js web application designed to be an exclusive network for student entrepreneurs. It provides a platform for students to connect, collaborate, validate ideas, and find the resources they need to build and launch their startups. The application is built with a modern tech stack including Next.js, React, TypeScript, and Firebase for backend services. The UI is crafted with Tailwind CSS and ShadCN UI components for a clean, professional, and responsive experience.

## Core Features

- **User Authentication**: Secure user registration and login system, restricted to users with a valid `.edu` college email address.
- **Startup Feed**: A social feed where users can post startup ideas, share problems, and receive feedback from the community through likes and comments.
- **Task Exchange**: A marketplace for founders to post tasks they need help with (e.g., landing page design, API integration) and offer rewards or collaboration invites. Users can also apply to complete these tasks.
- **Resource Hub**: A shared library where users can upload and download valuable resources like pitch deck templates, financial models, and legal documents.
- **Founder Connections**: A searchable directory of all users on the platform, allowing students to find and connect with potential co-founders, collaborators, or mentors based on skills, university, and more.
- **User Profiles & Settings**: Comprehensive user profiles showcasing skills, bio, and startup information. Users can update their profile and account settings.
- **Dashboard**: A personalized dashboard that provides users with a snapshot of their activity, including tasks completed, active collaborations, new connections, and resources shared.

## Project Structure

The project follows the standard Next.js App Router structure. Key directories include:

```
/
├── public/                 # Static assets
├── src/
│   ├── app/                # Application routes
│   │   ├── (app)/          # Authenticated user routes (dashboard, feed, etc.)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (auth)/         # Authentication routes (login, signup)
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css     # Global styles and ShadCN theme variables
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Public landing page
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication-related components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── layout/         # Layout components (sidebar, etc.)
│   │   └── ui/             # ShadCN UI components
│   ├── hooks/              # Custom React hooks (e.g., use-toast)
│   ├── lib/                # Utility functions and libraries
│   │   ├── firebase.ts     # Firebase configuration and initialization
│   │   └── utils.ts        # General utility functions (e.g., cn for classnames)
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
└── package.json            # Project dependencies and scripts
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AmayTrip29/College-Founders-Hub
    cd College-Founders-Hub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Firebase:**
    - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    - In your project, create a new Web App.
    - Copy the Firebase configuration object provided.
    - Paste your configuration into `src/lib/firebase.ts`.
    - In the Firebase console, go to **Authentication** -> **Sign-in method** and enable the **Email/Password** provider.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application should now be running on [http://localhost:3000](http://localhost:3000) (or the specified port).

---

### Credits

Developed by **[Amay Tripathi](https://github.com/AmayTrip29)**.
