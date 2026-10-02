# CINEBOX — Movie discovery website

A responsive Netflix-inspired movie discovery UI using the MovieBox H5 **catalog** endpoints from the supplied `moviebox.js` reference. This is a standalone project and is not branded as FathMovie.

## Features
- Dark, red-accented responsive layout for mobile, foldables, tablets and desktop.
- Catalog home sections and trending titles.
- Search across loaded titles, title detail modal, metadata, poster art and trailer link when supplied by the catalog.
- Vercel serverless functions proxy catalog requests so the browser does not need direct cross-origin access.
- Basic response caching and error messages.

## Deploy to Vercel
1. Extract this ZIP.
2. Upload the project to a new GitHub repository (keep `index.html`, `api/`, `package.json`, and `vercel.json` at the repository root).
3. In Vercel, choose **Add New → Project**, import that repository, and deploy. No build command or environment variables are required.
4. If the upstream API changes or blocks requests, the site will show an API error; this project does not control that third-party service.

## Run locally
Requires Node.js 20+ and the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Open the local URL printed by Vercel. Opening `index.html` directly from a file manager will not run the `/api/*` serverless routes.

## Scope and source notes
The supplied reference contains both catalog and playback extraction logic. This project intentionally implements catalog, trending and detail endpoints only; it does **not** extract protected stream URLs, cookies, or proxy movie playback. Use official/authorized sources for video playback. The third-party API is undocumented and can change without notice.
