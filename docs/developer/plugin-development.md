# Agentic-code Plugin Development Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Plugin Architecture](#plugin-architecture)
3. [Creating Custom Tools](#creating-custom-tools)
4. [Creating Custom Providers](#creating-custom-providers)
5. [Creating Custom Services](#creating-custom-services)
6. [Plugin Distribution](#plugin-distribution)
7. [Examples and Templates](#examples-and-templates)
8. [Best Practices](#best-practices)

## Introduction

Agentic-code supports extensibility through a plugin system. This guide covers how to create custom tools, providers, and services to extend the functionality of Agentic-code.

### What Can Be Extended?

1. **Tools**: Custom operations for interacting with the development environment
2. **Providers**: Custom AI model providers
3. **Services**: Custom services for specific functionality

### Plugin Types

1. **Internal Plugins**: Built into the main application
2. **External Plugins**: Distributed separately and loaded dynamically

## Plugin Architecture

### Plugin Interface

All plugins must implement the `Plugin` interface:

```typescript
interface Plugin {
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies?: string[];
  
  initialize(context: PluginContext): Promise<void>;
  destroy(): Promise<void>;
}
```

### Plugin Context

Plugins receive a context object that provides access to core functionality:

```typescript
interface PluginContext {
  toolRegistry: ToolRegistry;
  providerRegistry: ProviderRegistry;
  serviceRegistry: ServiceRegistry;
  config: Config;
  logger: Logger;
}
```

### Plugin Lifecycle

1. **Loading**: Plugin is discovered and loaded
2. **Initialization**: Plugin's `initialize` method is called
3. **Registration**: Plugin registers its components
4. **Active**: Plugin is active and functional
5. **Destruction**: Plugin's `destroy` method is called
6. **Unloading**: Plugin is unloaded

## Creating Custom Tools

### Tool Architecture

Custom tools extend the `BaseDeclarativeTool` class:

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
  
  abstract createInvocation(params: TParams): ToolInvocation<TParams, TResult>;
}
```

### Example: Custom File Search Tool

1. **Create the tool class**:

```typescript
// packages/core/src/tools/custom-search.ts
import { BaseDeclarativeTool } from '../tools.js';
import { ToolInvocation, ToolResult, Kind } from '../tools.js';
import { glob } from 'glob';

interface CustomSearchParams {
  pattern: string;
  directory?: string;
  exclude?: string[];
}

interface CustomSearchResult extends ToolResult {
  matches: string[];
}

class CustomSearchInvocation extends BaseToolInvocation<CustomSearchParams, CustomSearchResult> {
  getDescription(): string {
    return `Search for files matching pattern: ${this.params.pattern}`;
  }

  toolLocations(): ToolLocation[] {
    return this.params.matches.map(file => ({ path: file }));
  }

  async execute(signal: AbortSignal): Promise<CustomSearchResult> {
    const { pattern, directory = '.', exclude = [] } = this.params;
    
    const options = {
      cwd: directory,
      ignore: exclude,
      nodir: true
    };
    
    const matches = await glob(pattern, options);
    
    return {
      llmContent: `Found ${matches.length} files matching pattern '${pattern}':\n${matches.join('\n')}`,
      returnDisplay: `Found ${matches.length} files:\n${matches.join('\n')}`,
      matches
    };
  }
}

export class CustomSearchTool extends BaseDeclarativeTool<CustomSearchParams, CustomSearchResult> {
  constructor() {
    super(
      'custom-search',
      'Custom Search',
      'Search for files using glob patterns',
      Kind.Search,
      {
        type: 'object',
        properties: {
          pattern: { type: 'string', description: 'Glob pattern to search for' },
          directory: { type: 'string', description: 'Directory to search in', default: '.' },
          exclude: { type: 'array', items: { type: 'string' }, description: 'Patterns to exclude' }
        },
        required: ['pattern']
      }
    );
  }

  protected createInvocation(params: CustomSearchParams): ToolInvocation<CustomSearchParams, CustomSearchResult> {
    return new CustomSearchInvocation(params);
  }
}
```

2. **Create a plugin wrapper**:

```typescript
// plugins/custom-search/plugin.ts
import { Plugin, PluginContext } from '../plugin-interface.js';
import { CustomSearchTool } from './custom-search.js';

export default class CustomSearchPlugin implements Plugin {
  name = 'custom-search';
  version = '1.0.0';
  description = 'Custom file search tool';
  author = 'Your Name';

  async initialize(context: PluginContext): Promise<void> {
    const tool = new CustomSearchTool();
    context.toolRegistry.registerTool(tool);
    context.logger.info(`Registered tool: ${tool.name}`);
  }

  async destroy(): Promise<void> {
    // Cleanup if needed
  }
}
```

3. **Create a package.json**:

```json
{
  "name": "agentic-code-custom-search",
  "version": "1.0.0",
  "description": "Custom file search plugin for Agentic-code",
  "main": "dist/plugin.js",
  "keywords": ["agentic-code", "plugin", "search"],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "agentic-code": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

## Creating Custom Providers

### Provider Architecture

Custom providers implement the `ContentGenerator` interface:

```typescript
interface ContentGenerator {
  generateContent(params: GenerateContentParams, promptId: string): Promise<GenerateContentResponse>;
  generateContentStream(params: GenerateContentParams, promptId: string): Promise<AsyncGenerator<GenerateContentResponse>>;
  embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse>;
  countTokens(params: CountTokensParams): Promise<CountTokensResponse>;
  userTier?: UserTierId;
}
```

### Example: Custom OpenAI-Compatible Provider

1. **Create the provider class**:

```typescript
// packages/core/src/providers/custom-openai.ts
import { ContentGenerator } from '../core/contentGenerator.js';
import { GenerateContentParams, GenerateContentResponse, Part, Content, FunctionCall } from '@google/genai';

interface CustomOpenAIConfig {
  apiKey: string;
  baseURL: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export class CustomOpenAIProvider implements ContentGenerator {
  readonly name = 'custom-openai';
  userTier?: string;

  constructor(private config: CustomOpenAIConfig) {}

  async generateContent(
    params: GenerateContentParams,
    promptId: string
  ): Promise<GenerateContentResponse> {
    const response = await this.makeRequest('/chat/completions', {
      model: this.config.model,
      messages: this.convertContents(params.contents),
      max_tokens: params.config?.maxOutputTokens || this.config.maxTokens || 1024,
      temperature: params.config?.temperature || this.config.temperature || 0.7,
      stream: false
    });

    return this.convertResponse(response);
  }

  async generateContentStream(
    params: GenerateContentParams,
    promptId: string
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    const response = await this.makeRequest('/chat/completions', {
      model: this.config.model,
      messages: this.convertContents(params.contents),
      max_tokens: params.config?.maxOutputTokens || this.config.maxTokens || 1024,
      temperature: params.config?.temperature || this.config.temperature || 0.7,
      stream: true
    });

    return this.convertStreamResponse(response);
  }

  async embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse> {
    const response = await this.makeRequest('/embeddings', {
      model: 'text-embedding-ada-002',
      input: params.content
    });

    return {
      embedding: {
        values: response.data[0].embedding
      }
    };
  }

  async countTokens(params: CountTokensParams): Promise<CountTokensResponse> {
    // Approximate token counting (replace with actual implementation)
    const text = JSON.stringify(params.contents);
    const tokens = Math.ceil(text.length / 4);
    
    return {
      totalTokens: tokens
    };
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    const url = `${this.config.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private convertContents(contents: Content[]): any[] {
    return contents.map(content => ({
      role: content.role,
      content: content.parts.map(part => 'text' in part ? part.text : '').join('')
    }));
  }

  private convertResponse(response: any): GenerateContentResponse {
    const choice = response.choices[0];
    const message = choice.message;
    
    const parts: Part[] = [];
    
    if (message.content) {
      parts.push({ text: message.content });
    }
    
    if (message.function_call) {
      parts.push({
        functionCall: {
          name: message.function_call.name,
          args: JSON.parse(message.function_call.arguments)
        }
      });
    }
    
    return {
      candidates: [{
        content: {
          parts,
          role: 'model'
        },
        finishReason: choice.finish_reason === 'stop' ? 'STOP' : 'OTHER'
      }]
    };
  }

  private async *convertStreamResponse(response: Response): AsyncGenerator<GenerateContentResponse> {
    // Implementation for streaming response conversion
    // This would involve parsing the server-sent events format
  }
}
```

2. **Create a plugin wrapper**:

```typescript
// plugins/custom-openai/plugin.ts
import { Plugin, PluginContext } from '../plugin-interface.js';
import { CustomOpenAIProvider } from './custom-openai.js';

export default class CustomOpenAIPlugin implements Plugin {
  name = 'custom-openai';
  version = '1.0.0';
  description = 'Custom OpenAI-compatible provider';
  author = 'Your Name';

  async initialize(context: PluginContext): Promise<void> {
    const config = context.config.get('providers.custom-openai');
    
    if (!config) {
      throw new Error('Custom OpenAI provider configuration not found');
    }
    
    const provider = new CustomOpenAIProvider(config);
    context.providerRegistry.registerProvider('custom-openai', provider);
    context.logger.info(`Registered provider: custom-openai`);
  }

  async destroy(): Promise<void> {
    // Cleanup if needed
  }
}
```

## Creating Custom Services

### Service Architecture

Custom services implement a specific interface based on their functionality:

```typescript
interface Service {
  name: string;
  initialize(context: ServiceContext): Promise<void>;
  destroy(): Promise<void>;
}
```

### Example: Custom Analytics Service

1. **Create the service class**:

```typescript
// packages/core/src/services/analytics.ts
import { Service } from '../service-interface.js';

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
}

export class AnalyticsService implements Service {
  name = 'analytics';

  private events: AnalyticsEvent[] = [];
  private flushInterval?: NodeJS.Timeout;

  async initialize(context: ServiceContext): Promise<void> {
    // Set up periodic flushing of events
    this.flushInterval = setInterval(() => {
      this.flushEvents();
    }, 60000); // Flush every minute
  }

  async destroy(): Promise<void> {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    
    // Flush remaining events
    await this.flushEvents();
  }

  trackEvent(event: string, properties: Record<string, any> = {}): void {
    this.events.push({
      event,
      properties,
      timestamp: Date.now()
    });
  }

  private async flushEvents(): Promise<void> {
    if (this.events.length === 0) {
      return;
    }
    
    const eventsToSend = [...this.events];
    this.events = [];
    
    try {
      // Send events to analytics service
      await this.sendEvents(eventsToSend);
    } catch (error) {
      // Re-add events if sending failed
      this.events.unshift(...eventsToSend);
    }
  }

  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    // Implementation for sending events to analytics service
    // This would involve making an HTTP request to your analytics endpoint
  }
}
```

2. **Create a plugin wrapper**:

```typescript
// plugins/analytics/plugin.ts
import { Plugin, PluginContext } from '../plugin-interface.js';
import { AnalyticsService } from './analytics.js';

export default class AnalyticsPlugin implements Plugin {
  name = 'analytics';
  version = '1.0.0';
  description = 'Analytics service for tracking usage';
  author = 'Your Name';

  async initialize(context: PluginContext): Promise<void> {
    const service = new AnalyticsService();
    await service.initialize(context);
    context.serviceRegistry.registerService('analytics', service);
    context.logger.info(`Registered service: analytics`);
  }

  async destroy(): Promise<void> {
    // Cleanup if needed
  }
}
```

## Plugin Distribution

### Packaging Plugins

1. **Create a proper package structure**:

```
my-plugin/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   └── plugin.ts
└── dist/
    ├── index.js
    └── plugin.js
```

2. **Configure TypeScript**:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

3. **Build the plugin**:

```bash
npm run build
```

4. **Publish to npm**:

```bash
npm publish
```

### Installing Plugins

1. **Install from npm**:

```bash
npm install -g agentic-code-my-plugin
```

2. **Install from local file**:

```bash
npm install -g ./path/to/my-plugin
```

3. **Enable the plugin**:

```bash
agentic-code plugin enable my-plugin
```

## Examples and Templates

### Tool Template

```typescript
import { BaseDeclarativeTool } from '@agentic-code/tools';
import { ToolInvocation, ToolResult, Kind } from '@agentic-code/tools';

interface MyToolParams {
  // Define your parameters here
}

interface MyToolResult extends ToolResult {
  // Define your result properties here
}

class MyToolInvocation extends BaseToolInvocation<MyToolParams, MyToolResult> {
  getDescription(): string {
    // Return a description of what this invocation does
  }

  toolLocations(): ToolLocation[] {
    // Return the locations this tool affects
  }

  async execute(signal: AbortSignal): Promise<MyToolResult> {
    // Implement your tool logic here
    return {
      llmContent: "Result for LLM",
      returnDisplay: "Result for display"
    };
  }
}

export class MyTool extends BaseDeclarativeTool<MyToolParams, MyToolResult> {
  constructor() {
    super(
      'my-tool',
      'My Tool',
      'Description of what this tool does',
      Kind.Other,
      {
        type: 'object',
        properties: {
          // Define your parameter schema here
        },
        required: []
      }
    );
  }

  protected createInvocation(params: MyToolParams): ToolInvocation<MyToolParams, MyToolResult> {
    return new MyToolInvocation(params);
  }
}
```

### Provider Template

```typescript
import { ContentGenerator } from '@agentic-code/core';
import { GenerateContentParams, GenerateContentResponse } from '@google/genai';

interface MyProviderConfig {
  // Define your configuration here
}

export class MyProvider implements ContentGenerator {
  readonly name = 'my-provider';

  constructor(private config: MyProviderConfig) {}

  async generateContent(
    params: GenerateContentParams,
    promptId: string
  ): Promise<GenerateContentResponse> {
    // Implement your content generation logic here
  }

  async generateContentStream(
    params: GenerateContentParams,
    promptId: string
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // Implement your streaming logic here
  }

  async embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse> {
    // Implement your embedding logic here
  }

  async countTokens(params: CountTokensParams): Promise<CountTokensResponse> {
    // Implement your token counting logic here
  }
}
```

### Plugin Template

```typescript
import { Plugin, PluginContext } from '@agentic-code/plugin-interface';

export default class MyPlugin implements Plugin {
  name = 'my-plugin';
  version = '1.0.0';
  description = 'Description of my plugin';
  author = 'Your Name';

  async initialize(context: PluginContext): Promise<void> {
    // Register your tools, providers, and services here
    context.logger.info(`Initialized plugin: ${this.name}`);
  }

  async destroy(): Promise<void> {
    // Cleanup if needed
    context.logger.info(`Destroyed plugin: ${this.name}`);
  }
}
```

## Best Practices

### General Guidelines

1. **Follow TypeScript best practices**: Use strict typing and avoid `any`
2. **Handle errors gracefully**: Provide meaningful error messages
3. **Support cancellation**: Respect abort signals for long-running operations
4. **Log appropriately**: Use the provided logger for debugging
5. **Document your code**: Use TSDoc/JSDoc comments for public APIs

### Tool-Specific Guidelines

1. **Validate parameters**: Use JSON Schema for validation
2. **Provide meaningful descriptions**: Help users understand what the tool does
3. **Handle edge cases**: Consider empty inputs, missing files, etc.
4. **Return structured results**: Use the `ToolResult` interface
5. **Implement location tracking**: Help with context awareness

### Provider-Specific Guidelines

1. **Implement all required methods**: Ensure full interface compliance
2. **Handle rate limiting**: Implement exponential backoff
3. **Cache responses when appropriate**: Improve performance
4. **Provide meaningful error messages**: Help with debugging
5. **Support streaming**: Provide real-time responses when possible

### Service-Specific Guidelines

1. **Implement proper lifecycle management**: Clean up resources
2. **Handle configuration errors**: Provide clear error messages
3. **Support hot reloading**: Allow configuration changes without restart
4. **Provide metrics**: Help with monitoring and debugging
5. **Be stateless or manage state carefully**: Avoid unexpected behavior

This plugin development guide provides comprehensive information for extending Agentic-code with custom functionality. For more specific information, refer to the [API Documentation](api-reference.md) or [Developer Guide](development-guide.md).