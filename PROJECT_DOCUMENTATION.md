# CollegeFoundersHub - Developer Documentation

## 1. Introduction

This document provides a comprehensive technical overview of the CollegeFounder application. It is intended for developers working on the project, providing in-depth details about the architecture, components, state management, and overall structure.

## 2. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Backend & Auth**: [Firebase](https://firebase.google.com/) (Authentication)
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation

## 3. Project Architecture

The application is structured using the Next.js App Router, which enables a clear separation between public-facing pages, authenticated app sections, and authentication flows.

### 3.1. Directory Structure

- `src/app`: Contains all routing logic.
  - `(app)`: This is a route group for all pages that require user authentication. The `layout.tsx` file in this directory establishes the main application shell, including the sidebar.
  - `(auth)`: This route group contains the login and signup pages. It uses a simpler layout centered on the screen.
  - `page.tsx`: The root page, which serves as the public, marketing landing page for the application.
  - `layout.tsx`: The root layout for the entire application, which sets up the HTML shell, fonts, and the global `Toaster` component.
  - `globals.css`: Contains global styles, Tailwind CSS layer directives, and HSL color variables for the ShadCN UI theme.

- `src/components`: Houses all reusable React components.
  - `ui`: Contains the primitive UI components from ShadCN (Button, Card, Input, etc.). These are generally not modified directly but are used to build feature-specific components.
  - `auth`: Components used specifically in the authentication flow, such as `LoginForm` and `SignupForm`.
  - `layout`: Components that define the main structure of the authenticated app, primarily `AppSidebar`.
  - `dashboard`: Components used only on the Dashboard page, like `DashboardChart`.

- `src/lib`: Core logic and utility functions.
  - `firebase.ts`: Initializes the Firebase app and exports the `auth` instance. **This file contains sensitive configuration and should be populated with your own Firebase project credentials.**
  - `utils.ts`: Contains the `cn` utility function, which merges Tailwind CSS classes and handles conditional class application.

- `src/hooks`: Custom React hooks.
  - `use-toast.ts`: A custom hook for displaying "toast" notifications, providing a simple API (`toast({...})`) to show success or error messages.

### 3.2. Routing and Layouts

The application utilizes Next.js's file-system-based routing with route groups to create distinct layouts.

- **Public Layout (`/`):** Defined by `src/app/page.tsx`. It's a full-width marketing page with a simple header and footer.
- **Auth Layout (`/login`, `/signup`):** Defined by `src/app/(auth)/layout.tsx`. It provides a simple, centered container for the login and signup forms.
- **App Layout (Authenticated Routes):** Defined by `src/app/(app)/layout.tsx`. This is the main shell for logged-in users, featuring a persistent sidebar (`AppSidebar`) and a main content area. Any new page added inside the `(app)` directory will automatically inherit this layout.

## 4. Authentication Flow

Authentication is managed entirely by Firebase Authentication using the Email/Password provider.

1.  **Signup (`/signup`):**
    - The `SignupForm` component (`src/components/auth/signup-form.tsx`) handles user registration.
    - It uses `react-hook-form` for form state management.
    - Validation is performed by `zod`, which includes a regex check to ensure the email address ends in `.edu`.
    - On successful submission, `createUserWithEmailAndPassword` from the Firebase SDK is called.
    - Immediately after creation, `updateProfile` is called to set the user's `displayName` from the "Full Name" field.
    - Upon success, the user is redirected to the `/dashboard`.

2.  **Login (`/login`):**
    - The `LoginForm` component handles user sign-in.
    - It uses `signInWithEmailAndPassword` from the Firebase SDK.
    - Upon successful login, the user is redirected to the `/dashboard`.

3.  **Session Management:**
    - Firebase automatically persists the user's session in the browser's local storage.
    - The `onAuthStateChanged` observer is used in various components (`AppSidebar`, `FeedPage`, `SettingsPage`) to get the current user's state and data. This is a real-time listener that ensures the UI always reflects the user's authentication status.

## 5. Core Feature Components Breakdown

### 5.1. Dashboard (`/dashboard`)
- **File**: `src/app/(app)/dashboard/page.tsx`
- **Functionality**: Displays a snapshot of user activity.
- **Components**:
  - `StatCard`: A reusable component within the page to display key metrics (e.g., "Tasks Completed").
  - `DashboardChart` (`src/components/dashboard/dashboard-chart.tsx`): A client-side component that uses the `recharts` library to render a bar chart. It is isolated to prevent server-side rendering errors.
