# Agentic-code Troubleshooting Guide

## Table of Contents

1. [Common Issues](#common-issues)
2. [Authentication Problems](#authentication-problems)
3. [Connection Issues](#connection-issues)
4. [Tool Execution Errors](#tool-execution-errors)
5. [IDE Integration Issues](#ide-integration-issues)
6. [Performance Issues](#performance-issues)
7. [Platform-Specific Issues](#platform-specific-issues)
8. [Debug Mode and Logging](#debug-mode-and-logging)
9. [Getting Help](#getting-help)

## Common Issues

### Installation Fails

**Problem**: npm install fails with permission errors

**Symptoms**:
- Error messages like "EACCES: permission denied"
- Installation stops midway

**Solutions**:
1. **Install with administrator privileges**:
   ```bash
   # Linux/macOS
   sudo npm install -g agentic-code

   # Windows
   # Run Command Prompt/PowerShell as Administrator
   npm install -g agentic-code
   ```

2. **Use a Node version manager**:
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

   # Install and use Node.js
   nvm install 20
   nvm use 20
   npm install -g agentic-code
   ```

3. **Change npm's default directory**:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   npm install -g agentic-code
   ```

### Command Not Found

**Problem**: `agentic-code` command is not found after installation

**Symptoms**:
- "command not found: agentic-code" error
- Nothing happens when running the command

**Solutions**:
1. **Verify installation**:
   ```bash
   npm list -g agentic-code
   ```

2. **Check PATH environment variable**:
   ```bash
   # Linux/macOS
   echo $PATH | grep -o "[^:]*npm[^:]*"

   # Windows
   echo %PATH%
   ```

3. **Reinstall the package**:
   ```bash
   npm uninstall -g agentic-code
   npm install -g agentic-code
   ```

4. **Use npx instead**:
   ```bash
   npx agentic-code
   ```

### Version Conflicts

**Problem**: Multiple versions of Node.js or npm causing conflicts

**Symptoms**:
- Unexpected behavior
- Version mismatch errors

**Solutions**:
1. **Check versions**:
   ```bash
   node --version
   npm --version
   ```

2. **Use a Node version manager**:
   ```bash
   # Install and use a specific version
   nvm install 20.19.0
   nvm use 20.19.0
   ```

3. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

## Authentication Problems

### API Key Issues

**Problem**: Invalid or expired API keys

**Symptoms**:
- Authentication failed errors
- 401 Unauthorized responses

**Solutions**:
1. **Verify API key**:
   ```bash
   agentic-code config show
   ```

2. **Update API key**:
   ```bash
   agentic-code auth setup
   ```

3. **Check API key validity**:
   - Visit your provider's dashboard
   - Verify the key is active and has sufficient quota

### OAuth Authentication Fails

**Problem**: OAuth authentication process fails

**Symptoms**:
- Authentication redirects fail
- Token refresh errors

**Solutions**:
1. **Clear stored tokens**:
   ```bash
   agentic-code auth clear
   ```

2. **Re-authenticate**:
   ```bash
   agentic-code auth setup
   ```

3. **Check OAuth configuration**:
   ```bash
   agentic-code provider show
   ```

4. **Verify redirect URLs**:
   - Check your OAuth app configuration
   - Ensure redirect URLs match the expected values

### Provider-Specific Authentication

#### Google Gemini

**Problem**: Google authentication fails

**Solutions**:
1. **Check Google account permissions**
2. **Enable required APIs in Google Cloud Console**
3. **Verify OAuth consent screen configuration**

#### Qwen

**Problem**: Qwen authentication fails

**Solutions**:
1. **Check Qwen account status**
2. **Verify API key is valid**
3. **Check regional availability**

## Connection Issues

### Network Connectivity

**Problem**: Unable to connect to AI providers

**Symptoms**:
- Connection timeout errors
- Network unreachable errors

**Solutions**:
1. **Check internet connection**:
   ```bash
   ping google.com
   ```

2. **Verify provider URLs**:
   ```bash
   agentic-code provider show
   ```

3. **Check firewall settings**:
   - Ensure required ports are open
   - Verify antivirus isn't blocking connections

4. **Configure proxy if needed**:
   ```bash
   export HTTP_PROXY=http://proxy.example.com:8080
   export HTTPS_PROXY=http://proxy.example.com:8080
   ```

### SSL/TLS Certificate Issues

**Problem**: SSL certificate verification fails

**Symptoms**:
- Certificate verification errors
- SSL handshake failed errors

**Solutions**:
1. **Update certificates**:
   ```bash
   # Linux
   sudo update-ca-certificates

   # macOS
   brew update && brew upgrade ca-certificates
   ```

2. **Disable certificate verification (not recommended for production)**:
   ```bash
   export NODE_TLS_REJECT_UNAUTHORIZED=0
   ```

3. **Configure custom CA certificates**:
   ```bash
   export NODE_EXTRA_CA_CERTS=/path/to/ca-bundle.crt
   ```

### Rate Limiting

**Problem**: API rate limits exceeded

**Symptoms**:
- 429 Too Many Requests errors
- Slow response times

**Solutions**:
1. **Check rate limits**:
   - Review provider's rate limit documentation
   - Monitor usage in provider's dashboard

2. **Implement exponential backoff**:
   - The system should automatically retry with backoff
   - If not, restart the application

3. **Upgrade your plan**:
   - Consider upgrading to a higher-tier plan
   - Contact provider for custom rate limits

## Tool Execution Errors

### File Permission Issues

**Problem**: Tools fail to access files due to permissions

**Symptoms**:
- Permission denied errors
- Unable to read/write files

**Solutions**:
1. **Check file permissions**:
   ```bash
   ls -la /path/to/file
   ```

2. **Fix permissions**:
   ```bash
   chmod 644 /path/to/file
   ```

3. **Run with appropriate privileges**:
   ```bash
   # Linux/macOS
   sudo agentic-code

   # Windows
   # Run as Administrator
   ```

### Tool Not Found

**Problem**: Requested tool is not available

**Symptoms**:
- "Tool not found" errors
- Tool execution fails

**Solutions**:
1. **Check available tools**:
   ```bash
   agentic-code tool list
   ```

2. **Enable the tool**:
   ```bash
   agentic-code tool enable tool-name
   ```

3. **Check tool configuration**:
   ```bash
   agentic-code config show
   ```

### Tool Execution Timeout

**Problem**: Tools take too long to execute

**Symptoms**:
- Timeout errors
- Incomplete operations

**Solutions**:
1. **Increase timeout**:
   ```bash
   agentic-code config set timeout 30000
   ```

2. **Check for resource constraints**:
   - Monitor CPU and memory usage
   - Check disk space

3. **Optimize tool operations**:
   - Break large operations into smaller chunks
   - Use more efficient algorithms

## IDE Integration Issues

### Connection Failed

**Problem**: Unable to connect to IDE

**Symptoms**:
- "IDE connection failed" errors
- No IDE context available

**Solutions**:
1. **Check IDE extension**:
   - Verify the extension is installed and enabled
   - Check extension settings

2. **Check connection status**:
   ```bash
   agentic-code ide status
   ```

3. **Restart IDE and Agentic-code**:
   - Close both applications
   - Start IDE first, then Agentic-code

### Sync Issues

**Problem**: IDE state not syncing properly

**Symptoms**:
- Stale file information
- Incorrect cursor position

**Solutions**:
1. **Manually sync**:
   ```bash
   agentic-code ide sync
   ```

2. **Check auto-sync settings**:
   ```bash
   agentic-code config show
   ```

3. **Enable auto-sync**:
   ```bash
   agentic-code config set ide.autoSync true
   ```

### Extension Compatibility

**Problem**: IDE extension not compatible with current version

**Symptoms**:
- Extension errors
- Limited functionality

**Solutions**:
1. **Check extension version**:
   - Verify extension matches Agentic-code version
   - Update extension if needed

2. **Check IDE version**:
   - Ensure IDE version is supported
   - Update IDE if needed

3. **Report compatibility issues**:
   - Create an issue on GitHub
   - Include version information

## Performance Issues

### Slow Response Times

**Problem**: AI responses are slow

**Symptoms**:
- Long delays before responses
- Poor interactive experience

**Solutions**:
1. **Check network connection**:
   - Test internet speed
   - Check for network congestion

2. **Optimize model configuration**:
   ```bash
   agentic-code config set maxTokens 4096
   ```

3. **Choose a faster model**:
   ```bash
   agentic-code provider set gemini
   agentic-code config set model gemini-1.5-flash
   ```

4. **Enable response caching**:
   ```bash
   agentic-code config set cache.enabled true
   ```

### High Memory Usage

**Problem**: Application uses excessive memory

**Symptoms**:
- System becomes sluggish
- Out-of-memory errors

**Solutions**:
1. **Monitor memory usage**:
   ```bash
   # Linux/macOS
   top -p $(pgrep agentic-code)

   # Windows
   tasklist | findstr agentic-code
   ```

2. **Reduce history size**:
   ```bash
   agentic-code config set history.maxSize 50
   ```

3. **Clear cache**:
   ```bash
   agentic-code cache clear
   ```

4. **Restart application**:
   ```bash
   # Exit and restart agentic-code
   ```

### High CPU Usage

**Problem**: Application uses excessive CPU

**Symptoms**:
- System becomes unresponsive
- Fan runs constantly

**Solutions**:
1. **Check for infinite loops**:
   - Monitor CPU usage
   - Look for patterns in usage spikes

2. **Reduce polling frequency**:
   ```bash
   agentic-code config set ide.pollInterval 5000
   ```

3. **Disable unused features**:
   ```bash
   agentic-code tool disable tool-name
   ```

## Platform-Specific Issues

### Windows

#### Path Length Limitations

**Problem**: Windows path length limitations cause issues

**Solutions**:
1. **Use short paths**:
   - Install in a directory with a short path
   - Use 8.3 filename format if needed

2. **Enable long path support**:
   - Modify Group Policy settings
   - Edit Windows Registry

#### Permission Issues

**Problem**: Windows permission system blocks operations

**Solutions**:
1. **Run as Administrator**:
   - Right-click and select "Run as administrator"

2. **Modify file permissions**:
   - Right-click file/folder
   - Select Properties > Security
   - Edit permissions as needed

### macOS

#### Security Restrictions

**Problem**: macOS security features block operations

**Solutions**:
1. **Allow application in Security Preferences**:
   - Open System Preferences > Security & Privacy
   - Allow Agentic-code to run

2. **Disable Gatekeeper (not recommended)**:
   ```bash
   sudo spctl --master-disable
   ```

3. **Add application to exceptions**:
   ```bash
   xattr -d com.apple.quarantine /path/to/agentic-code
   ```

#### File System Issues

**Problem**: Case-sensitive file system causes issues

**Solutions**:
1. **Check file system type**:
   ```bash
   diskutil info / | grep "File System"
   ```

2. **Use consistent file naming**:
   - Avoid case-sensitive file names
   - Use consistent capitalization

### Linux

#### Package Dependencies

**Problem**: Missing system dependencies

**Solutions**:
1. **Install required packages**:
   ```bash
   # Ubuntu/Debian
   sudo apt-get install build-essential

   # CentOS/RHEL
   sudo yum groupinstall "Development Tools"
   ```

2. **Check for missing libraries**:
   ```bash
   ldd $(which agentic-code)
   ```

#### Permission Issues

**Problem**: Linux permission system blocks operations

**Solutions**:
1. **Check file permissions**:
   ```bash
   ls -la /path/to/file
   ```

2. **Fix permissions**:
   ```bash
   chmod 755 /path/to/directory
   chmod 644 /path/to/file
   ```

3. **Use appropriate user**:
   ```bash
   sudo -u username agentic-code
   ```

## Debug Mode and Logging

### Enabling Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG=1 agentic-code
```

### Log Files

Log files are located at:
- Linux/macOS: `~/.agentic-code/logs/`
- Windows: `%APPDATA%/agentic-code/logs/`

### Log Levels

Configure log verbosity:

```bash
agentic-code config set log.level debug
```

### Common Debug Commands

1. **Check configuration**:
   ```bash
   agentic-code config show
   ```

2. **Check provider status**:
   ```bash
   agentic-code provider status
   ```

3. **Check available tools**:
   ```bash
   agentic-code tool list
   ```

4. **Check IDE connection**:
   ```bash
   agentic-code ide status
   ```

## Getting Help

### Built-in Help

1. **General help**:
   ```bash
   agentic-code help
   ```

2. **Command-specific help**:
   ```bash
   agentic-code help config
   ```

### Documentation

1. **View documentation**:
   ```bash
   agentic-code docs
   ```

2. **Open documentation in browser**:
   ```bash
   agentic-code docs --open
   ```

### Community Support

1. **GitHub Issues**:
   - Report bugs: https://github.com/YOUR_USERNAME/agentic-code/issues
   - Feature requests: https://github.com/YOUR_USERNAME/agentic-code/issues

2. **GitHub Discussions**:
   - General questions: https://github.com/YOUR_USERNAME/agentic-code/discussions
   - Community support: https://github.com/YOUR_USERNAME/agentic-code/discussions

### Reporting Issues

When reporting issues, include:

1. **System information**:
   ```bash
   agentic-code --version
   node --version
   npm --version
   ```

2. **Configuration**:
   ```bash
   agentic-code config show
   ```

3. **Error messages**:
   - Include full error messages
   - Include stack traces if available

4. **Steps to reproduce**:
   - Describe what you were trying to do
   - Include exact commands used

5. **Debug logs**:
   - Include relevant log entries
   - Use debug mode for detailed logs

This troubleshooting guide provides solutions for common issues encountered when using Agentic-code. For more specific information, refer to the [User Guide](USER_GUIDE.md) or [API Documentation](API_DOCUMENTATION.md).