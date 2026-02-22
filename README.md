# Splits MCP Server

MCP server for Splits that lets AI assistants (Claude Desktop, Claude Code, etc.) read org-level data using existing org API keys.

## Prerequisites

- Node.js 22+
- A Splits org API key

## Installation

```bash
pnpm install
```

## Configuration for Claude Code

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "splits": {
      "command": "npx",
      "args": ["tsx", "/path/to/splits-mcp/src/index.ts"],
      "env": {
        "SPLITS_API_KEY": "your-api-key",
        "SPLITS_BASE_URL": "http://localhost:8080"
      }
    }
  }
}
```

## Configuration for Claude Desktop

Add to your `claude_desktop_config.json` (typically at `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "splits": {
      "command": "npx",
      "args": ["tsx", "/path/to/splits-mcp/src/index.ts"],
      "env": {
        "SPLITS_API_KEY": "your-api-key",
        "SPLITS_BASE_URL": "http://localhost:8080"
      }
    }
  }
}
```

## Available Tools

| Tool               | Description                                          | Parameters                                                                                                      |
| ------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `get_org_balances` | Returns token balances across all chains for the org | `show_spam_tokens?: boolean`                                                                                    |
| `get_transactions` | Returns combined transactions and asset transfers    | `limit: number`, `smart_account_id?: string`, `hide_dust?: boolean`, `chain_ids?: string`, `next_page?: string` |

## Development

```bash
# Run in development mode
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start
```
