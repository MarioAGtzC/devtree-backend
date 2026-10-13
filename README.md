# DevTree API

REST API for DevTree, a "link-in-bio" service for developers. It handles sign-up and login, profile management (username, bio, profile image, links) and public profile lookup by username. A separate frontend uses it.

## The Problem It Solves

Developers keep their work in many places: GitHub, a portfolio, LinkedIn, blogs, social media. DevTree gives each person **one public page under one username** that collects all of those links. Visitors need nothing more than the username to see it. The owner can claim a handle, check whether it's free, and update their bio, photo and links whenever they want.

## My Role and Process

**Course project (2025), built solo.** I followed the course and extended the project. I wrote the whole backend: API design, data model, authentication, validation, image uploads and API documentation.

How it's built:

- **Simple domain model.** A single `User` document holds both the account credentials and the public profile, because the profile *is* the user's page.
- **Layered request pipeline.** Each request goes through routes, validators, a body whitelist, optional authentication, then a controller. Validation runs before any business logic.
- **Strict input handling.**
  - Usernames are turned into URL-safe slugs, stored in lowercase, and checked for uniqueness on sign-up and on profile edits.
  - Each endpoint keeps only the body fields it explicitly allows (`filterBody`). Any other fields are dropped before they reach the database.
  - Passwords must be at least 8 characters and include an uppercase letter, a lowercase letter, a number and a symbol.
- **Safe public views.** `GET /:username` returns the profile without the password, email, internal IDs or timestamps. `POST /search` tells the frontend whether a username is available, so it can build a live username picker.
- **Image lifecycle.** When a user uploads a new profile image, the previous one is deleted from cloud storage, so no orphaned files build up.
- **Environment-aware CORS.** Only the configured frontend origin is allowed. Running with the `--api` flag (`npm run dev:api`) also allows requests with no origin, for testing with tools like Postman.
- **Self-documenting API.** The OpenAPI spec is generated from JSDoc annotations in the route files and served as interactive docs at `/docs`.

## Technologies and Tools

**Language and framework**
- **TypeScript on Node.js with Express 5:** HTTP server, routing and middleware pipeline.

**Data**
- **MongoDB with Mongoose:** stores user accounts and profiles. Unique constraints on username and email, plus automatic timestamps.

**Authentication and security**
- **JSON Web Tokens (jsonwebtoken):** a token is issued at login (valid for 180 days) and checked by a middleware on protected `/user` routes.
- **bcryptjs:** hashes passwords with a salt before storing them.
- **express-validator:** validates and sanitizes requests: required fields, email format, strong-password rules, and username/email uniqueness.
- **CORS allow-list:** limits which frontend origin can call the API.

**Media**
- **Cloudinary:** stores and serves profile images under UUID-based IDs and replaces the old image on each new upload.
- **formidable:** parses the `multipart/form-data` profile image uploads.

**Supporting utilities**
- **slug:** turns usernames into URL-safe handles for public profile URLs.
- **dotenv:** loads configuration from the environment (database connection, JWT secret, Cloudinary credentials, frontend origin).

**API documentation**
- **swagger-jsdoc + swagger-ui-express:** OpenAPI 3.0 spec generated from route annotations and served as interactive docs.

**Development**
- **nodemon + ts-node:** reloads the TypeScript server automatically during development. `tsc` compiles it for production.

## Results and Impact

- **Full profile lifecycle in a deployed API:** registration, login, profile editing, profile image upload, username availability checks and public profile lookup.
- **Validation at the edges:** field whitelisting, slugged usernames and uniqueness checks keep unexpected or duplicate data out of the database.
- **No sensitive data in public responses:** public lookups never return passwords, emails or internal fields.
- **No orphaned images:** replacing a profile image deletes the old one in Cloudinary.
- **Self-service docs:** every endpoint can be explored and tried from the browser through Swagger UI.

This is a course project. It has no production traffic or performance metrics to report, and the repository contains no automated tests or CI pipeline yet.

## Screenshots and Live Demo

- **Live demo:** the interactive Swagger UI (link below) lists every endpoint and lets you send requests from the browser.
- **Screenshots:** there are none in this repository yet. Add them under `docs/screenshots/` (for example, a capture of the Swagger UI) and reference them here.

## Links

- **Live API docs:** https://apidevtree.greenie.dev/docs
- **Frontend repository:** `devtree-frontend` (the client application that uses this API)
