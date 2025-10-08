# Todo Write Tool (`todo_write`)

This document describes the `todo_write` tool for Qwen Code.

## Description

Use `todo_write` to create and manage a structured task list for your current coding session. This tool helps the AI assistant track progress and organize complex tasks, providing you with visibility into what work is being performed.

### Arguments

`todo_write` takes one argument:

- `todos` (array, required): An array of todo items, where each item contains:
  - `id` (string, required): A unique identifier for the todo item.
  - `content` (string, required): The description of the task.
  - `status` (string, required): The current status (`pending`, `in_progress`, or `completed`).

## How to use `todo_write` with Qwen Code

The AI assistant will automatically use this tool when working on complex, multi-step tasks. You don't need to explicitly request it, but you can ask the assistant to create a todo list if you want to see the planned approach for your request.

The tool stores todo lists in your home directory (`~/.qwen/todos/`) with session-specific files, so each coding session maintains its own task list.

## When the AI uses this tool

The assistant uses `todo_write` for:

- Complex tasks requiring multiple steps
- Feature implementations with several components
- Refactoring operations across multiple files
- Any work involving 3 or more distinct actions

The assistant will not use this tool for simple, single-step tasks or purely informational requests.

### `todo_write` examples

Creating a feature implementation plan:

```
todo_write(todos=[
  {
    "id": "create-model",
    "content": "Create user preferences model",
    "status": "pending"
  },
  {
    "id": "add-endpoints",
    "content": "Add API endpoints for preferences",
    "status": "pending"
  },
  {
    "id": "implement-ui",
    "content": "Implement frontend components",
    "status": "pending"
  }
])
```

## Important notes

- **Automatic usage:** The AI assistant manages todo lists automatically during complex tasks.
- **Progress visibility:** You'll see todo lists updated in real-time as work progresses.
- **Session isolation:** Each coding session has its own todo list that doesn't interfere with others.


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0


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