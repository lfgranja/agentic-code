# Agentic-code Developer Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Development Setup](#development-setup)
3. [Project Structure](#project-structure)
4. [Adding New Tools](#adding-new-tools)
5. [Adding New Providers](#adding-new-providers)
6. [Testing Guidelines](#testing-guidelines)
7. [Code Style and Conventions](#code-style-and-conventions)
8. [Debugging](#debugging)
9. [Performance Considerations](#performance-considerations)
10. [Contributing Process](#contributing-process)

## Introduction

This guide is for developers who want to contribute to Agentic-code or extend its functionality. It covers the development setup, project structure, and guidelines for adding new features.

## Development Setup

### Prerequisites

- Node.js version 20.19.0 or higher
- Git
- A code editor (VS Code recommended)

### Setting Up the Development Environment

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/agentic-code.git
   cd agentic-code
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Link for local development:
   ```bash
   npm link
   ```

### Development Scripts

- `npm run build` - Build the project
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run linting
- `npm run format` - Format code
- `npm run preflight` - Run all checks (lint, format, test)
- `npm run debug` - Start in debug mode
- `npm start` - Start the application

### VS Code Setup

1. Install the recommended extensions:
   - TypeScript and JavaScript Language Features
   - ESLint
   - Prettier
   - Jest

2. Configure VS Code settings:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

3. Use the provided launch configuration for debugging

## Project Structure

```
packages/
├── cli/                    # Command-line interface
│   ├── src/
│   │   ├── commands/       # CLI commands
│   │   ├── config/         # Configuration management
│   │   ├── ui/             # UI components
│   │   └── utils/          # Utility functions
│   └── package.json
└── core/                   # Core backend logic
    ├── src/
    │   ├── config/         # Configuration
    │   ├── core/           # Core functionality
    │   ├── ide/            # IDE integration
    │   ├── services/       # Services
    │   ├── tools/          # Tool system
    │   └── utils/          # Utility functions
    └── package.json
docs/
├── agentic/               # Core concepts
│   ├── constitution.md    # Project constitution
│   ├── workflow.md        # Workflow guidelines
│   └── architecture.md    # Architecture overview
├── developer/
│   ├── api-reference.md   # API documentation
│   └── development-guide.md  # Developer guide (this file)
└── user/
    └── user-guide.md      # User guide
```

### Key Directories

- `packages/cli/src/commands/` - CLI command implementations
- `packages/core/src/tools/` - Tool system implementations
- `packages/core/src/core/` - Core functionality like client management
- `packages/core/src/ide/` - IDE integration code
- `packages/core/src/services/` - Service implementations

## Adding New Tools

### Tool Architecture

Tools in Agentic-code are implemented using a declarative pattern. Each tool extends the `BaseDeclarativeTool` class and implements the `createInvocation` method.

### Creating a New Tool

1. Create a new file in `packages/core/src/tools/`:
   ```typescript
   // packages/core/src/tools/my-tool.ts
   import { BaseDeclarativeTool } from '../tools.js';
   import { ToolInvocation, ToolResult } from '../tools.js';

   interface MyToolParams {
     input: string;
   }

   interface MyToolResult extends ToolResult {
     // Custom result properties
   }

   class MyToolInvocation extends BaseToolInvocation<MyToolParams, MyToolResult> {
     getDescription(): string {
       return `Process input: ${this.params.input}`;
     }

     async execute(signal: AbortSignal): Promise<MyToolResult> {
       // Tool implementation
       return {
         llmContent: `Processed: ${this.params.input}`,
         returnDisplay: `Processed: ${this.params.input}`,
       };
     }
   }

   export class MyTool extends BaseDeclarativeTool<MyToolParams, MyToolResult> {
     constructor() {
       super(
         'my-tool',
         'My Tool',
         'A tool for processing input',
         Kind.Other,
         {
           type: 'object',
           properties: {
             input: { type: 'string', description: 'Input to process' }
           },
           required: ['input']
         }
       );
     }

     protected createInvocation(params: MyToolParams): ToolInvocation<MyToolParams, MyToolResult> {
       return new MyToolInvocation(params);
     }
   }
   ```

2. Register the tool in the tool registry:
   ```typescript
   // packages/core/src/tools/tool-registry.ts
   import { MyTool } from './my-tool.js';

   // In the constructor or initialization method
   this.registerTool(new MyTool());
   ```

3. Add tests for the tool:
   ```typescript
   // packages/core/src/tools/__tests__/my-tool.test.ts
   import { MyTool } from '../my-tool.js';

   describe('MyTool', () => {
     let tool: MyTool;

     beforeEach(() => {
       tool = new MyTool();
     });

     it('should process input correctly', async () => {
       const invocation = tool.build({ input: 'test' });
       const result = await invocation.execute(new AbortController().signal);
       expect(result.llmContent).toBe('Processed: test');
     });
   });
   ```

### Tool Best Practices

1. Follow the declarative tool pattern
2. Implement proper error handling
3. Use TypeScript for type safety
4. Add comprehensive tests
5. Document the tool's purpose and parameters
6. Handle abort signals for cancellation
7. Provide meaningful descriptions and return values

## Adding New Providers

### Provider Architecture

Providers in Agentic-code implement the `ContentGenerator` interface, which defines methods for generating content, streaming responses, and handling embeddings.

### Creating a New Provider

1. Create a new file in `packages/core/src/providers/`:
   ```typescript
   // packages/core/src/providers/my-provider.ts
   import { ContentGenerator } from '../core/contentGenerator.js';
   import { GenerateContentParams, GenerateContentResponse } from '@google/genai';

   export class MyProvider implements ContentGenerator {
     readonly name = 'my-provider';
     userTier?: string;

     async generateContent(
       params: GenerateContentParams,
       promptId: string
     ): Promise<GenerateContentResponse> {
       // Provider implementation
     }

     async generateContentStream(
       params: GenerateContentParams,
       promptId: string
     ): Promise<AsyncGenerator<GenerateContentResponse>> {
       // Streaming implementation
     }

     async embedContent(params: EmbedContentParameters): Promise<EmbedContentResponse> {
       // Embedding implementation
     }

     async countTokens(params: CountTokensParams): Promise<CountTokensResponse> {
       // Token counting implementation
     }
   }
   ```

2. Add the provider to the content generator factory:
   ```typescript
   // packages/core/src/core/contentGenerator.ts
   import { MyProvider } from '../providers/my-provider.js';

   // In the createContentGenerator function
   if (config.authType === AuthType.MY_PROVIDER) {
     return new MyProvider(config);
   }
   ```

3. Add configuration options for the provider:
   ```typescript
   // packages/core/src/config/config.ts
   interface MyProviderConfig {
     apiKey: string;
     endpoint: string;
     model: string;
   }
   ```

4. Add tests for the provider:
   ```typescript
   // packages/core/src/providers/__tests__/my-provider.test.ts
   import { MyProvider } from '../my-provider.js';

   describe('MyProvider', () => {
     let provider: MyProvider;

     beforeEach(() => {
       provider = new MyProvider({
         apiKey: 'test-key',
         endpoint: 'https://api.example.com',
         model: 'test-model'
       });
     });

     it('should generate content', async () => {
       const result = await provider.generateContent({
         model: 'test-model',
         contents: [{ role: 'user', parts: [{ text: 'Hello' }] }]
       }, 'test-prompt');
       expect(result).toBeDefined();
     });
   });
   ```

### Provider Best Practices

1. Implement all required methods from the `ContentGenerator` interface
2. Handle authentication and API errors gracefully
3. Use TypeScript for type safety
4. Add comprehensive tests
5. Document the provider's configuration options
6. Handle rate limiting and retry logic
7. Provide meaningful error messages

## Testing Guidelines

### Test Structure

Tests are organized in `__tests__` directories alongside the source code. Use the following structure:

```
packages/core/src/tools/
├── my-tool.ts
└── __tests__/
    └── my-tool.test.ts
```

### Test Types

1. **Unit Tests**: Test individual functions and classes in isolation
2. **Integration Tests**: Test interactions between components
3. **End-to-End Tests**: Test complete user workflows

### Writing Tests

1. Use Jest for testing
2. Follow the AAA pattern (Arrange, Act, Assert)
3. Use descriptive test names
4. Mock external dependencies
5. Test both success and error cases

### Example Test

```typescript
import { MyTool } from '../my-tool.js';

describe('MyTool', () => {
  let tool: MyTool;

  beforeEach(() => {
    tool = new MyTool();
  });

  describe('build', () => {
    it('should create a valid invocation', () => {
      const invocation = tool.build({ input: 'test' });
      expect(invocation).toBeDefined();
      expect(invocation.params.input).toBe('test');
    });

    it('should throw an error for invalid params', () => {
      expect(() => tool.build({})).toThrow();
    });
  });

  describe('execute', () => {
    it('should process input correctly', async () => {
      const invocation = tool.build({ input: 'test' });
      const result = await invocation.execute(new AbortController().signal);
      expect(result.llmContent).toBe('Processed: test');
    });

    it('should handle abort signals', async () => {
      const controller = new AbortController();
      controller.abort();
      const invocation = tool.build({ input: 'test' });
      await expect(invocation.execute(controller.signal)).rejects.toThrow();
    });
  });
});
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests for a specific file
npm run test -- packages/core/src/tools/__tests__/my-tool.test.ts

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage
```

## Code Style and Conventions

### TypeScript

1. Use strict type checking
2. Avoid using `any` type
3. Use interfaces for object shapes
4. Use enums for constants
5. Use generics for reusable components

### Naming Conventions

1. Use PascalCase for classes and interfaces
2. Use camelCase for variables and functions
3. Use UPPER_SNAKE_CASE for constants
4. Use kebab-case for file names

### Code Organization

1. Group related functionality
2. Use barrel exports for clean imports
3. Keep files small and focused
4. Use clear directory structure

### Documentation

1. Use TSDoc/JSDoc comments for public APIs
2. Document complex algorithms
3. Provide examples in documentation
4. Keep documentation up to date

### Example Code Style

```typescript
/**
 * Processes input data and returns a result.
 * @param input - The input data to process
 * @param options - Options for processing
 * @returns A promise that resolves to the processed result
 */
export async function processData(
  input: string,
  options: ProcessOptions = {}
): Promise<ProcessResult> {
  // Validate input
  if (!input.trim()) {
    throw new Error('Input cannot be empty');
  }

  // Process input
  const result = await doProcessing(input, options);

  return result;
}

interface ProcessOptions {
  /** Whether to validate the input */
  validate?: boolean;
  /** Timeout in milliseconds */
  timeout?: number;
}

interface ProcessResult {
  /** The processed data */
  data: string;
  /** Processing time in milliseconds */
  processingTime: number;
}
```

## Debugging

### Debug Mode

Run the application in debug mode:
```bash
npm run debug
```

### VS Code Debugging

1. Set breakpoints in your code
2. Use the "Launch Program" configuration
3. Use the debug console to inspect variables
4. Use the call stack to trace execution

### Logging

Use the built-in logger for debugging:
```typescript
import { logger } from '../utils/logger.js';

logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

### Debugging Tools

1. Chrome DevTools for Node.js debugging
2. VS Code debugger for integrated debugging
3. Console logging for quick debugging
4. Memory profiling for performance issues

## Performance Considerations

### Optimization Tips

1. Use async/await for asynchronous operations
2. Avoid blocking operations in the main thread
3. Use caching for expensive operations
4. Optimize bundle size for faster startup
5. Use streaming for large data processing

### Memory Management

1. Avoid memory leaks by properly cleaning up resources
2. Use weak references for cached data
3. Dispose of unused resources
4. Monitor memory usage with profiling tools

### Performance Monitoring

1. Use performance monitoring tools
2. Track key metrics like response time
3. Monitor resource usage
4. Profile bottlenecks in the code

## Contributing Process

### Before Contributing

1. Read the [Contributing Guidelines](./contributing.md)
2. Read the [Project Constitution](../agentic/constitution.md)
3. Read the [Workflow Guidelines](../agentic/workflow.md)
4. Set up your development environment

### Making Changes

1. Create a new branch from `main`
2. Make your changes following the guidelines
3. Add tests for your changes
4. Ensure all tests pass
5. Update documentation if needed

### Submitting Changes

1. Push your changes to your fork
2. Create a pull request
3. Fill out the PR template
4. Respond to code review feedback
5. Make necessary changes

### Code Review

1. Review the code for style and correctness
2. Check that tests are comprehensive
3. Verify that documentation is updated
4. Ensure the code follows project guidelines
5. Approve or request changes

This developer guide provides comprehensive information for contributing to Agentic-code. For more specific information, refer to the source code and inline documentation.

## Related Documentation

- [Contributing Guide](./contributing.md) - Guidelines for contributing to the project
- [API Reference](./api-reference.md) - Detailed API documentation
- [Plugin Development Guide](./plugin-development.md) - Guide for creating and maintaining plugins
- [User Documentation](../user/README.md) - End-user documentation
- [Core Concepts](../agentic/README.md) - Fundamental principles and architecture
- [Architecture Overview](../agentic/architecture.md) - Detailed architecture documentation
- [Constitution](../agentic/constitution.md) - Core principles and values that guide Agentic Code behavior
- [Workflow](../agentic/workflow.md) - How Agentic Code processes tasks and executes work