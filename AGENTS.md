# AGENTS.md — splits-mcp

## What Is This?

An MCP (Model Context Protocol) server that lets AI assistants interact with Splits org data via org API keys. Currently read-only: balances and transactions.

## Architecture

```
src/
├── index.ts          # Entry point — creates MCP server, connects stdio transport
├── client.ts         # SplitsApiClient — HTTP client wrapping the Splits org API
└── tools/
    ├── index.ts      # Tool registry — registerAllTools aggregator
    ├── balances.ts   # get_org_balances tool
    └── transactions.ts  # get_transactions tool
```

**Stack:** TypeScript, MCP SDK (`@modelcontextprotocol/sdk`), Zod for parameter validation.
**Build:** tsup (bundler), tsx (dev runner).
**Runtime:** Node.js 22+, stdio transport.

## How It Works

1. `index.ts` reads `SPLITS_API_KEY` and `SPLITS_BASE_URL` from env
2. Creates a `SplitsApiClient` (simple fetch wrapper with Bearer auth)
3. Registers MCP tools via `registerAllTools`
4. Connects over stdio — the AI assistant talks to this process via stdin/stdout

## Adding a New Tool

1. Create `src/tools/<name>.ts` with a `register<Name>Tools(server, client)` function
2. Define the tool using `server.tool(name, description, zodSchema, handler)`
3. Add any needed API methods to `SplitsApiClient` in `client.ts`
4. Import and call your register function in `src/tools/index.ts`

Pattern to follow — every existing tool file is a clean example.

## API Client

`SplitsApiClient` is a thin wrapper around `fetch`. All endpoints hit `/api/external/org/*` with Bearer token auth. To add a new endpoint:

```ts
async getNewThing(params: { ... }) {
  return this.request('/api/external/org/new-thing', queryParams)
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `get_org_balances` | Token balances across all chains, grouped by smart account |
| `get_transactions` | Combined transactions + asset transfers with pagination/filtering |

## Dev Commands

```bash
pnpm install        # Install deps
pnpm dev            # Run in dev mode
pnpm build          # Production build
pnpm typecheck      # Type check
pnpm lint           # Lint
pnpm lint:fix       # Lint + fix
pnpm prettier:fix   # Format
```

## Environment

- `SPLITS_API_KEY` — Required. Org-level API key from Splits.
- `SPLITS_BASE_URL` — Optional. Defaults to `http://localhost:8080`.

## Conventions

- Tools use snake_case names and parameters (MCP convention)
- Client methods use camelCase (TypeScript convention)
- Each tool file exports a single `register*Tools` function
- Tool handlers return `{ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }`
- Path aliases: `@/` maps to `src/`
