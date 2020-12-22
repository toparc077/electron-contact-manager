## Installation

Use a package manager of your choice (npm, yarn, etc.) in order to install all dependencies

```bash
npm install
```

```bash
yarn install
```

## Setting up ENV variable

Copy `.env.sample` file and rename it to `.env`.
In the env file you can see the `REACT_APP_FILE_PATH` and please put the file path for encrypted contact data.

`Example: /Volumes/Work/1.cry`

## Usage
In order to run this project 2 scripts will need to be executed `dev:react` and `dev:electron`, run each one in a different terminal and always run `dev:react` before `dev:electron`, or `dev` to run them in order automatically

```bash
npm run dev:react
```
```bash
npm run dev:electron
```

or

```bash
npm run dev
```

## Packaging
To generate a project package run `package`

```bash
npm run package
```