# ssh-mcp

> Stateful server operations runtime for AI agents.

**ssh-mcp** is an MCP server that gives AI agents persistent SSH sessions, interactive PTY terminals, SFTP file operations, Kubernetes management, and system monitoring.

## Features

| Feature | Description |
|---------|-------------|
| **Session** | Persistent SSH connections with auto-reconnect |
| **Shell** | Interactive PTY with real-time output streaming |
| **SFTP** | Full file operations: read, write, list, delete, mkdir, chmod |
| **K8s** | Pod management, exec, logs, cp, Arthas diagnostics |
| **Monitoring** | System info, processes, disk usage, log tail & search |

## Quick Start

```json
{
  "mcpServers": {
    "ssh-mcp": {
      "command": "node",
      "args": ["path/to/ssh-mcp/build/index.js"]
    }
  }
}
```

## Links

- [GitHub](https://github.com/civilization-os/ssh-mcp)
- [README](https://github.com/civilization-os/ssh-mcp#readme)
