# Jarvis Setup - Claude Code with MCP Integrations

Complete setup guide for deploying Claude Code with Calendar and Gmail integrations on macOS.

## 🚀 Quick Start

This repository provides everything needed to set up Claude Code with the same MCP (Model Context Protocol) integrations that enable powerful AI-driven workflow automation.

### What You'll Get
- **Calendar Integration**: Read events, create meetings, manage schedule
- **Gmail Integration**: Send emails, search messages, manage drafts
- **AI Assistant**: Natural language interaction with your digital tools
- **Workflow Automation**: Voice-to-email, calendar analysis, meeting prep

## 📋 Prerequisites

### System Requirements
- **macOS** (Intel or Apple Silicon)
- **Node.js 18+** (we'll install this if needed)
- **Terminal access**

### Accounts Needed
- **Anthropic API Key** (for Claude)
- **Google Account** (for Calendar and Gmail access)

## 🛠 Installation Guide

### Step 1: Install Node.js (if not already installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install via Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node
```

### Step 2: Install Claude Code

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Step 3: Set Up Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

```bash
# Set up your API key (replace with your actual key)
export ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Make it permanent by adding to your shell profile
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### Step 4: Configure MCP Servers

Claude Code uses MCP servers to connect to external services. We'll set up the core integrations:

#### Calendar Integration (iCal)
```bash
# Add calendar MCP server
claude mcp add ical-server mcp-ical
```

#### Gmail Integration
```bash
# Add Gmail MCP server with auto-authentication
claude mcp add gmail "npx @gongrzhe/server-gmail-autoauth-mcp"
```

#### Optional: Additional Useful Servers
```bash
# Memory for persistent knowledge
claude mcp add memory "npx -y @modelcontextprotocol/server-memory"

# Linear for task management (if you use Linear)
claude mcp add Linear "https://mcp.linear.app/sse"
```

### Step 5: Gmail Authentication Setup

The Gmail MCP server requires OAuth authentication:

```bash
# Navigate to a working directory
mkdir ~/jarvis-workspace
cd ~/jarvis-workspace

# Start Claude Code (this will trigger Gmail auth on first use)
claude
```

When you first try to use Gmail functions, you'll be prompted to authenticate:
1. A browser window will open automatically
2. Sign in to your Google account
3. Grant permissions for Calendar and Gmail access
4. Return to terminal - authentication will be saved

## 🎯 First Commands to Try

Once everything is set up, try these commands in Claude Code:

```bash
# Start Claude Code
claude

# Then try these natural language commands:
"Show me my calendar for today"
"Find my latest 5 emails"
"Draft an email to [person] about [topic]"
"What meetings do I have this week?"
"Send me a summary of my day"
```

## 🧪 Testing Your Setup

### Calendar Test
```
# In Claude Code session:
"What's on my calendar today?"
```
You should see your calendar events listed.

### Gmail Test
```
# In Claude Code session:
"Show me my latest emails"
```
You should see recent email subjects and senders.

### Integration Test
```
# In Claude Code session:
"Find emails about meetings in my calendar this week"
```
This tests both integrations working together.

## 🔧 Advanced Configuration

### Custom MCP Server Settings

Your MCP servers are configured in Claude's settings. You can check the configuration:

```bash
# View current MCP configuration
claude mcp list
```

### Environment Variables

Add these to your shell profile for persistence:

```bash
# Edit your shell profile
nano ~/.zshrc

# Add these lines:
export ANTHROPIC_API_KEY="your-key-here"
export CLAUDE_MCP_GMAIL_ENABLED=true
export CLAUDE_MCP_ICAL_ENABLED=true

# Save and reload
source ~/.zshrc
```

## 📱 Usage Examples

### Email Workflows
```bash
# Draft and send emails
"Draft an email to john@example.com about the quarterly review meeting"

# Search and manage
"Find all emails from last week about the project proposal"
"Mark all emails from newsletter@company.com as read"
```

### Calendar Workflows
```bash
# Meeting management
"Schedule a 30-minute meeting with Sarah next Tuesday at 2pm"
"What's my availability this Friday afternoon?"

# Analysis and prep
"Analyze my calendar for next week and suggest time blocks for deep work"
"Create a prep document for my 3pm meeting based on email context"
```

### Combined Workflows
```bash
# Cross-system automation
"Based on my calendar, draft follow-up emails for meetings that happened today"
"Find emails related to my upcoming meetings and summarize key points"
```

## 🚨 Troubleshooting

### Common Issues

**1. "Command not found: claude"**
```bash
# Reinstall Claude Code
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

**2. Gmail authentication fails**
```bash
# Clear OAuth cache and re-authenticate
rm -rf ~/.config/@gongrzhe/server-gmail-autoauth-mcp
# Then restart Claude and try Gmail commands again
```

**3. Calendar not showing events**
```bash
# Check calendar permissions in System Preferences > Security & Privacy > Privacy > Calendars
# Make sure Terminal has calendar access
```

**4. MCP server connection issues**
```bash
# Check MCP server status
claude mcp list

# Remove and re-add problematic servers
claude mcp remove gmail
claude mcp add gmail "npx @gongrzhe/server-gmail-autoauth-mcp"
```

### Getting Help

If you encounter issues:
1. Check the [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
2. Verify your API key is set correctly: `echo $ANTHROPIC_API_KEY`
3. Ensure MCP servers are connected: `claude mcp list`

## 🎬 Next Steps

Once you have this running:

1. **Practice Daily Workflows**: Use Claude Code for actual email and calendar tasks
2. **Create Screen Recordings**: Document your workflows for content creation
3. **Experiment with Combinations**: Try complex multi-step automation
4. **Share Feedback**: Let us know what works well and what needs improvement

## 🤝 Support

If you run into any issues during setup, reach out to the team. We're here to help you get this working smoothly.

---

**⚡ Pro Tip**: Start with simple commands like "show me my calendar" before trying complex workflows. This helps you understand the system's capabilities gradually.