# 🛍️ E-commerce Catalog

A modern e-commerce catalog built with **Vue 3**, **TypeScript**, and **Vite** — featuring complete testing coverage and continuous integration with GitHub Actions.

---

## 🚀 Features

* Vue 3 with Composition API
* TypeScript support
* Vite for lightning-fast development
* Unit testing with **Vitest**
* E2E testing with **Playwright**
* Linting with **ESLint** + formatting with **Prettier**
* CI/CD automation using **GitHub Actions**
* Hot Module Replacement (HMR)

---

## 📋 Prerequisites

* Node.js (^20.19.0 || >=22.12.0)
* npm (comes with Node)

---

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/mmuchsin/ecommerce-catalog.git
cd ecommerce-catalog
```

2. Install dependencies:

```bash
npm install
```

---

## 🔧 Development

Start the development server:

```bash
npm run dev
```

Then visit:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧪 Testing

### Unit Tests

```bash
npm run test:unit
```

### End-to-End (E2E) Tests

```bash
# First time only
npx playwright install

# Then
npm run test:e2e
```

> 💡 If running inside CI/CD, ensure `headless: true` is set in your Playwright config.

---

## ⚙️ Continuous Integration & Deployment (CI/CD)

This project uses **GitHub Actions** for automated testing and deployment.

### Workflow Summary

| Branch  | Purpose                    |
| ------- | -------------------------- |
| `dev`   | Active feature development |
| `stage` | Staging / demo branch      |
| `main`  | Stable production branch   |

When you push to `main`, GitHub Actions will:

1. Install dependencies
2. Run ESLint, Vitest, and Playwright tests
3. Build the project
4. Deploy automatically to **GitHub Pages**

> 🧩 The workflow file lives at `.github/workflows/deploy.yml`.

---

## 🧩 Project Structure

```
.
|-- LICENSE
|-- README.md
|-- e2e
|   |-- tsconfig.json
|   `-- vue.spec.ts
|-- env.d.ts
|-- eslint.config.ts
|-- index.html
|-- package-lock.json
|-- package.json
|-- playwright.config.ts
|-- public
|   `-- favicon.ico
|-- src
|   |-- App.vue
|   |-- __tests__
|   |   |-- ProductDisplay.spec.ts
|   |   |-- ProductView.spec.ts
|   |   `-- useProduct.spec.ts
|   |-- assets
|   |   `-- img
|   |       `-- sad-face.svg
|   |-- components
|   |   |-- LoadingSpinner.vue
|   |   |-- ProductDisplay.vue
|   |   `-- ProductUnavailable.vue
|   |-- composables
|   |   `-- useProduct.ts
|   |-- main.ts
|   |-- types
|   |   `-- product.ts
|   `-- views
|       `-- ProductView.vue
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
|-- tsconfig.vitest.json
|-- vite.config.ts
`-- vitest.config.ts
```

---

## 🧱 Development Workflow

1. Pull the latest `dev` branch
2. Create a feature branch:

   ```bash
   git checkout -b feature/product-view
   ```
3. Code, test, and document
4. Run all tests before pushing:

   ```bash
   npm run test:unit && npm run test:e2e
   ```
5. Open a Pull Request to `dev`
6. Merge to `stage` (optional demo)
7. Merge to `main` → auto-deploy to GitHub Pages

### Conventional Commit Examples

```
feat: add product filter for men/women
fix: handle API error when product not found
docs: update README
test: add Playwright flow for next product button
```

---

## 🧪 Testing Strategy

| Level       | Tool                    | What It Tests                          |
| ----------- | ----------------------- | -------------------------------------- |
| Unit        | Vitest                  | Composables (`useProduct`), utilities  |
| Integration | Vue Test Utils + Vitest | Components & views (`ProductView.vue`) |
| E2E         | Playwright              | Full user journey in browser           |

> The goal: small, fast, and reliable tests that simulate real user experience.

---

## 🏗️ Building for Production

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

---

## 🧩 VS Code Setup

Recommended extensions:

* Vue Official (Volar)
* TypeScript Vue Plugin
* ESLint
* Prettier

---

## 🔍 Browser Setup

### Chrome/Edge/Brave

* Install [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* Enable **Custom Object Formatter**

### Firefox

* Install [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
* Enable **Custom Object Formatter**

---

## 📝 Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `npm run dev`       | Start dev server          |
| `npm run build`     | Build for production      |
| `npm run preview`   | Preview production build  |
| `npm run test:unit` | Run unit tests            |
| `npm run test:e2e`  | Run end-to-end tests      |
| `npm run lint`      | Lint source code          |
| `npm run format`    | Format code with Prettier |

---

## 🧭 Tech Stack Summary

| Category   | Tools                              |
| ---------- | ---------------------------------- |
| Framework  | Vue 3 (Composition API)            |
| Language   | TypeScript                         |
| Build Tool | Vite                               |
| Testing    | Vitest, Vue Test Utils, Playwright |
| CI/CD      | GitHub Actions                     |
| Deployment | GitHub Pages                       |

---

## 📜 License

[MIT License](LICENSE)

---

## 👤 Contributor

**Muchsin M.**
[GitHub](https://github.com/mmuchsin)

---

> 🧠 *“Good projects are built with code. Great projects are built with clarity.”*
