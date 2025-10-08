# Web Search Tool (`web_search`)

This document describes the `web_search` tool.

## Description

Use `web_search` to perform a web search using the Tavily API. The tool returns a concise answer with sources when possible.

### Arguments

`web_search` takes one argument:

- `query` (string, required): The search query.

## How to use `web_search`

`web_search` calls the Tavily API directly. You must configure the `TAVILY_API_KEY` through one of the following methods:

1. **Settings file**: Add `"tavilyApiKey": "your-key-here"` to your `settings.json`
2. **Environment variable**: Set `TAVILY_API_KEY` in your environment or `.env` file
3. **Command line**: Use `--tavily-api-key your-key-here` when running the CLI

If the key is not configured, the tool will be disabled and skipped.

Usage:

```
web_search(query="Your query goes here.")
```

## `web_search` examples

Get information on a topic:

```
web_search(query="latest advancements in AI-powered code generation")
```

## Important notes

- **Response returned:** The `web_search` tool returns a concise answer when available, with a list of source links.
- **Citations:** Source links are appended as a numbered list.
- **API key:** Configure `TAVILY_API_KEY` via settings.json, environment variables, .env files, or command line arguments. If not configured, the tool is not registered.


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0

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

[LICENSE](../../LICENSE) - Apache License 2.0