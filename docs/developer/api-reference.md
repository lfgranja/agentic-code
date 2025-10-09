# Agentic-code API Documentation

## Table of Contents

1. [Overview](#overview)
2. [MCP Client API](#mcp-client-api)
3. [Tool System API](#tool-system-api)
4. [Provider Interface API](#provider-interface-api)
5. [IDE Integration API](#ide-integration-api)
6. [Configuration API](#configuration-api)
7. [Authentication API](#authentication-api)
8. [Error Handling](#error-handling)

## Overview

Agentic-code provides a comprehensive API for interacting with AI models, tools, and development environments. This documentation covers the main APIs available in the system.

## MCP Client API

### McpClient Class

The `McpClient` class provides the main interface for interacting with MCP (Model Context Protocol) servers.

#### Constructor

```typescript
constructor(
  serverName: string,
  serverConfig: MCPServerConfig,
  toolRegistry: ToolRegistry,
  promptRegistry: PromptRegistry,
  workspaceContext: WorkspaceContext,
  debugMode: boolean
)
```

#### Methods

##### connect()

Connects to the MCP server.

```typescript
async connect(): Promise<void>
```

##### discover()

Discovers tools and prompts from the MCP server.

```typescript
async discover(): Promise<void>
```

##### disconnect()

Disconnects from the MCP server.

```typescript
async disconnect(): Promise<void>
```

##### getStatus()

Returns the current status of the client.

```typescript
getStatus(): MCPServerStatus
```

### MCPServerConfig Interface

Configuration for MCP servers.

```typescript
interface MCPServerConfig {
  command?: string;
  args?: string[];
  url?: string;
  httpUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
  trust?: string | string[];
  authProviderType?: AuthProviderType;
  oauth?: OAuthConfig;
  env?: Record<string, string>;
  cwd?: string;
  includeTools?: string[];
  excludeTools?: string[];
}
```

### MCPServerStatus Enum

Status of MCP server connections.

```typescript
enum MCPServerStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
}
```

## Tool System API

### BaseDeclarativeTool Class

Base class for creating tools.

```typescript
abstract class BaseDeclarativeTool<TParams, TResult> {
  constructor(
    name: string,
    displayName: string,
    description: string,
    kind: Kind,
    parameterSchema: unknown,
    isOutputMarkdown: boolean = true,
    canUpdateOutput: boolean = false
  )
  
  abstract createInvocation(params: TParams): ToolInvocation<TParams, TResult>
}
```

### ToolInvocation Interface

Represents a tool invocation.

```typescript
interface ToolInvocation<TParams, TResult> {
  params: TParams;
  getDescription(): string;
  toolLocations(): ToolLocation[];
  shouldConfirmExecute(abortSignal: AbortSignal): Promise<ToolCallConfirmationDetails | false>;
  execute(signal: AbortSignal, updateOutput?: (output: ToolResultDisplay) => void): Promise<TResult>;
}
```

### ToolResult Interface

Result of a tool execution.

```typescript
interface ToolResult {
  llmContent: PartListUnion;
  returnDisplay: ToolResultDisplay;
  error?: {
    message: string;
    type?: ToolErrorType;
  };
}
```

### ToolRegistry Class

Registry for managing tools.

#### Methods

##### registerTool()

Registers a new tool.

```typescript
registerTool(tool: AnyDeclarativeTool): void
```

##### getTool()

Gets a tool by name.

```typescript
getTool(name: string): AnyDeclarativeTool | undefined
```

##### getAllTools()

Gets all registered tools.

```typescript
getAllTools(): AnyDeclarativeTool[]
```

##### getFunctionDeclarations()

Gets function declarations for all tools.

```typescript
getFunctionDeclarations(): FunctionDeclaration[]
```

## Provider Interface API

### ContentGenerator Interface

Interface for content generation providers.

```typescript
interface ContentGenerator {
  generateContent(params: GenerateContentParams, promptId: string): Promise<GenerateContentResponse>;
  generateContentStream(params: GenerateContentParams, promptId: string): Promise<AsyncGenerator<GenerateContentResponse>>;
  embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse>;
  countTokens(params: CountTokensParams): Promise<CountTokensResponse>;
  userTier?: UserTierId;
}
```

### GeminiClient Class

Client for interacting with Gemini models.

#### Constructor

```typescript
constructor(config: Config)
```

#### Methods

##### initialize()

Initializes the client.

```typescript
async initialize(contentGeneratorConfig: ContentGeneratorConfig, extraHistory?: Content[]): Promise<void>
```

##### sendMessageStream()

Sends a message and returns a stream.

```typescript
async *sendMessageStream(
  request: PartListUnion,
  signal: AbortSignal,
  prompt_id: string,
  turns: number = MAX_TURNS,
  originalModel?: string
): AsyncGenerator<ServerGeminiStreamEvent, Turn>
```

##### generateContent()

Generates content.

```typescript
async generateContent(
  contents: Content[],
  generationConfig: GenerateContentConfig,
  abortSignal: AbortSignal,
  model?: string
): Promise<GenerateContentResponse>
```

##### generateEmbedding()

Generates embeddings.

```typescript
async generateEmbedding(texts: string[]): Promise<number[][]>
```

## IDE Integration API

### IdeClient Class

Client for IDE integration.

#### Constructor

```typescript
constructor()
```

#### Methods

##### connect()

Connects to the IDE.

```typescript
async connect(): Promise<boolean>
```

##### disconnect()

Disconnects from the IDE.

```typescript
async disconnect(): Promise<void>
```

##### isConnected()

Checks if connected to the IDE.

```typescript
isConnected(): boolean
```

##### getWorkspaceState()

Gets the current workspace state.

```typescript
getWorkspaceState(): WorkspaceState | undefined
```

##### updateFile()

Updates a file in the IDE.

```typescript
async updateFile(filePath: string, newContent: string): Promise<DiffUpdateResult>
```

### IdeContext Class

Manages IDE context.

#### Methods

##### getIdeContext()

Gets the current IDE context.

```typescript
getIdeContext(): IdeContext | undefined
```

##### setIdeContext()

Sets the IDE context.

```typescript
setIdeContext(context: IdeContext): void
```

##### subscribe()

Subscribes to IDE context changes.

```typescript
subscribe(callback: (context: IdeContext) => void): () => void
```

## Configuration API

### Config Class

Manages configuration.

#### Constructor

```typescript
constructor(configPath?: string)
```

#### Methods

##### get()

Gets a configuration value.

```typescript
get<T>(key: string, defaultValue?: T): T
```

##### set()

Sets a configuration value.

```typescript
set(key: string, value: unknown): void
```

##### save()

Saves the configuration.

```typescript
save(): Promise<void>
```

##### load()

Loads the configuration.

```typescript
load(): Promise<void>
```

### ConfigSchema Interface

Schema for configuration.

```typescript
interface ConfigSchema {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
  tools: {
    enabled: string[];
    disabled: string[];
  };
  ide: {
    enabled: boolean;
    autoSync: boolean;
  };
  sandbox: {
    enabled: boolean;
    type: string;
  };
}
```

## Authentication API

### MCPOAuthProvider Class

Provider for OAuth authentication.

#### Methods

##### authenticate()

Authenticates with OAuth.

```typescript
static async authenticate(
  serverName: string,
  oauthConfig: OAuthConfig,
  serverUrl?: string
): Promise<void>
```

##### getValidToken()

Gets a valid OAuth token.

```typescript
static async getValidToken(
  serverName: string,
  oauthConfig: OAuthConfig
): Promise<string | null>
```

##### refreshToken()

Refreshes an OAuth token.

```typescript
static async refreshToken(
  serverName: string,
  oauthConfig: OAuthConfig
): Promise<string | null>
```

### GoogleCredentialProvider Class

Provider for Google credentials authentication.

#### Constructor

```typescript
constructor(serverConfig: MCPServerConfig)
```

#### Methods

##### getAccessToken()

Gets an access token.

```typescript
async getAccessToken(): Promise<string>
```

## Error Handling

### Error Types

#### ToolError

Error thrown by tools.

```typescript
class ToolError extends Error {
  constructor(message: string, public type: ToolErrorType, public details?: unknown)
}
```

#### ProviderError

Error thrown by providers.

```typescript
class ProviderError extends Error {
  constructor(message: string, public provider: string, public details?: unknown)
}
```

#### ConfigurationError

Error thrown by configuration issues.

```typescript
class ConfigurationError extends Error {
  constructor(message: string, public key?: string, public value?: unknown)
}
```

### Error Handling Best Practices

1. Always handle errors in async functions with try/catch
2. Check for specific error types to provide appropriate responses
3. Log errors for debugging purposes
4. Provide meaningful error messages to users
5. Implement retry logic for transient errors

### Example Error Handling

```typescript
try {
  const result = await tool.execute(signal);
  return result;
} catch (error) {
  if (error instanceof ToolError) {
    console.error(`Tool error: ${error.message}`);
    // Handle tool-specific error
  } else if (error instanceof ProviderError) {
    console.error(`Provider error: ${error.message}`);
    // Handle provider-specific error
  } else {
    console.error(`Unexpected error: ${error.message}`);
    // Handle unexpected error
  }
  throw error;
}
```

## Usage Examples

### Creating a Custom Tool

```typescript
class MyCustomTool extends BaseDeclarativeTool<MyParams, MyResult> {
  constructor() {
    super(
      'my-custom-tool',
      'My Custom Tool',
      'A custom tool for demonstration',
      Kind.Other,
      {
        type: 'object',
        properties: {
          input: { type: 'string', description: 'Input value' }
        },
        required: ['input']
      }
    );
  }

  protected createInvocation(params: MyParams): ToolInvocation<MyParams, MyResult> {
    return new MyCustomToolInvocation(params);
  }
}
```

### Connecting to a Custom Provider

```typescript
const config: MCPServerConfig = {
  url: 'https://api.example.com/mcp',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
};

const client = new McpClient(
  'custom-provider',
  config,
  toolRegistry,
  promptRegistry,
  workspaceContext,
  false
);

await client.connect();
await client.discover();
```

### Using the IDE Integration API

```typescript
const ideClient = new IdeClient();
await ideClient.connect();

const workspaceState = ideClient.getWorkspaceState();
if (workspaceState) {
  console.log('Active file:', workspaceState.activeFile);
}

const result = await ideClient.updateFile('/path/to/file.js', newContent);
console.log('Update result:', result);
```

This API documentation provides a comprehensive overview of the main APIs available in Agentic-code. For more detailed information about specific APIs, refer to the source code and inline documentation.



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
- [Developer Guide](./development-guide.md) - Comprehensive guide for contributing to Agentic Code
- [API Reference](./api-reference.md) - Detailed API documentation
- [Plugin Development Guide](./plugin-development.md) - Guide for creating and maintaining plugins
- [Contributing Guide](./contributing.md) - Guidelines for contributing to the project
- [Core Concepts](../agentic/README.md) - Fundamental principles and architecture
- [Constitution](../agentic/constitution.md) - Core principles and values that guide Agentic Code behavior
- [Workflow](../agentic/workflow.md) - How Agentic Code processes tasks and executes work
- [Architecture](../agentic/architecture.md) - Detailed architecture documentation
- [Vision](../agentic/vision.md) - Long-term vision and goals for Agentic Code

## Need Help?

If you encounter issues, check the [Troubleshooting Guide](../user/troubleshooting.md) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](../../LICENSE) - Apache License 2.0