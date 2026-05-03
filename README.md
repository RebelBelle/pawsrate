# PawsRate Login Page

A clean, minimal React login page using SCSS styling.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Visit http://localhost:5173/

## Project Structure

```
src/
├── components/
│   └── FormPanel.tsx      # Login form component
├── styles/
│   ├── main.scss          # Main styles entry point
│   └── FormPanel.scss     # FormPanel component styles
└── LoginPage.tsx          # Main login page component
```

## Git Setup

This project includes a comprehensive `.gitignore` file that excludes:
- `node_modules/` (dependencies)
- Build outputs (`dist/`, `build/`)
- Environment files (`.env*`)
- IDE files (`.vscode/`, `.idea/`)
- OS files (`.DS_Store`)
- Logs and cache files

Only 11 essential files are tracked in git.

## Features

- Clean, accessible login form
- SCSS styling with design tokens
- Responsive design
- TypeScript support
- Hot module replacement for development

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build