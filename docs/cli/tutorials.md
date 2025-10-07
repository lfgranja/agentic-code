# Tutorials

This page contains tutorials for interacting with Qwen Code.

## Setting up a Model Context Protocol (MCP) server

> [!CAUTION]
> Before using a third-party MCP server, ensure you trust its source and understand the tools it provides. Your use of third-party servers is at your own risk.

This tutorial demonstrates how to set up a MCP server, using the [GitHub MCP server](https://github.com/github/github-mcp-server) as an example. The GitHub MCP server provides tools for interacting with GitHub repositories, such as creating issues and commenting on pull requests.

### Prerequisites

Before you begin, ensure you have the following installed and configured:

- **Docker:** Install and run [Docker].
- **GitHub Personal Access Token (PAT):** Create a new [classic] or [fine-grained] PAT with the necessary scopes.

[Docker]: https://www.docker.com/
[classic]: https://github.com/settings/tokens/new
[fine-grained]: https://github.com/settings/personal-access-tokens/new

### Guide

#### Configure the MCP server in `settings.json`

In your project's root directory, create or open the [`.qwen/settings.json` file](./configuration.md). Within the file, add the `mcpServers` configuration block, which provides instructions for how to launch the GitHub MCP server.

```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

#### Set your GitHub token

> [!CAUTION]
> Using a broadly scoped personal access token that has access to personal and private repositories can lead to information from the private repository being leaked into the public repository. We recommend using a fine-grained access token that doesn't share access to both public and private repositories.

Use an environment variable to store your GitHub PAT:

```bash
GITHUB_PERSONAL_ACCESS_TOKEN="pat_YourActualGitHubTokenHere"
```

Qwen Code uses this value in the `mcpServers` configuration that you defined in the `settings.json` file.

#### Launch Qwen Code and verify the connection

When you launch Qwen Code, it automatically reads your configuration and launches the GitHub MCP server in the background. You can then use natural language prompts to ask Qwen Code to perform GitHub actions. For example:

```bash
"get all open issues assigned to me in the 'foo/bar' repo and prioritize them"
```

## Related Documentation

- [User Guide](../user/user-guide.md) - Comprehensive guide to using Agentic Code for various tasks
- [Installation Guide](../user/installation.md) - Step-by-step instructions for installing Agentic Code
- [Troubleshooting Guide](../user/troubleshooting.md) - Solutions to common issues and problems
- [Developer Guide](../developer/development-guide.md) - Comprehensive guide for contributing to Agentic Code
- [API Reference](../developer/api-reference.md) - Detailed API documentation
- [Plugin Development Guide](../developer/plugin-development.md) - Guide for creating and maintaining plugins
- [Contributing Guide](../developer/contributing.md) - Guidelines for contributing to the project
- [Core Concepts](../agentic/README.md) - Fundamental principles and architecture
- [Constitution](../agentic/constitution.md) - Core principles and values that guide Agentic Code behavior
- [Workflow](../agentic/workflow.md) - How Agentic Code processes tasks and executes work
- [Architecture](../agentic/architecture.md) - Detailed architecture documentation
- [Vision](../agentic/vision.md) - Long-term vision and goals for Agentic Code

## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0