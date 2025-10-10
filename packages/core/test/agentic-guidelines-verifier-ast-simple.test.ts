import { describe, it, expect, beforeEach } from 'vitest';
import { AgenticGuidelinesVerifier } from '../src/agentic-guidelines-verifier-ast-simple';

describe('AgenticGuidelinesVerifier (AST-based simplified)', () => {
  let verifier: AgenticGuidelinesVerifier;

  beforeEach(() => {
    verifier = new AgenticGuidelinesVerifier();
  });

  describe('Code Quality Principles', () => {
    it('should verify clarity and readability', () => {
      const code = `
        // Good: descriptive name
        function calculateTotalPrice(items: number[]): number {
          return items.reduce((sum, price) => sum + price, 0);
        }
      `;
      
      const result = verifier.verifyCodeQuality(code);
      expect(result.clarityScore).toBeGreaterThan(0.7);
    });

    it('should detect poor naming that reduces clarity', () => {
      const code = `
        // Bad: unclear name
        function calc(x: number[]): number {
          return x.reduce((a, b) => a + b, 0);
        }
      `;
      
      const result = verifier.verifyCodeQuality(code);
      expect(result.clarityScore).toBeLessThan(0.5);
    });

    it('should verify simplicity (KISS principle)', () => {
      const simpleCode = `
        function add(a: number, b: number): number {
          return a + b;
        }
      `;
      
      const complexCode = `
        function add(a: number, b: number): number {
          const result = new Array(1);
          result[0] = a + b;
          return result[0];
        }
      `;
      
      const simpleResult = verifier.verifyCodeQuality(simpleCode);
      const complexResult = verifier.verifyCodeQuality(complexCode);
      
      expect(simpleResult.simplicityScore).toBeGreaterThan(complexResult.simplicityScore);
    });

    it('should verify consistency with codebase patterns', () => {
      // This would require analyzing the existing codebase patterns
      const code = `function exampleFunction(): void {}`;
      const result = verifier.verifyConsistency(code);
      expect(result).toHaveProperty('isConsistent');
    });

    it('should verify robustness and error handling', () => {
      const robustCode = `
        function divide(a: number, b: number): number {
          if (b === 0) {
            throw new Error('Division by zero');
          }
          return a / b;
        }
      `;
      
      const fragileCode = `
        function divide(a: number, b: number): number {
          return a / b; // No error handling
        }
      `;
      
      const robustResult = verifier.verifyRobustness(robustCode);
      const fragileResult = verifier.verifyRobustness(fragileCode);
      
      expect(robustResult.errorHandlingScore).toBeGreaterThan(fragileResult.errorHandlingScore);
    });
  });

  describe('Security Principles', () => {
    it('should detect potential security vulnerabilities', () => {
      const vulnerableCode = `
        function executeUserInput(input: string): void {
          eval(input); // Security vulnerability
        }
      `;
      
      const result = verifier.verifySecurity(vulnerableCode);
      expect(result.hasSecurityVulnerabilities).toBe(true);
    });

    it('should verify proper input validation', () => {
      const secureCode = `
        function processInput(input: string): string {
          if (!input || input.trim() === '') {
            throw new Error('Invalid input');
          }
          return input.trim().toUpperCase();
        }
      `;
      
      const result = verifier.verifySecurity(secureCode);
      expect(result.inputValidationScore).toBeGreaterThan(0.8);
    });
  });

  describe('Maintainability Principles', () => {
    it('should verify modularity', () => {
      const modularCode = `
        class UserService {
          constructor(private db: Database) {}
          
          async getUser(id: string): Promise<User> {
            return await this.db.fetch(id);
          }
        }
      `;
      
      const result = verifier.verifyModularity(modularCode);
      expect(result.modularityScore).toBeGreaterThan(0.5);
    });

    it('should verify appropriate documentation', () => {
      const wellDocumentedCode = `
        /**
         * Calculates the total price of items
         * @param items - Array of item prices
         * @returns The sum of all item prices
         */
        function calculateTotalPrice(items: number[]): number {
          return items.reduce((sum, price) => sum + price, 0);
        }
      `;
      
      const result = verifier.verifyDocumentation(wellDocumentedCode);
      expect(result.documentationScore).toBeGreaterThan(0.8);
    });

    it('should verify testability', () => {
      const testableCode = `
        class Calculator {
          add(a: number, b: number): number {
            return a + b;
          }
        }
      `;
      
      const result = verifier.verifyTestability(testableCode);
      expect(result.testabilityScore).toBeGreaterThan(0.5);
    });
  });

  describe('General Compliance', () => {
    it('should verify overall compliance with agentic principles', () => {
      const compliantCode = `
        /**
         * Calculates the total price of items
         * @param items - Array of item prices
         * @returns The sum of all item prices
         * @throws Error if items array is null
         */
        function calculateTotalPrice(items: number[]): number {
          if (!items) {
            throw new Error('Items array cannot be null');
          }
          return items.reduce((sum, price) => {
            if (typeof price !== 'number') {
              throw new Error('All items must be numbers');
            }
            return sum + price;
          }, 0);
        }
      `;
      
      const result = verifier.verifyCompliance(compliantCode);
      expect(result.isCompliant).toBe(true);
      expect(result.complianceScore).toBeGreaterThan(0.8);
    });
  });
});