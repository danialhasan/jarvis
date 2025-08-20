# Troubleshooting Guide

## Common Setup Issues

### 1. Claude Code Installation

**Issue**: `command not found: claude`

**Solution**:
```bash
# Check if npm is working
npm --version

# Reinstall Claude Code
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code

# Check if it's in your PATH
which claude
```

### 2. API Key Issues

**Issue**: Authentication errors or "API key not found"

**Solutions**:
```bash
# Check if key is set
echo $ANTHROPIC_API_KEY

# Set it temporarily
export ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Make it permanent
echo 'export ANTHROPIC_API_KEY="sk-ant-your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Gmail Authentication

**Issue**: Gmail integration not working

**Solutions**:
```bash
# Clear OAuth cache
rm -rf ~/.config/@gongrzhe/server-gmail-autoauth-mcp

# Restart Claude and try Gmail command
claude
# Then: "Show me my latest emails"
```

**Issue**: Browser doesn't open for authentication

**Solution**:
- Make sure you have a default browser set
- Try the authentication command directly:
```bash
npx @gongrzhe/server-gmail-autoauth-mcp auth
```

### 4. Calendar Integration

**Issue**: Calendar events not showing

**Solutions**:
```bash
# Check macOS permissions
# Go to: System Preferences > Security & Privacy > Privacy > Calendars
# Ensure Terminal has access

# Try manual calendar access test
claude
# Then: "List my calendars"
```

### 5. MCP Server Connection Issues

**Issue**: MCP servers not connecting

**Solutions**:
```bash
# Check server status
claude mcp list

# Remove and re-add problematic servers
claude mcp remove gmail
claude mcp add gmail "npx @gongrzhe/server-gmail-autoauth-mcp"

# Check for port conflicts
lsof -i :3000
```

### 6. Permission Issues on macOS

**Required Permissions**:
- **Calendars**: System Preferences > Security & Privacy > Privacy > Calendars
- **Full Disk Access**: May be needed for Terminal
- **Network**: For MCP server connections

## Advanced Debugging

### Check MCP Server Logs
```bash
# Enable verbose logging
export CLAUDE_MCP_DEBUG=true
claude

# Check system logs
tail -f /var/log/system.log | grep claude
```

### Network Connectivity
```bash
# Test internet connection
ping google.com

# Test API endpoint
curl -H "Authorization: Bearer $ANTHROPIC_API_KEY" https://api.anthropic.com/v1/messages
```

### Reset Everything
If nothing works, complete reset:
```bash
# Remove all Claude Code data
rm -rf ~/.claude
rm -rf ~/.config/@gongrzhe/server-gmail-autoauth-mcp

# Reinstall
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code

# Re-run setup
node setup.js
```

## Getting Additional Help

1. **Claude Code Docs**: https://docs.anthropic.com/en/docs/claude-code
2. **MCP Documentation**: https://docs.anthropic.com/en/docs/claude-code/mcp
3. **GitHub Issues**: https://github.com/anthropics/claude-code/issues

## Success Indicators

You'll know everything is working when:
- `claude mcp list` shows all servers as "Connected"
- Calendar commands return your actual events
- Gmail commands return your actual emails
- No authentication prompts during normal usage