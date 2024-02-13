# DMVis
Framework for making complex decision matrix visualizations.

## Useful docs
- [SvelteKit docs](https://kit.svelte.dev/docs).
- [Packaging docs](https://kit.svelte.dev/docs/packaging).

## Setting up
You will need to install the following dependencies:
- [Visual Studio Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

We have pinned our node version in `.nvmrc` so you can use `nvm` to install the
correct version of node. If you have `nvm` installed (instructions for 
[Linux](https://github.com/nvm-sh/nvm) and
[Windows](https://github.com/coreybutler/nvm-windows)),
you can use the following command to install the correct version of node:
```bash
nvm install
```

Once you have installed the above dependencies, you can install the packages
using the following command:
```bash
npm install
```

## Developing
Start a development server:
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building
To build your library:
```bash
npm run package
```

To create a production version of your showcase app:
```bash
npm run build
```

You can preview the production build with `npm run preview`.
