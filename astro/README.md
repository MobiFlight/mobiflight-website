# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run test:smoke`      | Run the Playwright smoke tests                   |

## 🧪 Smoke Tests

The Playwright smoke tests in `tests/smoke/` load every page and check the cookie consent, `/sponsors.json`, the redirects and the internal links. They run after each deploy: on the preview site of a pull request, and on production after a push to `main` and once a day.

To run them locally, build the site first. The tests start `npm run preview` themselves:

```sh
npx playwright install chromium
npm run build
npm run test:smoke
```

Set `BASE_URL` to test a deployed site instead, e.g. `BASE_URL=https://mobiflight.com npm run test:smoke`. The redirects and headers from `staticwebapp.config.json` are only tested then, as `npm run preview` doesn't apply them. The Google Tag Manager tests only run when `PUBLIC_GTM_ID` is set to the container ID the site was built with.

The tests never submit forms, and requests to Google Tag Manager, Google Analytics and the MailerLite pop-up are blocked, so they are safe to run against production.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
