# Jia — AI policy portfolio

A complete, responsive portfolio in plain HTML, CSS, and JavaScript. No dependencies, build step, API keys, backend, or tracking. Deploy the `dist` folder to GitHub Pages.

[Visit the portfolio](https://jjin18.github.io/jia-ai-policy/) · [Source repository](https://github.com/jjin18/jia-ai-policy)

## Preview locally

Open `dist/index.html` directly in a browser, or use Node.js 20+:

```sh
npm start
```

Visit http://127.0.0.1:4173. Installation is not required. Stop the server with Ctrl+C.

## Publish on GitHub Pages

1. Create a repository, for example `jia-ai-policy`, on GitHub. For the simplest setup, use a public repository.
2. Put this folder's contents at the repository root, including `.github/workflows/pages.yml`, `package.json`, `scripts`, and `dist`. Do not upload only the ZIP or nest everything under another `jia-ai-policy` directory.
3. Push to the `main` branch.
4. In the repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
5. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**. Future pushes to `main` deploy automatically.

This repository is configured to publish at `https://jjin18.github.io/jia-ai-policy/`. The Actions workflow deploys updates pushed to `main`.

The site uses relative paths, so the main page and writing pages also work in a differently named project repository or at a domain root. The deployment workflow automatically sets the custom 404 page's home link using GitHub's actual Pages base path.

Git example, from inside this folder, after creating an empty repository (replace OWNER and REPOSITORY):

```sh
git init -b main
git add .
git commit -m "Create Jia AI policy portfolio"
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

If GitHub reports a Pages configuration error, enable GitHub Actions as the publishing source, then rerun the workflow. GitHub's documentation: [custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Personalize the content

- **Homepage and bio:** edit `dist/index.html`. The biography expresses a portfolio theme; add Jia's verified experience, roles, education, and actual interests as appropriate.
- **Writing:** the three articles in `dist/writing/` are clearly marked illustrative samples created for this website. Replace them with Jia's actual work before presenting them as publications. Keep sample disclosures for any illustrative material you retain.
- **Contact:** the site links to the connected GitHub account, `https://github.com/jjin18`. No private email address is published. Replace the GitHub contact link with a preferred public email or profile if desired.
- **Colors and type:** the design tokens are at the top of `dist/styles.css`. System fonts keep the site self-contained.
- **Article categories:** `data-category` on homepage cards corresponds to the filter buttons' `data-filter` values.
- **404 home link:** the workflow sets this automatically. For manual deployment to another static host, set the `home-link` anchor in `dist/404.html` to the site's base path (usually `/`).

## Validation

```sh
npm run check
```

This checks JavaScript syntax, local file references, anchor targets, page titles, duplicate IDs, page language, and paths that could break under a GitHub Pages repository prefix.

The site includes keyboard focus styles, a skip link, accessible filter status updates, an expandable mobile menu with Escape handling, reduced-motion support, print styles for articles, and static article pages that remain readable without JavaScript.

## Files

```text
dist/
  index.html                 Homepage
  styles.css                 Responsive design and article print styles
  site.js                    Mobile menu and writing filters
  404.html                   Custom not-found page
  .nojekyll                  Static publishing marker
  assets/favicon.svg         Original favicon
  writing/                   Three full sample articles
.github/workflows/pages.yml   GitHub Pages deployment
scripts/serve.mjs             Dependency-free local preview
scripts/check.mjs             Static integrity checks
scripts/prepare-pages.mjs     Set the 404 link for the deployment base path
```

All illustrations are original inline SVG. NIST and OECD resources are linked as references; no affiliation or endorsement is implied.
