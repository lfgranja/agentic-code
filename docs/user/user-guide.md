# Agentic-code User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Getting Started](#getting-started)
4. [Basic Usage](#basic-usage)
5. [Configuration](#configuration)
6. [Provider Setup](#provider-setup)
7. [IDE Integration](#ide-integration)
8. [Common Workflows](#common-workflows)
9. [Troubleshooting](#troubleshooting)

## Introduction

Agentic-code is a sophisticated command-line interface for AI-assisted software development. It provides a unified interface for working with multiple AI model providers while enforcing strict coding standards and best practices.

### Key Features

- **Multi-Provider Support**: Work with different AI models through a unified interface
- **Tool-Based Architecture**: Extensible system of tools for interacting with your development environment
- **IDE Integration**: Seamless integration with development environments
- **Quality Governance**: Automatic enforcement of coding standards and best practices

## Installation

### Prerequisites

- Node.js version 20.19.0 or higher
- Git
- A supported AI provider account (Google Gemini, Qwen, etc.)

### Installing Agentic-code

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agentic-code.git
   cd agentic-code
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link for global usage:
   ```bash
   npm link
   ```

### Verifying Installation

To verify that Agentic-code is installed correctly, run:
```bash
agentic-code --version
```

## Getting Started

### Initial Configuration

1. Create a configuration file:
   ```bash
   agentic-code config init
   ```

2. Set up your preferred AI provider:
   ```bash
   agentic-code provider set gemini
   ```

3. Configure authentication:
   ```bash
   agentic-code auth setup
   ```

### Your First Session

Start a new session with:
```bash
agentic-code
```

You can now start interacting with the AI assistant. Try a simple command like:
```
> Create a simple "Hello, World!" program in Python
```

## Basic Usage

### Command Structure

Agentic-code follows a simple command structure:
```bash
agentic-code [command] [options] [arguments]
```

### Common Commands

- `agentic-code` - Start an interactive session
- `agentic-code config` - Manage configuration
- `agentic-code provider` - Manage AI providers
- `agentic-code auth` - Manage authentication
- `agentic-code tool` - Manage available tools
- `agentic-code help` - Show help information

### Interactive Mode

The most common way to use Agentic-code is in interactive mode:
```bash
agentic-code
```

In interactive mode, you can:
- Type natural language prompts
- Use special commands (prefixed with `/`)
- View and manage conversation history

### Non-Interactive Mode

You can also use Agentic-code in non-interactive mode:
```bash
agentic-code "Create a REST API endpoint"
```

## Configuration

### Configuration File

Agentic-code uses a configuration file located at:
- `~/.agentic-code/config.json` (Linux/macOS)
- `%APPDATA%/agentic-code/config.json` (Windows)

### Configuration Options

```json
{
  "provider": "gemini",
  "model": "gemini-2.0-flash",
  "temperature": 0,
  "maxTokens": 8192,
  "tools": {
    "enabled": ["read-file", "write-file", "edit", "run-shell-command"],
    "disabled": []
  },
  "ide": {
    "enabled": true,
    "autoSync": true
  },
  "sandbox": {
    "enabled": false,
    "type": "docker"
  }
}
```

### Managing Configuration

- View current configuration:
  ```bash
  agentic-code config show
  ```

- Set a configuration value:
  ```bash
  agentic-code config set provider gemini
  ```

- Reset configuration to defaults:
  ```bash
  agentic-code config reset
  ```

## Provider Setup

### Supported Providers

Agentic-code supports multiple AI providers:

- **Google Gemini**: Google's advanced AI model
- **Qwen**: Alibaba's large language model
- **Custom Providers**: Any provider compatible with the MCP protocol

### Setting Up Google Gemini

1. Set Gemini as your provider:
   ```bash
   agentic-code provider set gemini
   ```

2. Configure authentication:
   ```bash
   agentic-code auth setup gemini
   ```

3. Follow the prompts to authenticate with your Google account

### Setting Up Qwen

1. Set Qwen as your provider:
   ```bash
  agentic-code provider set qwen
   ```

2. Configure authentication:
   ```bash
   agentic-code auth setup qwen
   ```

3. Follow the prompts to authenticate with your Qwen account

### Setting Up Custom Providers

1. Add a custom provider:
   ```bash
   agentic-code provider add custom-provider --url https://api.example.com
   ```

2. Configure authentication:
   ```bash
   agentic-code auth setup custom-provider
   ```

3. Follow the prompts to configure authentication

## IDE Integration

### VS Code Integration

1. Install the Agentic-code VS Code extension
2. Open VS Code
3. Enable the extension in settings
4. Configure the extension to connect to your local Agentic-code instance

### Using IDE Integration

Once IDE integration is enabled, you can:

- View open files and cursor position in Agentic-code
- Use Agentic-code to edit files directly in your IDE
- See diffs of proposed changes before applying them
- Get context-aware suggestions based on your current workspace

### IDE Integration Commands

- `/ide status` - Check IDE connection status
- `/ide sync` - Manually sync with IDE state
- `/ide diff <file>` - Show diff for a specific file

## Common Workflows

### Code Generation

Generate code for a specific task:
```
> Create a function that validates email addresses in JavaScript
```

### Code Refactoring

Refactor existing code:
```
> Refactor this function to use async/await instead of promises
```

### Code Review

Get feedback on your code:
```
> Review this code for potential security vulnerabilities
```

### File Operations

Perform file operations:
```
> Read the package.json file and update the version to 2.0.0
```

### Shell Commands

Execute shell commands:
```
> Run the test suite and fix any failing tests
```

### Web Search

Search for information online:
```
> Search for best practices for error handling in Node.js
```

## Troubleshooting

For comprehensive troubleshooting information, see the [Troubleshooting Guide](./troubleshooting.md).

### Common Issues

#### Authentication Problems

If you're having trouble with authentication:

1. Check your provider configuration:
   ```bash
   agentic-code provider show
   ```

2. Re-authenticate:
   ```bash
   agentic-code auth setup
   ```

3. Check your API keys or credentials

For detailed authentication setup guides, see:
- [Installation Guide](./installation.md) - Complete installation and setup instructions
- [Developer Guide](../developer/development-guide.md) - Development environment setup

#### Connection Issues

If you're having trouble connecting to a provider:

1. Check your internet connection
2. Verify the provider URL is correct
3. Check for any firewall or proxy issues

#### Tool Execution Errors

If tools are failing to execute:

1. Check if the tool is enabled:
   ```bash
   agentic-code tool list
   ```

2. Enable the tool if needed:
   ```bash
   agentic-code tool enable read-file
   ```

3. Check file permissions and paths

For more information about tools:
- [Tools API Documentation](../core/tools-api.md) - Detailed information about tools
- [Developer Guide](../developer/development-guide.md) - Guide to creating new tools

#### Performance Issues

If Agentic-code is running slowly:

1. Check your model configuration
2. Reduce the maximum token count
3. Enable caching if available
4. Consider using a faster provider

### Getting Help

- Use the built-in help:
  ```bash
  agentic-code help
  ```

- Check the documentation:
  ```bash
  agentic-code docs
  ```

- Report issues on GitHub:
  https://github.com/YOUR_USERNAME/agentic-code/issues

- For developer questions, see the [Developer Documentation](../developer/README.md)
- For core concepts, see the [Agentic Documentation](../agentic/README.md)

### Debug Mode

Enable debug mode for troubleshooting:
```bash
DEBUG=1 agentic-code
```

This will provide detailed logging information that can help identify issues.

## Next Steps

- For installation and configuration details, see the [Installation Guide](./installation.md)
- For developer documentation, see the [Developer Documentation](../developer/README.md)
- For core concepts, see the [Agentic Documentation](../agentic/README.md)
- For troubleshooting solutions, see the [Troubleshooting Guide](./troubleshooting.md)