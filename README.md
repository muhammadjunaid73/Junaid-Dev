# Muhammad Junaid — Personal Portfolio

A responsive, single-page portfolio for Muhammad Junaid, a Computer Science student and web developer. It presents an introduction, skills, selected projects, and contact options.

## Features

- Responsive navigation with a mobile menu
- Light and dark themes, with the preference saved in browser storage
- About, skills, projects, and contact sections
- Client-side contact form validation and Formspree submission
- Active-section navigation, accessible controls, and a scroll-to-top button
- Search metadata, Open Graph/Twitter cards, structured data, `robots.txt`, and `sitemap.xml`

## Tech stack

- HTML5
- CSS3 (custom properties/design tokens and responsive styles)
- Vanilla JavaScript
- Google Fonts (Inter)
- Formspree for contact form submissions

There is no package manager or build step. This is a static website.

## Run locally

Open `index.html` in a browser, or serve the project root with any local static file server. For example, with Python installed:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

```text
.
├── index.html       # Page content and metadata
├── main.js          # Menu, theme, form, section tracking, scroll control
├── css/
│   ├── tokens.css   # Theme and design variables
│   └── styles.css   # Layout, components, and responsive styles
├── images/          # Profile and project images
├── icons/           # SVG icons used by the page
├── robots.txt
└── sitemap.xml
```

## Content and deployment notes

- Production URL: <https://junaid-dev-portfolio-alpha.vercel.app/>. This hostname is configured in the canonical URL, Open Graph metadata, structured data, `robots.txt`, and `sitemap.xml`. If you connect a custom domain, update all of those references together.
- The contact form posts to the Formspree endpoint configured in `index.html`; verify that endpoint and its account settings before relying on submissions.
- The About section links to `assets/files/Muhammad-Junaid-CV.pdf`. Add the CV at that path or update the link.
- Update the profile, project descriptions, links, and social/contact details in `index.html` as needed.

## Deploy

The project can be deployed to any static hosting provider, including Vercel. Import the repository and use the project root as the root directory. Since there is no build step, leave the build command empty and publish the root directory. Configure the production branch in the hosting dashboard; later pushes to that branch can trigger automatic deployments.
