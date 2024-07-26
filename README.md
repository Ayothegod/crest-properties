# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid@latest

# create a new project in my-app
npm init solid@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _presets_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different preset, add it to the `devDependencies` in `package.json` and specify in your `app.config.js`.

## This project was created with the [Solid CLI](https://solid-cli.netlify.app)


    <!-- "@hookform/resolvers": "^3.9.0",
    "@kobalte/core": "^0.13.4",
    "@mdx-js/mdx": "^2.3.0",
    "@solidjs/router": "^0.14.1",
    "@solidjs/start": "^1.0.6",
    "@vinxi/plugin-mdx": "^3.7.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-solid": "^0.414.0",
    "react-hook-form": "^7.52.1",
    "solid-js": "^1.8.18",
    "solid-mdx": "^0.0.7",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "vinxi": "^0.4.1",
    "zod": "^3.23.8" -->