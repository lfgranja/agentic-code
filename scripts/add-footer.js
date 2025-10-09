#!/usr/bin/env node

/**
 * Script to add consistent footers to all documentation files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the project root
const projectRoot = path.resolve(__dirname, '..');

// Define documentation root
const docsRoot = path.join(projectRoot, 'docs');

// Check if force flag is provided
const force = process.argv.includes('--force');

// Function to compute relative path from a file to another file
function computeRelativePath(fromFile, toFile) {
  // Get the directory of the source file
  const fromDir = path.dirname(fromFile);
  
  // Compute the relative path from the source directory to the target file
  const relativePath = path.relative(fromDir, toFile);
  
  // Ensure the path starts with ./ or ../ for proper linking
  if (!relativePath.startsWith('.')) {
    return './' + relativePath;
  }
  return relativePath;
}

// Function to generate footer content for a specific file
function generateFooterContent(filePath) {
  // Compute paths for each documentation file
  const userGuidePath = path.join(docsRoot, 'user', 'user-guide.md');
  const installationGuidePath = path.join(docsRoot, 'user', 'installation.md');
  const troubleshootingGuidePath = path.join(docsRoot, 'user', 'troubleshooting.md');
  const developerGuidePath = path.join(docsRoot, 'developer', 'development-guide.md');
  const apiReferencePath = path.join(docsRoot, 'developer', 'api-reference.md');
  const pluginDevelopmentGuidePath = path.join(docsRoot, 'developer', 'plugin-development.md');
  const contributingGuidePath = path.join(docsRoot, 'developer', 'contributing.md');
  const coreConceptsPath = path.join(docsRoot, 'agentic', 'README.md');
  const constitutionPath = path.join(docsRoot, 'agentic', 'constitution.md');
  const workflowPath = path.join(docsRoot, 'agentic', 'workflow.md');
  const architecturePath = path.join(docsRoot, 'agentic', 'architecture.md');
  const visionPath = path.join(docsRoot, 'agentic', 'vision.md');
  const licensePath = path.join(projectRoot, 'LICENSE');

  // Compute relative paths from the current file to each target
  const userGuideRelPath = computeRelativePath(filePath, userGuidePath);
  const installationGuideRelPath = computeRelativePath(filePath, installationGuidePath);
  const troubleshootingGuideRelPath = computeRelativePath(filePath, troubleshootingGuidePath);
  const developerGuideRelPath = computeRelativePath(filePath, developerGuidePath);
  const apiReferenceRelPath = computeRelativePath(filePath, apiReferencePath);
  const pluginDevelopmentGuideRelPath = computeRelativePath(filePath, pluginDevelopmentGuidePath);
  const contributingGuideRelPath = computeRelativePath(filePath, contributingGuidePath);
  const coreConceptsRelPath = computeRelativePath(filePath, coreConceptsPath);
  const constitutionRelPath = computeRelativePath(filePath, constitutionPath);
  const workflowRelPath = computeRelativePath(filePath, workflowPath);
  const architectureRelPath = computeRelativePath(filePath, architecturePath);
  const visionRelPath = computeRelativePath(filePath, visionPath);
  const troubleshootingRelPath = computeRelativePath(filePath, troubleshootingGuidePath);
  const licenseRelPath = computeRelativePath(filePath, licensePath);

  return `## Related Documentation

- [User Guide](${userGuideRelPath}) - Comprehensive guide to using Agentic Code for various tasks
- [Installation Guide](${installationGuideRelPath}) - Step-by-step instructions for installing Agentic Code
- [Troubleshooting Guide](${troubleshootingGuideRelPath}) - Solutions to common issues and problems
- [Developer Guide](${developerGuideRelPath}) - Comprehensive guide for contributing to Agentic Code
- [API Reference](${apiReferenceRelPath}) - Detailed API documentation
- [Plugin Development Guide](${pluginDevelopmentGuideRelPath}) - Guide for creating and maintaining plugins
- [Contributing Guide](${contributingGuideRelPath}) - Guidelines for contributing to the project
- [Core Concepts](${coreConceptsRelPath}) - Fundamental principles and architecture
- [Constitution](${constitutionRelPath}) - Core principles and values that guide Agentic Code behavior
- [Workflow](${workflowRelPath}) - How Agentic Code processes tasks and executes work
- [Architecture](${architectureRelPath}) - Detailed architecture documentation
- [Vision](${visionRelPath}) - Long-term vision and goals for Agentic Code

## Need Help?

If you encounter issues, check the [Troubleshooting Guide](${troubleshootingRelPath}) or [create an issue](https://github.com/lfgranja/agentic-code/issues) on GitHub.

## License

[LICENSE](${licenseRelPath}) - Apache License 2.0`;
}

// Function to process a single file
function processFile(filePath) {
  // Only process .md files
  if (path.extname(filePath) !== '.md') {
    return;
  }

  // Skip very large files (> 2MB) to avoid touching generated assets
  const stats = fs.statSync(filePath);
  if (stats.size > 2 * 1024 * 1024) {
    console.log(`Skipping ${filePath} - file is too large (${stats.size} bytes)`);
    return;
  }

  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the file already has a "Related Documentation" section
    const hasFooter = /##\s+Related Documentation/i.test(content);
    
    // If not forcing and already has footer, skip
    if (!force && hasFooter) {
      console.log(`Skipping ${filePath} - already has Related Documentation section`);
      return;
    }
    
    // If forcing, remove ALL existing footer sections first
    if (force && hasFooter) {
      // Remove everything from the first "## Related Documentation" onwards
      const relatedDocIndex = content.search(/##\s+Related Documentation/i);
      if (relatedDocIndex !== -1) {
        content = content.substring(0, relatedDocIndex);
        
        // Ensure we end with a newline
        content = content.trimEnd() + '\n';
      }
    }

    // Generate footer content specific to this file's location
    const footerContent = generateFooterContent(filePath);

    // Add the footer template to the end of the file
    // Add a newline before the footer if the file doesn't end with one
    if (!content.endsWith('\n')) {
      content += '\n';
    }

    content += '\n' + footerContent;

    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

// Set of directories to skip
const SKIP_DIR_NAMES = new Set([
  'node_modules', 
  '.git', 
  '.github', 
  '.vitepress', 
  '.docusaurus', 
  '.next', 
  'dist', 
  'build'
]);

// Function to check if a directory should be skipped
function shouldSkipDir(name) {
  return SKIP_DIR_NAMES.has(name) || name.startsWith('.');
}

// Function to process all files in a directory recursively
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const itemName = item.name;
      const itemPath = path.join(dirPath, itemName);
      
      // Skip special directories
      if (item.isDirectory() && shouldSkipDir(itemName)) {
        continue;
      }
      
      if (item.isDirectory()) {
        // Recursively process subdirectories
        processDirectory(itemPath);
      } else if (item.isFile()) {
        // Process files
        processFile(itemPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}: ${error.message}`);
  }
}

// Process the documentation directory
console.log(`Adding consistent footers to documentation files... ${force ? '(forced update)' : ''}`);
processDirectory(docsRoot);
console.log('Footer addition complete!');