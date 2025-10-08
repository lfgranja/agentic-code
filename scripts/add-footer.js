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

// Define the footer template file
const footerTemplatePath = path.join(projectRoot, 'docs', 'agentic', 'FOOTER_TEMPLATE.md');

// Read the footer template
let footerTemplate;
try {
  footerTemplate = fs.readFileSync(footerTemplatePath, 'utf8');
} catch (err) {
  console.error(`Failed to read footer template at ${footerTemplatePath}: ${err.message}`);
  process.exit(1);
}

// Define documentation directories to process
const docDirs = [
  'docs',
  'docs/agentic',
  'docs/cli',
  'docs/core',
  'docs/developer',
  'docs/examples',
  'docs/examples/basic-usage',
  'docs/examples/tool-development',
  'docs/examples/provider-development',
  'docs/examples/plugin-development',
  'docs/tools',
  'docs/user'
];

// Function to process a single file
function processFile(filePath) {
  // Skip the footer template file itself
  if (filePath === footerTemplatePath) {
    return;
  }

  // Only process .md files
  if (path.extname(filePath) !== '.md') {
    return;
  }

  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the file already has a "Related Documentation" section
    if (content.includes('## Related Documentation')) {
      console.log(`Skipping ${filePath} - already has Related Documentation section`);
      return;
    }

    // Add the footer template to the end of the file
    // Add a newline before the footer if the file doesn't end with one
    if (!content.endsWith('\n')) {
      content += '\n';
    }

    content += '\n' + footerTemplate;

    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

// Function to process all files in a directory recursively
const SKIP_DIR_NAMES = new Set(['node_modules', '.git', '.github', '.vitepress', '.docusaurus', '.next', 'dist', 'build']);

function shouldSkipDir(name) {
  return SKIP_DIR_NAMES.has(name) || name.startsWith('.');
}

function hasRelatedSection(content) {
  return /##\s+related documentation/i.test(content);
}

function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of items) {
      const name = entry.name;
      const itemPath = path.join(dirPath, name);
      if (entry.isDirectory()) {
        if (shouldSkipDir(name)) continue;
        processDirectory(itemPath);
      } else if (entry.isFile()) {
        // Only process .md files
        if (path.extname(name).toLowerCase() !== '.md') continue;
        // Skip very large files (> 2MB) to avoid touching generated assets
        const stats = fs.statSync(itemPath);
        if (stats.size > 2 * 1024 * 1024) continue;

        let content;
        try {
          content = fs.readFileSync(itemPath, 'utf8');
        } catch (e) {
          console.warn(`Skipping unreadable file ${itemPath}: ${e.message}`);
          continue;
        }
        if (hasRelatedSection(content)) {
          console.log(`Skipping ${itemPath} - already has Related Documentation section`);
          continue;
        }
        processFile(itemPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}: ${error.message}`);
  }
}

// Process all documentation directories
console.log('Adding consistent footers to documentation files...');
for (const dir of docDirs) {
  const fullPath = path.join(projectRoot, dir);
  if (fs.existsSync(fullPath)) {
    processDirectory(fullPath);
  } else {
    console.log(`Directory ${fullPath} does not exist, skipping...`);
  }
}

console.log('Footer addition complete!');