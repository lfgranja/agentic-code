# Agentic-code Workflow Manual

## Introduction

This document details the workflows and technical procedures that `agentic-code` must follow. It serves as a practical complement to the [Constitution](/docs/agentic/constitution.md), translating its principles into actionable rules for common software development tasks. Adherence to these workflows is mandatory to ensure consistency and quality throughout the codebase.

---

## Section 1: Code Generation and Modification

### 1.1 Generation of New Functions or Classes

1.  **Context Analysis**: Before writing any code, analyze adjacent files to understand coding patterns, naming conventions, and existing architecture.
2.  **Documentation First**: Always generate the documentation block (TSDoc/JSDoc) for the function or method before writing the implementation. The documentation should describe the purpose (`@summary`), parameters (`@param`), and return value (`@returns`).
3.  **Strict Typing**: All functions, parameters, and variables must have explicit types. Avoid the use of `any` unless absolutely inevitable and justified.
4.  **Pure Functions**: When possible, prefer pure functions (functions whose return value is determined solely by its input values, without observable side effects).
5.  **Error Handling**: Identify potential failure points (I/O operations, API calls, etc.) and implement robust error handling using `try...catch` and custom exceptions when appropriate.

### 1.2 Refactoring Existing Code

1.  **Identify the Objective**: Refactoring must have a clear objective (e.g., improve readability, increase performance, reduce complexity). State this objective before beginning.
2.  **Ensure Test Coverage**: Before modifying code, verify that unit tests exist covering the current behavior. If they don't exist, inform the user of the need to create them before proceeding.
3.  **Incremental Modifications**: Apply changes in small and verifiable steps.
4.  **Do Not Introduce New Functionality**: Refactoring focuses on improving the structure of existing code, not on adding new behaviors.

### 1.3 Tool Usage Patterns

1.  **File Operations**: Use the appropriate file tools for different operations:
    - Use `read_file` for analyzing existing code
    - Use `edit` for making targeted modifications
    - Use `write_file` for creating new files or complete rewrites
2.  **Search Operations**: Use `grep` or `search_file_content` for finding specific patterns in the codebase, and `glob` for finding files by pattern.
3.  **Shell Operations**: Use `run_shell_command` for system operations that cannot be accomplished through file tools.
4.  **Web Operations**: Use `web-fetch` for retrieving content from URLs and `web-search` for finding information online.

## Section 2: Testing

1.  **AAA Structure (Arrange-Act-Assert)**: All unit tests must strictly follow this structure.
    * **Arrange**: Set up initial conditions, mocks, and data necessary for the test.
    * **Act**: Execute the function or method being tested.
    * **Assert**: Verify that the result matches the expected outcome.
2.  **Clear Descriptions**: Use `describe` to group tests of the same unit (function or class) and `it` to clearly describe the specific behavior being tested (e.g., `it('should return an error when the user is not found')`).
3.  **Edge Case Coverage**: Generate tests not only for the "happy path" but also for edge cases, invalid inputs, and error handling.
4.  **Mocks and Stubs**: Use mocks to isolate the unit under test from its external dependencies (APIs, databases, etc.).
5.  **Integration Testing**: For tool implementations, create integration tests that verify the interaction with the actual system (file system, shell commands, etc.).

## Section 3: Version Control (Git)

1.  **Branch Naming**: Branches must follow the pattern `type/descriptive-name`, where `type` can be:
    * `feat`: For new features.
    * `fix`: For bug corrections.
    * `docs`: For documentation changes.
    * `refactor`: For code refactoring.
    * `test`: For adding or improving tests.
    * Example: `feat/multi-provider-architecture`

2.  **Commit Messages (Conventional Commits Pattern)**: Each commit must have a clear and standardized message.
    * **Format**: `type(scope): short lowercase description`
    * **Example**: `feat(providers): add initial IProvider interface`
    * **Body (Optional)**: Use the commit body to provide more context, explaining the "why" of the change, not just the "what".

## Section 4: Documentation

1.  **`README.md` Updates**: If a new user-visible feature is added (e.g., a new command), a brief description should be added to the features section of the main `README.md`.
2.  **Technical Documentation (`/docs`)**: For significant architectural changes (such as introducing a new abstraction layer), the `/docs/architecture.md` document should be updated.
3.  **Code Comments**: Use comments to explain complex parts, non-obvious design decisions, or specific algorithms. Do not comment what the code already clearly states.
4.  **API Documentation**: For public APIs, generate comprehensive documentation including examples, parameters, return values, and error conditions.

## Section 5: Multi-Provider Architecture

1.  **Provider Implementation**: When implementing a new provider:
    * Create a class that implements the provider interface
    * Handle authentication according to the provider's requirements
    * Implement proper error handling and retry logic
    * Add comprehensive tests for the provider implementation
2.  **Provider Configuration**: Follow the established patterns for provider configuration:
    * Use environment variables for sensitive information
    * Implement proper validation of configuration parameters
    * Provide clear error messages for configuration issues
3.  **Provider Switching**: Ensure smooth switching between providers:
    * Maintain consistent behavior across providers
    * Handle provider-specific limitations gracefully
    * Provide clear feedback when switching providers

## Section 6: IDE Integration

1.  **Diff Management**: When making code changes:
    * Use the IDE's diff interface when available
    * Provide clear descriptions of changes
    * Allow for user review and modification before applying changes
2.  **Context Awareness**: Utilize IDE context information:
    * Consider open files when making suggestions
    * Use cursor position for relevant context
    * Respect selected text when applicable
3.  **Real-time Synchronization**: Maintain synchronization with the IDE:
    * Update the IDE's view when files are modified
    * Handle file system changes appropriately
    - Maintain consistency between the agent's actions and the user's view

---

*This workflow manual should be consulted before executing any development task to ensure compliance with project standards.*