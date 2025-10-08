# Contributing to Agentic-code

First off, thank you for considering contributing to Agentic-code! We welcome any help, from reporting a bug to submitting a feature request or writing code. This project thrives on community contributions.

This document provides guidelines to ensure a smooth and effective collaboration process.

## Before you begin

### Sign our Contributor License Agreement

Contributions to this project must be accompanied by a
[Contributor License Agreement](https://cla.developers.google.com/about) (CLA).
You (or your employer) retain the copyright to your contribution; this simply
gives us permission to use and redistribute your contributions as part of the
project.

If you or your current employer have already signed the Google CLA (even if it
was for a different project), you probably don't need to do it again.

Visit <https://cla.developers.google.com/> to see your current agreements or to
sign a new one.

### Review our Community Guidelines

This project follows [Google's Open Source Community
Guidelines](https://opensource.google/conduct/).

## How Can I Contribute?

* **Reporting Bugs**: If you find a bug, please open an issue and provide as much detail as possible, including steps to reproduce it.
* **Suggesting Enhancements**: If you have an idea for a new feature or an improvement, open an issue to discuss it. This allows us to align on the proposal before any code is written.
* **Pull Requests**: If you're ready to contribute code, this is the place to start.

## Your First Code Contribution

Unsure where to begin? A great place to start is by looking for issues tagged with `good first issue` or `help wanted`.

### Setting Up Your Development Environment

**Prerequisites:**

1.  **Node.js**:
    - **Development**: Please use Node.js version `20.19.0` exactly. You can use a tool like [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:
      ```bash
      nvm install 20.19.0
      nvm use 20.19.0
      ```
    - **Production**: For running the CLI in a production environment, any Node.js version `>=20.0.0` is acceptable.
2.  **Git**

**Setup Steps:**

1.  **Fork the repository**: Click the "Fork" button on the top right of the repository page.
2.  **Clone your fork**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/agentic-code.git
    cd agentic-code
    ```
3.  **Install Dependencies**: We use `npm` for package management.
    ```bash
    npm install
    ```
4.  **Build the Project**:
    ```bash
    npm run build
    ```
5.  **Link for Local Development**: To use your local version of `agentic-code` globally, run:
    ```bash
    npm link
    ```
    Now, when you run `agentic-code` in your terminal, it will use your local development version.

### Enabling Sandboxing

[Sandboxing](#sandboxing) is highly recommended and requires, at a minimum, setting `AGENTIC_SANDBOX=true` in your `~/.env` and ensuring a sandboxing provider (e.g. `macOS Seatbelt`, `docker`, or `podman`) is available. If migrating from older setups, `GEMINI_SANDBOX` is still recognized but deprecated. See [Sandboxing](#sandboxing) for details.

To build both the `agentic-code` CLI utility and the sandbox container, run `build:all` from the root directory:

```bash
npm run build:all
```

To skip building the sandbox container, you can use `npm run build` instead.

## Contribution Process

### Code Reviews

All submissions, including submissions by project members, require review. We
use [GitHub pull requests](https://docs.github.com/articles/about-pull-requests)
for this purpose.

### Pull Request Guidelines

To help us review and merge your PRs quickly, please follow these guidelines. PRs that do not meet these standards may be closed.

#### 1. Link to an Existing Issue

All PRs should be linked to an existing issue in our tracker. This ensures that every change has been discussed and is aligned with the project's goals before any code is written.

- **For bug fixes:** The PR should be linked to the bug report issue.
- **For features:** The PR should be linked to the feature request or proposal issue that has been approved by a maintainer.

If an issue for your change doesn't exist, please **open one first** and wait for feedback before you start coding.

#### 2. Keep It Small and Focused

We favor small, atomic PRs that address a single issue or add a single, self-contained feature.

- **Do:** Create a PR that fixes one specific bug or adds one specific feature.
- **Don't:** Bundle multiple unrelated changes (e.g., a bug fix, a new feature, and a refactor) into a single PR.

Large changes should be broken down into a series of smaller, logical PRs that can be reviewed and merged independently.

#### 3. Use Draft PRs for Work in Progress

If you'd like to get early feedback on your work, please use GitHub's **Draft Pull Request** feature. This signals to the maintainers that the PR is not yet ready for a formal review but is open for discussion and initial feedback.

#### 4. Ensure All Checks Pass

Before submitting your PR, ensure that all automated checks are passing by running `npm run preflight`. This command runs all tests, linting, and other style checks.

#### 5. Update Documentation

If your PR introduces a user-facing change (e.g., a new command, a modified flag, or a change in behavior), you must also update the relevant documentation in the `/docs` directory.

#### 6. Write Clear Commit Messages and a Good PR Description

Your PR should have a clear, descriptive title and a detailed description of the changes. Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard for your commit messages.

- **Good PR Title:** `feat(cli): Add --json flag to 'config get' command`
- **Bad PR Title:** `Made some changes`

In the PR description, explain the "why" behind your changes and link to the relevant issue (e.g., `Fixes #123`).

### Contribution Workflow

1.  **Create a Branch**: Create a new branch from `main` with a descriptive name, following our branch naming convention (see `docs/agentic/workflow.md`).
    ```bash
    git checkout -b feat/your-new-feature-name
    ```
2.  **Make Your Changes**: Write your code, ensuring it follows the project's coding standards and the principles outlined in `docs/agentic/constitution.md`.
3.  **Run Tests**: Before submitting your changes, make sure all tests pass.
    ```bash
    npm test
    ```
4.  **Commit Your Changes**: Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is crucial for our automated release process.
    ```bash
    git commit -m "feat(provider): add support for NewLLM" -m "Detailed explanation of the changes."
    ```
5.  **Push to Your Fork**:
    ```bash
    git push origin feat/your-new-feature-name
    ```
6.  **Open a Pull Request**: Go to the original `agentic-code` repository and open a new Pull Request. Fill out the PR template with the required information.

## Development Workflow

### Running

To start the Agentic-code CLI from the source code (after building), run the following command from the root directory:

```bash
npm start
```

If you'd like to run the source build outside of the agentic-code folder you can utilize `npm link path/to/agentic-code/packages/cli` (see: [docs](https://docs.npmjs.com/cli/v9/commands/npm-link)) or `alias agentic-code="node path/to/agentic-code/packages/cli"` to run with `agentic-code`

### Running Tests

This project contains two types of tests: unit tests and integration tests.

#### Unit Tests

To execute the unit test suite for the project:

```bash
npm run test
```

This will run tests located in the `packages/core` and `packages/cli` directories. Ensure tests pass before submitting any changes. For a more comprehensive check, it is recommended to run `npm run preflight`.

#### Integration Tests

The integration tests are designed to validate the end-to-end functionality of the Agentic-code CLI. They are not run as part of the default `npm run test` command.

To run the integration tests, use the following command:

```bash
npm run test:e2e
```

For more detailed information on the integration testing framework, please see the [Integration Tests documentation](../integration-tests.md).

### Linting and Preflight Checks

To ensure code quality and formatting consistency, run the preflight check:

```bash
npm run preflight
```

This command will run ESLint, Prettier, all tests, and other checks as defined in the project's `package.json`.

_ProTip_

after cloning create a git precommit hook file to ensure your commits are always clean.

```bash
echo "
# Run npm build and check for errors
if ! npm run preflight; then
  echo "npm build failed. Commit aborted."
  exit 1
fi
" > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
```

#### Formatting

To separately format the code in this project by running the following command from the root directory:

```bash
npm run format
```

This command uses Prettier to format the code according to the project's style guidelines.

#### Linting

To separately lint the code in this project, run the following command from the root directory:

```bash
npm run lint
```

### Coding Standards

* **Style**: We use Prettier and ESLint to enforce a consistent code style. Before committing, you can run `npm run format` and `npm run lint` to check and fix your code.
* **Language**: The project is written in TypeScript. Please use strict typing and avoid `any` whenever possible.
* **Documentation**: For new features, especially public APIs, please include TSDoc/JSDoc comments.
* **Principles**: Please adhere to the principles outlined in `docs/agentic/constitution.md` and the workflow guidelines in `docs/agentic/workflow.md`.
* **Imports**: Pay special attention to import paths. The project uses ESLint to enforce restrictions on relative imports between packages.

### Project Structure

- `packages/`: Contains the individual sub-packages of the project.
  - `cli/`: The command-line interface.
  - `core/`: The core backend logic for the Agentic-code CLI.
- `docs/`: Contains all project documentation.
  - `agentic/`: Contains the project's constitution, workflow, and vision documents.
- `scripts/`: Utility scripts for building, testing, and development tasks.

For more detailed architecture, see `docs/agentic/architecture.md`.

## Debugging

### VS Code:

0.  Run the CLI to interactively debug in VS Code with `F5`
1.  Start the CLI in debug mode from the root directory:
    ```bash
    npm run debug
    ```
    This command runs `node --inspect-brk dist/gemini.js` within the `packages/cli` directory, pausing execution until a debugger attaches. You can then open `chrome://inspect` in your Chrome browser to connect to the debugger.
2.  In VS Code, use the "Attach" launch configuration (found in `.vscode/launch.json`).

Alternatively, you can use the "Launch Program" configuration in VS Code if you prefer to launch the currently open file directly, but 'F5' is generally recommended.

To hit a breakpoint inside the sandbox container run:

```bash
DEBUG=1 agentic-code
```

**Note:** If you have `DEBUG=1` in a project's `.env` file, it won't affect agentic-code due to automatic exclusion. Use `.agentic-code/.env` files for agentic-code specific debug settings.

### React DevTools

To debug the CLI's React-based UI, you can use React DevTools. Ink, the library used for the CLI's interface, is compatible with React DevTools version 4.x.

1.  **Start the Agentic-code CLI in development mode:**

    ```bash
    DEV=true npm start
    ```

2.  **Install and run React DevTools version 4.28.5 (or the latest compatible 4.x version):**

    You can either install it globally:

    ```bash
    npm install -g react-devtools@4.28.5
    react-devtools
    ```

    Or run it directly using npx:

    ```bash
    npx react-devtools@4.28.5
    ```

    Your running CLI application should then connect to React DevTools.

## Sandboxing

### macOS Seatbelt

On macOS, `agentic-code` uses Seatbelt (`sandbox-exec`) under a `permissive-open` profile (see `packages/cli/src/utils/sandbox-macos-permissive-open.sb`) that restricts writes to the project folder but otherwise allows all other operations and outbound network traffic ("open") by default. You can switch to a `restrictive-closed` profile (see `packages/cli/src/utils/sandbox-macos-restrictive-closed.sb`) that declines all operations and outbound network traffic ("closed") by default by setting `SEATBELT_PROFILE=restrictive-closed` in your environment or `.env` file. Available built-in profiles are `{permissive,restrictive}-{open,closed,proxied}` (see below for proxied networking). You can also switch to a custom profile `SEATBELT_PROFILE=<profile>` if you also create a file `.agentic-code/sandbox-macos-<profile>.sb` under your project settings directory `.agentic-code`.

### Container-based Sandboxing (All Platforms)

For stronger container-based sandboxing on macOS or other platforms, you can set `AGENTIC_SANDBOX=true|docker|podman|<command>` in your environment or `.env` file. If migrating from older setups, `GEMINI_SANDBOX` is still recognized but deprecated. The specified command (or if `true` then either `docker` or `podman`) must be installed on the host machine. Once enabled, `npm run build:all` will build a minimal container ("sandbox") image and `npm start` will launch inside a fresh instance of that container. The first build can take 20-30s (mostly due to downloading of the base image) but after that both build and start overhead should be minimal. Default builds (`npm run build`) will not rebuild the sandbox.

Container-based sandboxing mounts the project directory (and system temp directory) with read-write access and is started/stopped/removed automatically as you start/stop Agentic-code CLI. Files created within the sandbox should be automatically mapped to your user/group on host machine. You can easily specify additional mounts, ports, or environment variables by setting `SANDBOX_{MOUNTS,PORTS,ENV}` as needed. You can also fully customize the sandbox for your projects by creating the files `.agentic-code/sandbox.Dockerfile` and/or `.agentic-code/sandbox.bashrc` under your project settings directory (`.agentic-code`) and running `agentic-code` with `BUILD_SANDBOX=1` to trigger building of your custom sandbox.

#### Proxied Networking

All sandboxing methods, including macOS Seatbelt using `*-proxied` profiles, support restricting outbound network traffic through a custom proxy server that can be specified as `AGENTIC_SANDBOX_PROXY_COMMAND=<command>`, where `<command>` must start a proxy server that listens on `:::8877` for relevant requests. If migrating, `GEMINI_SANDBOX_PROXY_COMMAND` is recognized but deprecated. See `docs/examples/proxy-script.md` for a minimal proxy that only allows `HTTPS` connections to `example.com:443` (e.g. `curl https://example.com`) and declines all other requests. The proxy is started and stopped automatically alongside the sandbox.

## Forking

If you are forking the repository you will be able to run the Build, Test and Integration test workflows. However, to run the integration tests you'll need to add a GitHub Repository Secret named `AGENTIC_API_KEY` and set it to a valid API key you have available. If migrating from older setups, `GEMINI_API_KEY` may still be recognized but is deprecated.

## Manual Publish

We publish an artifact for each commit to our internal registry. But if you need to manually cut a local build, then run the following commands:

```
npm run clean
npm install
npm run auth
npm run prerelease:dev
npm publish --workspaces
```



## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../../LICENSE) - Apache License 2.0


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../../LICENSE) - Apache License 2.0


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../../LICENSE) - Apache License 2.0

## Related Documentation

- [User Guide](../user/user-guide.md) - Comprehensive guide to using Agentic Code for various tasks
- [Installation Guide](../user/installation.md) - Step-by-step instructions for installing Agentic Code
- [Troubleshooting Guide](../user/troubleshooting.md) - Solutions to common issues and problems
- [Developer Guide](./development-guide.md) - Comprehensive guide for contributing to Agentic Code
- [API Reference](./api-reference.md) - Detailed API documentation
- [Plugin Development Guide](./plugin-development.md) - Guide for creating and maintaining plugins
- [Contributing Guide](./contributing.md) - Guidelines for contributing to the project
- [Core Concepts](../agentic/README.md) - Fundamental principles and architecture
- [Constitution](../agentic/constitution.md) - Core principles and values that guide Agentic Code behavior
- [Workflow](../agentic/workflow.md) - How Agentic Code processes tasks and executes work
- [Architecture](../agentic/architecture.md) - Detailed architecture documentation
- [Vision](../agentic/vision.md) - Long-term vision and goals for Agentic Code

## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../../LICENSE) - Apache License 2.0