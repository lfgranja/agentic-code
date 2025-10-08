# Welcome to Qwen Code documentation

This documentation provides a comprehensive guide to installing, using, and developing Qwen Code. This tool lets you interact with AI models through a command-line interface.

## Overview

Qwen Code brings the capabilities of advanced code models to your terminal in an interactive Read-Eval-Print Loop (REPL) environment. Qwen Code consists of a client-side application (`packages/cli`) that communicates with a local server (`packages/core`). Qwen Code also contains a variety of tools for tasks such as performing file system operations, running shells, and web fetching, which are managed by `packages/core`.

## Navigating the documentation

This documentation is organized into the following sections:

- **[Execution and Deployment](./deployment.md):** Information for running Qwen Code.
- **[Architecture Overview](./architecture.md):** Understand the high-level design of Qwen Code, including its components and how they interact.
- **CLI Usage:** Documentation for `packages/cli`.
  - **[CLI Introduction](./cli/index.md):** Overview of the command-line interface.
  - **[Commands](./cli/commands.md):** Description of available CLI commands.
  - **[Configuration](./cli/configuration.md):** Information on configuring the CLI.
  - **[Checkpointing](./checkpointing.md):** Documentation for the checkpointing feature.
  - **[Extensions](./extension.md):** How to extend the CLI with new functionality.
  - **[IDE Integration](./ide-integration.md):** Connect the CLI to your editor.
  - **[Telemetry](./telemetry.md):** Overview of telemetry in the CLI.
- **Core Details:** Documentation for `packages/core`.
  - **[Core Introduction](./core/index.md):** Overview of the core component.
  - **[Tools API](./core/tools-api.md):** Information on how the core manages and exposes tools.
- **Tools:**
  - **[Tools Overview](./tools/index.md):** Overview of the available tools.
  - **[File System Tools](./tools/file-system.md):** Documentation for the `read_file` and `write_file` tools.
  - **[Multi-File Read Tool](./tools/multi-file.md):** Documentation for the `read_many_files` tool.
  - **[Shell Tool](./tools/shell.md):** Documentation for the `run_shell_command` tool.
  - **[Web Fetch Tool](./tools/web-fetch.md):** Documentation for the `web_fetch` tool.
  - **[Web Search Tool](./tools/web-search.md):** Documentation for the `web_search` tool.
  - **[Memory Tool](./tools/memory.md):** Documentation for the `save_memory` tool.
- **[Subagents](./subagents.md):** Specialized AI assistants for focused tasks with comprehensive management, configuration, and usage guidance.
- **[Contributing](./developer/contributing.md):** Guidelines for contributors, including setup and coding conventions.
- **[Development Guide](./developer/development-guide.md):** Detailed information for developers, including building, testing, and project structure.
- **[API Reference](./developer/api-reference.md):** Comprehensive reference for public APIs.
- **[NPM](./npm.md):** Details on how the project's packages are structured
- **[Troubleshooting Guide](./user/troubleshooting.md):** Find solutions to common problems and FAQs.
- **[Terms of Service and Privacy Notice](./tos-privacy.md):** Information on the terms of service and privacy notices applicable to your use of Qwen Code.

We hope this documentation helps you make the most of Qwen Code!


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0

## Related Documentation

- [User Guide](./user/user-guide.md) - Comprehensive guide to using Agentic Code for various tasks
- [Installation Guide](./user/installation.md) - Step-by-step instructions for installing Agentic Code
- [Troubleshooting Guide](./user/troubleshooting.md) - Solutions to common issues and problems
- [Developer Guide](./developer/development-guide.md) - Comprehensive guide for contributing to Agentic Code
- [API Reference](./developer/api-reference.md) - Detailed API documentation
- [Plugin Development Guide](./developer/plugin-development.md) - Guide for creating and maintaining plugins
- [Contributing Guide](./developer/contributing.md) - Guidelines for contributing to the project
- [Core Concepts](./agentic/README.md) - Fundamental principles and architecture
- [Constitution](./agentic/constitution.md) - Core principles and values that guide Agentic Code behavior
- [Workflow](./agentic/workflow.md) - How Agentic Code processes tasks and executes work
- [Architecture](./agentic/architecture.md) - Detailed architecture documentation
- [Vision](./agentic/vision.md) - Long-term vision and goals for Agentic Code

## Need Help?

If you encounter issues, check the [Troubleshooting Guide](./user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0