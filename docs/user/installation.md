# Agentic-code Installation Guide

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Platform-Specific Instructions](#platform-specific-instructions)
4. [Configuration](#configuration)
5. [Authentication Setup](#authentication-setup)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements

- **Node.js**: Version 20.19.0 or higher
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Memory**: 4GB RAM minimum, 8GB recommended
- **Storage**: 500MB free disk space
- **Network**: Internet connection for AI provider communication

### Recommended Requirements

- **Node.js**: Latest LTS version
- **Operating System**: Latest stable version
- **Memory**: 16GB RAM or more
- **Storage**: 2GB free disk space
- **Network**: Stable high-speed internet connection

### Optional Requirements

- **Docker**: For container-based sandboxing
- **VS Code**: For IDE integration
- **Git**: For version control integration

## Installation Methods

### Method 1: Install from npm Registry (Recommended)

1. Install Agentic-code globally:
   ```bash
   npm install -g agentic-code
   ```

2. Verify installation:
   ```bash
   agentic-code --version
   ```

### Method 2: Install from Source

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

5. Verify installation:
   ```bash
   agentic-code --version
   ```

### Method 3: Install Using npx (Without Global Installation)

1. Run directly with npx:
   ```bash
   npx agentic-code
   ```

2. Or create an alias in your shell configuration:
   ```bash
   # For bash/zsh
   echo 'alias agentic-code="npx agentic-code"' >> ~/.bashrc
   source ~/.bashrc

   # For fish
   echo 'alias agentic-code="npx agentic-code"' >> ~/.config/fish/config.fish
   source ~/.config/fish/config.fish
   ```

## Platform-Specific Instructions

### Windows

#### Using Windows Subsystem for Linux (WSL)

1. Install WSL:
   ```powershell
   wsl --install
   ```

2. Install Node.js in WSL:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Follow the Linux installation instructions

#### Using Native Windows

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Install Git from [git-scm.com](https://git-scm.com/)
3. Open Command Prompt or PowerShell as Administrator
4. Follow the general installation instructions

#### Windows-Specific Considerations

- Use PowerShell or Command Prompt with administrator privileges
- Windows Defender might flag the installation; allow it if prompted
- For IDE integration, use Windows Subsystem for Linux (WSL)

### macOS

#### Using Homebrew

1. Install Homebrew (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install Node.js:
   ```bash
   brew install node
   ```

3. Follow the general installation instructions

#### Using MacPorts

1. Install MacPorts (if not already installed)
2. Install Node.js:
   ```bash
   sudo port install nodejs20
   ```

3. Follow the general installation instructions

#### macOS-Specific Considerations

- macOS might require permission to run the application
- For IDE integration, ensure the IDE has necessary permissions
- Consider using Homebrew for easier dependency management

### Linux

#### Ubuntu/Debian

1. Update package index:
   ```bash
   sudo apt update
   ```

2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Follow the general installation instructions

#### CentOS/RHEL/Fedora

1. Install Node.js:
   ```bash
   # For Fedora
   sudo dnf install nodejs

   # For CentOS/RHEL
   sudo yum install nodejs
   ```

2. Follow the general installation instructions

#### Linux-Specific Considerations

- Use a package manager appropriate for your distribution
- Consider using Node Version Manager (nvm) for easier Node.js management
- Ensure proper permissions for installation directory

## Configuration

### Initial Configuration

1. Create a configuration directory:
   ```bash
   mkdir -p ~/.agentic-code
   ```

2. Initialize configuration:
   ```bash
   agentic-code config init
   ```

3. Edit the configuration file:
   ```bash
   # For Linux/macOS
   nano ~/.agentic-code/config.json

   # For Windows
   notepad %APPDATA%\agentic-code\config.json
   ```

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

### Environment Variables

You can also configure Agentic-code using environment variables:

```bash
# Set provider
export AGENTIC_CODE_PROVIDER=gemini

# Set model
export AGENTIC_CODE_MODEL=gemini-2.0-flash

# Set API key
export AGENTIC_CODE_API_KEY=your-api-key

# Enable debug mode
export DEBUG=1
```

## Authentication Setup

### Google Gemini

1. Set Gemini as your provider:
   ```bash
   agentic-code provider set gemini
   ```

2. Configure authentication:
   ```bash
   agentic-code auth setup gemini
   ```

3. Follow the prompts to authenticate with your Google account

### Qwen

1. Set Qwen as your provider:
   ```bash
   agentic-code provider set qwen
   ```

2. Configure authentication:
   ```bash
   agentic-code auth setup qwen
   ```

3. Follow the prompts to authenticate with your Qwen account

### Custom Provider

1. Add a custom provider:
   ```bash
   agentic-code provider add custom-provider --url https://api.example.com
   ```

2. Configure authentication:
   ```bash
   agentic-code auth setup custom-provider
   ```

3. Follow the prompts to configure authentication

## Verification

### Basic Verification

1. Check version:
   ```bash
   agentic-code --version
   ```

2. Check configuration:
   ```bash
   agentic-code config show
   ```

3. Check provider status:
   ```bash
   agentic-code provider status
   ```

### Functional Verification

1. Start a session:
   ```bash
   agentic-code
   ```

2. Try a simple command:
   ```
   > Say hello
   ```

3. Try a file operation:
   ```
   > Create a file named test.txt with content "Hello, World!"
   ```

### IDE Integration Verification

1. Check IDE connection:
   ```bash
   agentic-code ide status
   ```

2. Test IDE sync:
   ```bash
   agentic-code ide sync
   ```

## Troubleshooting

### Common Issues

#### Installation Fails

**Problem**: npm install fails with permission errors

**Solution**:
- For Linux/macOS: Use `sudo npm install -g agentic-code`
- For Windows: Run Command Prompt/PowerShell as Administrator
- Consider using a Node version manager like nvm

#### Command Not Found

**Problem**: `agentic-code` command is not found

**Solution**:
- Verify installation with `npm list -g agentic-code`
- Check your PATH environment variable
- Try reinstalling with `npm install -g agentic-code`

#### Authentication Fails

**Problem**: Authentication fails with error messages

**Solution**:
- Check your internet connection
- Verify your API keys or credentials
- Try re-authenticating with `agentic-code auth setup`

#### Provider Connection Fails

**Problem**: Connection to AI provider fails

**Solution**:
- Check provider configuration with `agentic-code provider show`
- Verify your API key is valid
- Check if the provider service is available

#### Tool Execution Fails

**Problem**: Tools fail to execute with permission errors

**Solution**:
- Check file permissions
- Verify the tool is enabled with `agentic-code tool list`
- Try running with administrator/root privileges

### Debug Mode

Enable debug mode for troubleshooting:

```bash
DEBUG=1 agentic-code
```

This will provide detailed logging information that can help identify issues.

### Getting Help

1. Use the built-in help:
   ```bash
   agentic-code help
   ```

2. Check the documentation:
   ```bash
   agentic-code docs
   ```

3. Report issues on GitHub:
   https://github.com/YOUR_USERNAME/agentic-code/issues

4. Join the community discussion:
   https://github.com/YOUR_USERNAME/agentic-code/discussions

### Log Files

Log files are located at:
- Linux/macOS: `~/.agentic-code/logs/`
- Windows: `%APPDATA%/agentic-code/logs/`

Check these files for detailed error information.

### Clean Installation

If all else fails, try a clean installation:

1. Uninstall the current version:
   ```bash
   npm uninstall -g agentic-code
   ```

2. Remove configuration directory:
   ```bash
   # Linux/macOS
   rm -rf ~/.agentic-code

   # Windows
   rmdir /s %APPDATA%\agentic-code
   ```

3. Reinstall following the installation instructions

This installation guide provides comprehensive instructions for setting up Agentic-code on various platforms. For more specific information, refer to the [User Guide](user-guide.md) or [API Documentation](../developer/api-reference.md).