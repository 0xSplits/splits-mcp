import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { SplitsApiClient } from '@/client'
import { registerAllTools } from '@/tools'

const apiKey = process.env.SPLITS_API_KEY
if (!apiKey) {
  console.error('SPLITS_API_KEY environment variable is required')
  process.exit(1)
}

const baseUrl = process.env.SPLITS_BASE_URL ?? 'http://localhost:8080'

const client = new SplitsApiClient(baseUrl, apiKey)

const server = new McpServer({
  name: 'splits',
  version: '0.1.0',
})

registerAllTools(server, client)

const transport = new StdioServerTransport()
await server.connect(transport)
