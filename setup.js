#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🚀 Jarvis Setup - Claude Code with MCP Integrations');
console.log('===============================================\n');

// Check Node.js version
function checkNodeVersion() {
    const version = process.version;
    const majorVersion = parseInt(version.slice(1).split('.')[0]);
    
    if (majorVersion < 18) {
        console.error('❌ Node.js 18+ required. Current version:', version);
        console.log('Please install Node.js 18+ from https://nodejs.org or use:');
        console.log('brew install node');
        process.exit(1);
    }
    
    console.log('✅ Node.js version check passed:', version);
}

// Check if Claude Code is installed
function checkClaudeInstallation() {
    try {
        const version = execSync('claude --version', { encoding: 'utf8', stdio: 'pipe' });
        console.log('✅ Claude Code already installed:', version.trim());
        return true;
    } catch (error) {
        console.log('📦 Claude Code not found, installing...');
        return false;
    }
}

// Install Claude Code
function installClaude() {
    try {
        console.log('Installing Claude Code globally...');
        execSync('npm install -g @anthropic-ai/claude-code', { stdio: 'inherit' });
        console.log('✅ Claude Code installed successfully');
    } catch (error) {
        console.error('❌ Failed to install Claude Code:', error.message);
        process.exit(1);
    }
}

// Check for API key
function checkApiKey() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.log('⚠️  ANTHROPIC_API_KEY not found in environment');
        console.log('📝 Please set your API key:');
        console.log('   export ANTHROPIC_API_KEY="sk-ant-your-key-here"');
        console.log('   echo \'export ANTHROPIC_API_KEY="sk-ant-your-key-here"\' >> ~/.zshrc');
        console.log('   source ~/.zshrc');
        return false;
    }
    
    console.log('✅ API key found in environment');
    return true;
}

// Setup MCP servers
function setupMcpServers() {
    console.log('\n🔌 Setting up MCP servers...');
    
    const servers = [
        {
            name: 'ical-server',
            command: 'claude mcp add ical-server mcp-ical',
            description: 'Calendar integration'
        },
        {
            name: 'gmail',
            command: 'claude mcp add gmail "npx @gongrzhe/server-gmail-autoauth-mcp"',
            description: 'Gmail integration with auto-auth'
        },
        {
            name: 'memory',
            command: 'claude mcp add memory "npx -y @modelcontextprotocol/server-memory"',
            description: 'Persistent memory for AI context'
        }
    ];
    
    servers.forEach(server => {
        try {
            console.log(`Adding ${server.description}...`);
            execSync(server.command, { stdio: 'pipe' });
            console.log(`✅ ${server.name} configured`);
        } catch (error) {
            console.log(`⚠️  ${server.name} setup may need manual configuration`);
        }
    });
}

// Create sample workflow file
function createSampleWorkflows() {
    const workflowsDir = path.join(process.cwd(), 'workflows');
    if (!fs.existsSync(workflowsDir)) {
        fs.mkdirSync(workflowsDir);
    }
    
    const sampleWorkflows = `# Sample Claude Code Workflows

## Email Workflows

### Send a quick email
\`\`\`
Draft an email to [person] about [topic]
\`\`\`

### Email analysis
\`\`\`
Find all emails from last week about [project]
Summarize my unread emails from [person]
\`\`\`

## Calendar Workflows

### Schedule management
\`\`\`
What's on my calendar today?
Schedule a 30-minute meeting with [person] next [day] at [time]
\`\`\`

### Calendar analysis
\`\`\`
Analyze my calendar for next week and suggest time blocks for deep work
Find my availability this Friday afternoon
\`\`\`

## Combined Workflows

### Meeting preparation
\`\`\`
Based on my 3pm meeting, find related emails and create a prep document
\`\`\`

### Follow-up automation
\`\`\`
Draft follow-up emails for all meetings that happened today
\`\`\`

## Advanced Automation

### Voice to email (like the demo)
\`\`\`
Send an email to [person] about [topic] - [your spoken message]
\`\`\`

### Daily digest
\`\`\`
Give me a summary of my day: calendar events and important emails
\`\`\`
`;

    fs.writeFileSync(path.join(workflowsDir, 'sample-commands.md'), sampleWorkflows);
    console.log('✅ Sample workflows created in ./workflows/');
}

// Main setup function
function main() {
    checkNodeVersion();
    
    const claudeInstalled = checkClaudeInstallation();
    if (!claudeInstalled) {
        installClaude();
    }
    
    const apiKeySet = checkApiKey();
    if (!apiKeySet) {
        console.log('\n⏳ Setup paused - please set your API key and run again');
        return;
    }
    
    setupMcpServers();
    createSampleWorkflows();
    
    console.log('\n🎉 Setup complete!');
    console.log('\n🚀 Next steps:');
    console.log('1. Open a new terminal (CMD + T');
    console.log('2. Run: claude');
    console.log('3. Try: "Show me my calendar for today"');
    console.log('4. For Gmail: First use will trigger authentication flow');
    console.log('\n📚 Check ./workflows/sample-commands.md for example commands');
}

main();