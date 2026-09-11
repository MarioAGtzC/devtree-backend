# DevTree — Backend

DevTree is a REST API for a "link-in-bio" service aimed at developers: each user gets a single public profile page listing their name, description, profile image, and a curated set of links (portfolio, GitHub, social media, etc.), shareable through one URL and username. This repository contains the backend that powers authentication, profile management, and public profile lookup for the DevTree platform.

## The Problem It Solves

Developers and creators often have their presence scattered across many platforms — GitHub, LinkedIn, a portfolio site, Twitter/X, a blog — with no single, clean place to point people to. Services like Linktree solve this for a general audience, but DevTree focuses that same idea on developers: one shareable page, one username, all the important links in one place. This API is the backend that makes that possible: it lets a person register an account, claim a unique username, personalize their public page (bio and photo), and manage their list of links, while giving anyone else a fast, read-only way to look up that public page by username.

## My Role and Process

I designed and built the entire backend as a solo project, covering the API design, data modeling, authentication flow, and third-party integrations end to end. The approach followed was:

- **Modeled the core domain** around a single `User` entity that owns both profile data (name, description, image, links) and account credentials, keeping the data model intentionally simple since a user's public page *is* their profile.
- **Layered the API** into routes, controllers, middlewares, and validators so that request parsing, business logic, and data access stay separated and each request goes through a consistent pipeline: validate → sanitize/filter → authenticate (when needed) → execute.
- **Built authentication around JWT**, issuing long-lived tokens on login and protecting private routes (like editing the profile or uploading an image) with a reusable middleware that resolves the token back to a full user record.
- **Enforced data integrity at the edges**: usernames are normalized into URL-safe slugs and checked for uniqueness before an account is created or updated, and only whitelisted fields from each request body are allowed to reach the database, reducing the surface for unexpected or malicious input.
- **Wired up an image pipeline** so users can upload a profile picture; the old image is automatically removed from cloud storage when a new one is uploaded, avoiding orphaned files.
- **Exposed a public-facing endpoint** (`GET /:username`) that returns a stripped-down, safe view of a profile (no password, email, or internal fields) so the API can support public profile pages without leaking sensitive data.
- **Deployed the service to Render** and configured environment-based CORS so only the approved frontend origin (or direct API testing) can call the API.

## Technologies and Tools Used

- **Node.js + Express** — core HTTP server and routing layer for the REST API.
- **TypeScript** — static typing across models, controllers, and middlewares to catch errors before runtime and keep request/response shapes explicit.
- **MongoDB + Mongoose** — persistent storage and schema modeling for user accounts and profile data, including uniqueness constraints on username and email.
- **JWT (jsonwebtoken)** — stateless authentication; issues a signed token on login and verifies it on every protected request via a custom middleware.
- **bcryptjs** — one-way password hashing with salting before storing credentials.
- **express-validator** — request validation and sanitization (required fields, email format, strong-password rules, trimming) run before any controller logic executes.
- **slug** — normalizes user-chosen usernames into URL-safe, lowercase slugs so they can be used directly in a public profile URL.
- **Cloudinary** — cloud storage and delivery for profile images, including replacing/deleting the previous image when a user uploads a new one.
- **formidable** — parses multipart/form-data uploads for the profile image endpoint.
- **CORS (with environment-based allow-list)** — restricts which frontend origins can call the API, configurable per environment via `FRONTEND_URL`.
- **dotenv** — environment-based configuration for secrets and connection strings (MongoDB URI, JWT secret, Cloudinary credentials, frontend origin).
- **Render** — hosting/deployment platform for the live API.
- **nodemon / ts-node** — local development workflow with automatic TypeScript reloads.

## Results or Impact

- Delivered a fully working, deployed API that supports the complete profile lifecycle: registration, login, profile editing, image upload, and public profile lookup by username.
- The custom filtering and validation pipeline (whitelisting request fields, normalizing usernames, checking uniqueness) removes an entire class of bugs and injection risks around unexpected or duplicate data, without relying on a heavier framework.
- The image-replacement logic keeps cloud storage usage lean by automatically cleaning up old assets instead of accumulating orphaned files per user.
- The API is live and consumed by a companion frontend, demonstrating the full authentication and profile-management flow in a real, publicly accessible deployment.

## Images, Screenshots, or Live Demos

This repository is API-only and does not include UI screenshots. You can explore the live API directly at the link below (e.g. `GET /:username` for a public profile, or use a tool like Postman/Insomnia against the `/auth` and `/user` endpoints). Screenshots of the companion frontend, if added, should be placed in a `docs/` or `assets/` folder and referenced here.

## Live API / Repository

- **Live API:** [https://apidevtree.greenie.dev/](https://apidevtree.greenie.dev/) (hosted on Render)
- **Repository:** [https://github.com/MarioAGtzC/devtree](https://github.com/MarioAGtzC/devtree)
