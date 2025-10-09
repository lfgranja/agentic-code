# Ignoring Files

This document provides an overview of the Qwen Ignore (`.qwenignore`) feature of Qwen Code.

Qwen Code includes the ability to automatically ignore files, similar to `.gitignore` (used by Git). Adding paths to your `.qwenignore` file will exclude them from tools that support this feature, although they will still be visible to other services (such as Git).

## How it works

When you add a path to your `.qwenignore` file, tools that respect this file will exclude matching files and directories from their operations. For example, when you use the [`read_many_files`](./tools/multi-file.md) command, any paths in your `.qwenignore` file will be automatically excluded.

For the most part, `.qwenignore` follows the conventions of `.gitignore` files:

- Blank lines and lines starting with `#` are ignored.
- Standard glob patterns are supported (such as `*`, `?`, and `[]`).
- Putting a `/` at the end will only match directories.
- Putting a `/` at the beginning anchors the path relative to the `.qwenignore` file.
- `!` negates a pattern.

You can update your `.qwenignore` file at any time. To apply the changes, you must restart your Qwen Code session.

## How to use `.qwenignore`

To enable `.qwenignore`:

1. Create a file named `.qwenignore` in the root of your project directory.

To add a file or directory to `.qwenignore`:

1. Open your `.qwenignore` file.
2. Add the path or file you want to ignore, for example: `/archive/` or `apikeys.txt`.

### `.qwenignore` examples

You can use `.qwenignore` to ignore directories and files:

```
# Exclude your /packages/ directory and all subdirectories
/packages/

# Exclude your apikeys.txt file
apikeys.txt
```

You can use wildcards in your `.qwenignore` file with `*`:

```
# Exclude all .md files
*.md
```

Finally, you can exclude files and directories from exclusion with `!`:

```
# Exclude all .md files except README.md
*.md
!README.md
```

To remove paths from your `.qwenignore` file, delete the relevant lines.



## Need Help?

If you encounter issues, check the [Troubleshooting Guide](./user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](./user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../LICENSE) - Apache License 2.0


## Need Help?

If you encounter issues, check the [Troubleshooting Guide](./user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

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