- **Data**: All data is currently mocked within the component files. In a production environment, this data would be fetched from a backend service (e.g., Firestore).

### 5.2. Startup Feed (`/feed`)
- **File**: `src/app/(app)/feed/page.tsx`
- **Functionality**: Allows users to create and view posts.
- **State Management**:
  - `user`: Stores the currently logged-in user from Firebase.
  - `newPost`, `isPosting`: Manages the content and loading state of the new post form.
  - `feedPosts`: An array of all posts displayed on the feed.
  - `likedPosts`: An array of post IDs that the current user has liked, used to toggle the like button's state.
- **Key Functions**:
  - `handlePost`: Adds a new post to the `feedPosts` state. Simulates a network request with `setTimeout`.
  - `handleLike`: Toggles a post's like status and count.
  - `handleShare`: Copies the current URL to the clipboard.

### 5.3. Task Exchange (`/tasks`)
- **File**: `src/app/(app)/tasks/page.tsx`
- **Functionality**: Displays available tasks and tasks created by the user in separate tabs.
- **Components**: Uses ShadCN `Tabs` component to switch between "Available Tasks" and "My Tasks".
- **Data**: Uses two separate mocked data arrays: `availableTasksData` and `myTasksData`.
- **Key Functions**:
  - `handleApply`, `handleNewTask`, `handleManageTask`: These functions currently trigger toast notifications to simulate user actions.

### 5.4. Resource Hub (`/resources`)
- **File**: `src/app/(app)/resources/page.tsx`
- **Functionality**: A filterable grid of downloadable resources.
- **State Management**:
  - `searchTerm`: Stores the value of the search input to filter resources.
  - `downloading`: Stores the ID of the resource currently being "downloaded" to show a loading state on the button.
- **Key Functions**:
  - `handleDownload`: Simulates a file download with a `setTimeout` and shows multiple toasts to indicate progress.

### 5.5. Connections (`/connections`)
- **File**: `src/app/(app)/connections/page.tsx`
- **Functionality**: A filterable grid of user profiles to connect with.
- **State Management**:
  - `connected`: An array of user IDs that a connection request has been sent to. This is used to disable the "Connect" button and show "Request Sent".
  - `searchTerm`: Filters the list of connections based on name, skills, or university.

### 5.6. Settings (`/settings`)
- **File**: `src/app/(app)/settings/page.tsx`
- **Functionality**: Allows users to update their profile and account information.
- **State Management**: Uses numerous `useState` hooks to manage each form field individually (e.g., `displayName`, `bio`, `newPassword`).
- **Key Functions**:
  - `handleProfileSave`: Updates the user's `displayName` in Firebase Auth using `updateProfile`. In a full app, this would also save other profile fields to a database like Firestore.
  - `handleAccountSave`: Handles password changes. It requires the user's current password for security. It uses `reauthenticateWithCredential` before calling `updatePassword` to ensure the user is authenticated.

## 6. UI and Styling

- **Theme**: The color palette is defined in `src/app/globals.css` using HSL CSS variables, following the ShadCN convention. The primary colors are `--primary` (dark blue), `--background` (light gray), and `--accent` (purple).
- **Fonts**: `Inter` for body text and `Space Grotesk` for headlines are configured in `src/app/layout.tsx` and applied via CSS variables in `tailwind.config.ts`.
- **Component Styling**: All styling is done via Tailwind CSS utility classes. The `cn` utility from `src/lib/utils.ts` is used everywhere to merge classes and handle conditional styling.

## 7. Future Development & Scaling

- **Database**: To move beyond a prototype, a database like **Firestore** is essential. Each user would have a document in a `users` collection storing their profile data (bio, skills, startup info). Other collections for `posts`, `tasks`, and `resources` would also be needed.
- **State Management**: For a larger application, consider a more robust state management library like **Zustand** or **Redux Toolkit** to handle global state, reducing prop drilling and simplifying state logic.
- **API Routes**: While many operations can be done client-side with the Firebase SDK, Next.js API Routes (or Server Actions) would be necessary for more complex backend logic, such as interacting with third-party services or performing sensitive operations.
