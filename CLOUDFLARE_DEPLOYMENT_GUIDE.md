# Cloudflare Deployment Guide for Static & SPA Projects

This guide documents the root causes, solutions, and best practices for deploying static frontends (Vite, React, Vue, Svelte, etc.) to Cloudflare Workers and Cloudflare Pages, specifically avoiding common Wrangler deployment pitfalls.

---

## 1. Issue: Missing Entry-Point or Assets Directory

### Symptom
During build or deployment, Wrangler exits with:
```
✘ [ERROR] Missing entry-point to Worker script or to assets directory

If you are uploading a directory of assets, you can either:
- Specify the path via CLI: (ex: npx wrangler deploy --assets=./dist)
- Or add the following to your "wrangler.toml" file:
  [assets]
  directory = "./dist"
```

### Root Cause
Modern Wrangler versions (v3.80+) and Cloudflare Workers Static Assets require an explicit `[assets]` table in `wrangler.toml`. Legacy configuration keys like `pages_build_output_dir = "dist"` alone are not sufficient when Wrangler evaluates the worker deployment target.

### Solution
Add the `[assets]` section to your `wrangler.toml`:

```toml
name = "your-app-name"
compatibility_date = "2026-10-01"

[assets]
directory = "./dist"
```

---

## 2. Issue: Invalid `_redirects` Infinite Loop (Error Code 100324)

### Symptom
Cloudflare API deployment fails with:
```
✘ [ERROR] A request to the Cloudflare API failed.
Invalid _redirects configuration:
Line 1: Infinite loop detected in this rule. This would cause a redirect to strip `.html` or `/index` and end up triggering this rule again. [code: 100324]
```

### Root Cause
Traditional static hosts (such as Netlify) recommend placing a `public/_redirects` file containing:
```
/* /index.html 200
```
In Cloudflare:
1. The edge asset server automatically canonicalizes URLs by stripping `.html` extensions and mapping `/index.html` back to `/`.
2. A wildcard rewrite rule redirecting `/*` to `/index.html` creates an infinite loop (`/` -> `/index.html` -> `/` -> ...).
3. Cloudflare's deployment validator detects this recursion and aborts the release with error code `100324`.

### Solution

#### Step 1: Remove Conflicting `_redirects`
Delete `public/_redirects` (or remove the `/* /index.html 200` line) so it is not copied into `dist/`.

#### Step 2: Enable Native SPA Routing in `wrangler.toml`
Cloudflare provides built-in client-side routing support via the `not_found_handling` directive. Update `wrangler.toml`:

```toml
name = "your-app-name"
compatibility_date = "2026-10-01"

[assets]
directory = "./dist"
not_found_handling = "single-page-application"
```

When set to `"single-page-application"`, Cloudflare automatically serves `./dist/index.html` for any client-side routes that do not match a physical static asset file, returning HTTP 200 without triggering redirect loops.

---

## 3. Recommended Production `wrangler.toml` Template

Use this standard template for single-page applications built with Vite:

```toml
name = "unicash"
compatibility_date = "2026-10-01"
pages_build_output_dir = "dist"

[assets]
directory = "./dist"
not_found_handling = "single-page-application"
```

---

## 4. Pre-Deployment Verification Checklist

Before pushing to your deployment branch:

1. **Verify Local Build**:
   ```bash
   npm run build
   ```
   Ensure `./dist/index.html` exists and is non-empty.

2. **Verify No Forbidden `_redirects`**:
   Check that `./dist/_redirects` does not contain wildcard rewrite loops:
   ```bash
   # Windows PowerShell
   Test-Path dist/_redirects
   ```

3. **Validate Wrangler Config**:
   Verify that `wrangler.toml` includes both `[assets]` and `not_found_handling = "single-page-application"`.

4. **Verify Clean Git Tracking**:
   Ensure `.gitignore` excludes `dist/` and `node_modules/` from version control, allowing Cloudflare build runners to execute `npm run build` cleanly in an isolated environment.
