# Agentic-code Architecture

## 1. High-Level Overview

Agentic-code is a sophisticated command-line interface for AI-assisted software development. The architecture is built upon the solid foundation of Qwen Code, enhanced with a multi-provider system and strict governance principles.

The system is designed around these core concepts:
- **Multi-Provider Support**: Ability to work with different AI model providers through a unified interface
- **Tool-Based Architecture**: Extensible system of tools for interacting with the development environment
- **IDE Integration**: Seamless integration with development environments
- **Quality Governance**: Enforcement of coding standards and best practices

## 2. Core Components

### 2.1 Package Structure

The project is organized into two main packages:

```
packages/
├── cli/          # User-facing command-line interface
└── core/         # Backend logic and orchestration
```

### 2.2 CLI Package (`packages/cli`)

The CLI package handles all user-facing interactions:

- **Input Processing**: Parses user commands and arguments
- **Display Rendering**: Manages the terminal UI using React and Ink
- **Session Management**: Tracks conversation history and user preferences
- **Configuration**: Handles user settings and authentication

### 2.3 Core Package (`packages/core`)

The core package contains the backend logic:

- **Client Management**: Handles communication with AI model providers
- **Tool System**: Manages and executes available tools
- **Content Generation**: Orchestrates the flow of information between components
- **Service Layer**: Provides various services like file discovery, git operations, etc.

## 3. Multi-Provider Architecture

### 3.1 MCP (Model Context Protocol) Client

The heart of the multi-provider system is the MCP client implementation in `packages/core/src/tools/mcp-client.ts`. This provides:

- **Transport Support**: HTTP, SSE, and Stdio transport methods
- **Authentication**: OAuth 2.0, API keys, and Google credentials
- **Tool Discovery**: Automatic discovery of tools from connected providers
- **Error Handling**: Robust error handling and retry mechanisms

### 3.2 Provider Implementations

The system supports multiple provider types:

- **Google Gemini**: Through the native Gemini API
- **Qwen**: Via OAuth 2.0 authentication
- **Custom Providers**: Through API Keys
- **Local Models**: Through OpenAI-compatible endpoints

### 3.3 Content Generation

The content generation system (`packages/core/src/core/client.ts`) provides:

- **Unified Interface**: Consistent API regardless of the underlying provider
- **Stream Processing**: Real-time streaming of responses
- **History Management**: Maintains conversation context
- **Error Recovery**: Automatic fallback and retry mechanisms

## 4. Tool System

### 4.1 Tool Architecture

The tool system (`packages/core/src/tools/`) is built on a declarative pattern:

```typescript
abstract class BaseDeclarativeTool<TParams, TResult> {
  abstract createInvocation(params: TParams): ToolInvocation<TParams, TResult>;
}
```

### 4.2 Available Tools

The system includes a comprehensive set of tools:

- **File Operations**: `read-file`, `write-file`, `edit`, `ls`, `glob`
- **Search Operations**: `grep`, `ripGrep`, `search_file_content`
- **Shell Operations**: `run_shell_command`
- **Web Operations**: `web-fetch`, `web-search`
- **Memory Management**: `save_memory`
- **Task Management**: `task`
- **MCP Tools**: Dynamic tools from connected providers

### 4.3 Tool Registry

The tool registry (`packages/core/src/tools/tool-registry.ts`) manages:

- **Tool Registration**: Dynamic registration of tools
- **Tool Discovery**: Finding tools by name or capability
- **Tool Execution**: Coordinating tool execution with proper validation

## 5. IDE Integration

### 5.1 IDE Client

The IDE client (`packages/core/src/ide/ide-client.ts`) provides:

- **Connection Management**: Handles connections to IDE companion extensions
- **Context Synchronization**: Maintains sync with IDE state
- **Diff Management**: Provides diff viewing and editing capabilities
- **Real-time Updates**: Receives real-time updates from the IDE

### 5.2 IDE Context

The IDE context system (`packages/core/src/ide/ideContext.ts`) manages:

