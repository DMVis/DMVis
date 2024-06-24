<div align="center">

<h1>DMVis</h1>

[Documentation](https://dmvis-docs.netlify.app/) • [Demo website](https://dmvis.netlify.app/) • [Gallery repository](https://github.com/DMVis/Gallery) • [Contributing](CONTRIBUTING.md)

[![NPM Version](https://img.shields.io/npm/v/%40dmvis%2Fdmvis)](https://www.npmjs.com/package/@dmvis/dmvis)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dmvis/dmvis/tests.yaml)
![GitHub License](https://img.shields.io/github/license/dmvis/dmvis)

A Framework for Interactive Multi-Criteria Decision Making with Data Visualisations

</div>

## Introduction

DMVis is an innovative platform designed to revolutionize multi-criteria decision making through the power of data visualisation. In the existing landscape, decision making tools frequently restrict users from independently exploring their information space. Users are generally confined to navigating through cumbersome lists or relying on opaque recommendations, as seen in platforms like Funda and Netflix. This project aspires to transcend these limitations by leveraging data visualisations, an impactful but underemployed tool in public domains for multi-criteria decision making.

The need for DMVis stems from two core challenges in the current utilization of data visualisations. Firstly, the transition of sophisticated visualisation concepts from academic research to functional, user-accessible tools remains a significant hurdle. Secondly, the prevalent visualisation library, D3.js, is seldom integrated into scalable interactive frameworks such as Angular, React, or Svelte.

DMVis aims to empower users to navigate through their decision making processes with greater clarity and insight, leveraging the untapped potential of data visualisations in everyday decision making tools. Additionally, it will serve as a model, enabling future visualisation researchers to augment the gallery with their innovative decision making visualisations by employing the DMVis components. The project will be a step forward in making advanced data visualisation techniques more accessible ultimately empowering people to make data informed decisions in various application domains.

## Project context

The framework is designed to be flexible and extensible, allowing developers to create a wide range of visualisations to suit their needs. DMVis is built using [Svelte](https://svelte.dev/) and [D3.js](https://d3js.org/), making it easy to integrate with existing web applications.

This application was written for the [Softwareproject](https://softwareprojecten.sites.uu.nl/) course at [Utrecht University](https://www.uu.nl/). The goal of the course is to develop a software application for a real-world client. The client for this project is [Evanthia Dimara](https://www.uu.nl/staff/EDimara/0), an Assistant Professor and a researcher in Information Visualisation at the [Visualisation and Graphics Group (VIG)](https://www.uu.nl/en/research/interaction/visualization-and-graphics/people) at Utrecht University.

## Demo

You can view a live demo of the project [here](https://dmvis.netlify.app/). It displays the [Gallery](https://github.com/DMVis/Gallery) project which was created to showcase the visualisations that can be created using the DMVis framework.

## Setting up

You will need to install the following dependencies:

- [Node.js](https://nodejs.org/en/download/) (preferably version `20.x` or higher)
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
using the following commands:

```bash
npm install --save-dev husky
npm install
```

To maintain code quality, `husky` is used to run tests, linting, and formatting checks
before commits. To enable this, you need to install the git hooks:

```bash
npx husky install
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

## Documentation

The documentation is written in markdown and rendered using [docsify](https://docsify.js.org/). You can check it out over [here](https://dmvis-docs.netlify.app/). To serve the documentation locally, run the following command:

```bash
npm run docs
```

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.
