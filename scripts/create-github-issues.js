#!/usr/bin/env node

/**
 * Script to create GitHub issues for documentation implementation
 * Usage: node scripts/create-github-issues.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read the issues file
const issuesFile = path.join(__dirname, '../docs/agentic/GITHUB_ISSUES.md');
const issuesContent = fs.readFileSync(issuesFile, 'utf8');

// Parse issues from the content
function parseIssues(content) {
  const issues = [];
  const sections = content.split(/^### Issue \d+:/m);
  
  // Skip the first section (header)
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n');
    
    // Extract title
    const titleMatch = lines[0].match(/^\*\*Title\*\*: (.+)$/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract labels
    const labelsMatch = section.match(/^\*\*Labels\*\*: (.+)$/m);
    const labels = labelsMatch ? labelsMatch[1].split(', ').map(label => label.trim()) : [];
    
    // Extract milestone
    const milestoneMatch = section.match(/^\*\*Milestone\*\*: (.+)$/m);
    const milestone = milestoneMatch ? milestoneMatch[1] : '';
    
    // Extract body
    const bodyMatch = section.match(/^\*\*Body\*\*:\s*\n([\s\S]*?)(?=^\*\*|$)/m);
    const body = bodyMatch ? bodyMatch[1] : '';
    
    // Extract effort estimate
    const effortMatch = section.match(/^\*\*Effort Estimate\*\*\s*\n(.+)$/m);
    const effortEstimate = effortMatch ? effortMatch[1] : '';
    
    if (title) {
      issues.push({
        title,
        labels,
        milestone,
        body: body.trim(),
        effortEstimate
      });
    }
  }
  
  return issues;
}

// Create a GitHub issue
function createIssue(issue) {
  console.log(`Creating issue: ${issue.title}`);
  
  try {
    // Build the gh command
    let command = `gh issue create --title "${issue.title.replace(/"/g, '\\"')}" --body '${issue.body.replace(/'/g, "'\\''")}'`;
    
    // Add labels
    if (issue.labels.length > 0) {
      command += ` --label "${issue.labels.join(',')}"`;
    }
    
    // Add milestone
    if (issue.milestone) {
      command += ` --milestone "${issue.milestone}"`;
    }
    
    // Execute the command
    const result = execSync(command, { encoding: 'utf8' });
    const issueUrl = result.trim();
    
    console.log(`✅ Created issue: ${issueUrl}`);
    return issueUrl;
  } catch (error) {
    console.error(`❌ Failed to create issue: ${issue.title}`);
    console.error(error.message);
    return null;
  }
}

// Main execution
function main() {
  console.log('Parsing issues from documentation...');
  const issues = parseIssues(issuesContent);
  
  console.log(`Found ${issues.length} issues to create.`);
  
  // Create issues
  const createdIssues = [];
  for (const issue of issues) {
    const issueUrl = createIssue(issue);
    if (issueUrl) {
      createdIssues.push({
        title: issue.title,
        url: issueUrl,
        effortEstimate: issue.effortEstimate
      });
    }
    
    // Add a small delay to avoid rate limiting
    sleep(1000);
  }
  
  // Create a summary
  console.log('\n=== Summary ===');
  console.log(`Created ${createdIssues.length} out of ${issues.length} issues.`);
  
  if (createdIssues.length > 0) {
    console.log('\nCreated Issues:');
    createdIssues.forEach(issue => {
      console.log(`- [${issue.title}](${issue.url}) (${issue.effortEstimate})`);
    });
  }
}

// Helper function to sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if gh CLI is installed
function checkGhCli() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ GitHub CLI (gh) is not installed or not in PATH.');
    console.error('Please install GitHub CLI: https://cli.github.com/manual/installation');
    console.error('And authenticate with: gh auth login');
    return false;
  }
}

// Run the script
if (checkGhCli()) {
  main();
} else {
  process.exit(1);
}