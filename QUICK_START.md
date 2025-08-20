# Quick Start Guide

Get up and running with Jarvis in 15 minutes.

## 🚀 Super Quick Setup

```bash
# 1. Clone and setup
git clone https://github.com/danialhasan/jarvis.git
cd jarvis
node setup.js

# 2. Create knowledge base
mkdir ~/jarvis-knowledge
cp knowledge-templates/* ~/jarvis-knowledge/

# 3. Start Claude Code
claude
```

## 🎯 First Commands to Try

### Test Basic Integration
```
"Show me my calendar for today"
"What emails do I have from the last 2 days?"
```

### Set Up Your Context
```
"Read my context.md file and help me update it with my current projects"
"Add a new contact to my contacts.md file"
```

### Try Workflow Automation
```
"Draft an email to [someone] about [topic]"
"Find time in my calendar for a 1-hour meeting this week"
```

## 📋 Daily Usage Pattern

### Morning Routine (2 minutes)
```
claude
"Read my context.md and give me a summary of my day based on calendar and emails"
"What meetings need prep and what emails need responses?"
```

### Throughout the Day
```
# Quick email tasks
"Draft a follow-up to yesterday's meeting with [person]"
"Schedule a call with [prospect] based on their availability email"

# Meeting prep
"Find emails related to my 3pm meeting and create talking points"
"Based on my calendar, block time for deep work tomorrow"
```

### End of Day (2 minutes)
```
"Update my context.md with today's outcomes and tomorrow's priorities"
"Log important meetings and interactions in my meetings.md file"
```

## 🎬 Creating Content

### For Social Media
- Record your morning routine (calendar + email review)
- Show complex email automation in action
- Demonstrate meeting prep workflow

### For Business Demos
- Focus on time savings ("10 minutes → 30 seconds")
- Show professional email drafting
- Highlight calendar optimization

## 🆘 If Something Goes Wrong

1. **Check**: `claude mcp list` - Are all servers connected?
2. **Try**: Simple command first - "Show me my calendar"
3. **Restart**: Exit Claude and run `claude` again
4. **Check docs**: Each MCP server has troubleshooting guides
5. **Reset**: Follow complete reset guide in TROUBLESHOOTING.md

## 📈 Upgrade Path

1. **Week 1**: Use markdown files, basic email/calendar
2. **Week 2**: Advanced workflows, screen recordings
3. **Week 3**: Consider Supabase if managing 20+ business contacts
4. **Month 1**: Full CRM with relationship tracking and analytics

**Start simple, scale when needed!**