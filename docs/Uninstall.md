# Uninstalling the CLI

Your uninstall method depends on how you ran the CLI. Follow the instructions for either npx or a global npm installation.

## Method 1: Using npx

npx runs packages from a temporary cache without a permanent installation. To "uninstall" the CLI, you must clear this cache, which will remove qwen-code and any other packages previously executed with npx.

The npx cache is a directory named `_npx` inside your main npm cache folder. You can find your npm cache path by running `npm config get cache`.

**For macOS / Linux**

```bash
# The path is typically ~/.npm/_npx
rm -rf "$(npm config get cache)/_npx"
```

**For Windows**

_Command Prompt_

```cmd
:: The path is typically %LocalAppData%\npm-cache\_npx
rmdir /s /q "%LocalAppData%\npm-cache\_npx"
```

_PowerShell_

```powershell
# The path is typically $env:LocalAppData\npm-cache\_npx
Remove-Item -Path (Join-Path $env:LocalAppData "npm-cache\_npx") -Recurse -Force
```

## Method 2: Using npm (Global Install)

If you installed the CLI globally (e.g., `npm install -g @qwen-code/qwen-code`), use the `npm uninstall` command with the `-g` flag to remove it.

```bash
npm uninstall -g @qwen-code/qwen-code
```

This command completely removes the package from your system.

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