- **File State**: Tracks open files, cursor position, and selections
- **Workspace State**: Maintains information about the current workspace
- **Change Notifications**: Handles notifications about IDE state changes

## 6. Service Layer

### 6.1 Available Services

The core package includes various services:

- **File Discovery Service**: Locates and analyzes project files
- **Git Service**: Handles git operations and history
- **Shell Execution Service**: Manages shell command execution
- **Chat Recording Service**: Records and manages chat history

### 6.2 Service Architecture

Services are designed to be:

- **Modular**: Each service handles a specific domain
- **Injectable**: Services can be injected where needed
- **Testable**: Services can be easily mocked for testing

## 7. Request Lifecycle

### 7.1 User Input Flow

1. **User Input**: User types a command or prompt
2. **CLI Processing**: CLI package processes the input
3. **Core Invocation**: Core package is invoked with the processed input
4. **Tool Selection**: Appropriate tools are selected based on the task
5. **Provider Communication**: Request is sent to the configured provider
6. **Response Processing**: Response is processed and returned to the user

### 7.2 Tool Execution Flow

1. **Tool Selection**: Based on the task, appropriate tools are selected
2. **Parameter Validation**: Tool parameters are validated against schemas
3. **Execution**: Tools are executed with proper error handling
4. **Result Processing**: Results are processed and formatted for display
5. **History Update**: Conversation history is updated with the results

## 8. Authentication and Security

### 8.1 Authentication Methods

The system supports multiple authentication methods:

- **OAuth 2.0**: For providers like Qwen
- **API Keys**: For providers like Gemini
- **Google Credentials**: For Google services
- **Custom Authentication**: Through the MCP protocol

### 8.2 Security Features

Security is implemented through:

- **Sandboxing**: Optional container-based or macOS Seatbelt sandboxing
- **Input Validation**: All inputs are validated before processing
- **Error Handling**: Sensitive information is not exposed in error messages
- **Permission Management**: Tools require explicit permission for destructive operations

## 9. Configuration and Settings

### 9.1 Configuration System

The configuration system (`packages/core/src/config/config.ts`) manages:

- **Provider Settings**: Configuration for different AI providers
- **Tool Settings**: Settings for individual tools
- **User Preferences**: User-specific settings and preferences
- **Environment Variables**: Configuration through environment variables

### 9.2 Storage

Settings are stored through:

- **Local Storage**: For user preferences and session data
- **Configuration Files**: For project-specific settings
- **Environment Variables**: For sensitive information like API keys

## 10. Testing Architecture

### 10.1 Test Types

The project includes multiple test types:

- **Unit Tests**: For individual components and functions
- **Integration Tests**: For testing component interactions
- **End-to-End Tests**: For testing complete user workflows

### 10.2 Test Framework

The testing framework uses:

- **Vitest**: For unit and integration tests
- **Mocking**: For mocking external dependencies
- **Test Utilities**: Custom utilities for testing specific components

## 11. Future Enhancements

### 11.1 Planned Improvements

The architecture is designed to support future enhancements:

- **Plugin System**: For extending functionality with plugins
- **Advanced Analytics**: For tracking usage and performance
- **Team Collaboration**: For multi-user collaboration features
- **Enhanced Security**: For additional security features

### 11.2 Extensibility

The architecture is built to be extensible:

- **New Providers**: Easy addition of new AI providers
- **New Tools**: Simple addition of new tools
- **New Services**: Modular addition of new services
- **New UI Components**: React-based UI allows for easy extension

    This architecture ensures that Agentic-code remains flexible, extensible, and maintainable while providing a robust foundation for AI-assisted software development.

    ## Related Documentation

    - [Constitution](./constitution.md) - Core principles and values that guide Agentic Code behavior
    - [Workflow](./workflow.md) - How Agentic Code processes tasks and executes work
    - [Vision](./vision.md) - Long-term vision and goals for Agentic Code
    - [User Documentation](../user/README.md) - End-user guides and resources
    - [Developer Documentation](../developer/README.md) - Development guidelines and API references
    - [CLI Documentation](../cli/README.md) - Command-line interface specifics