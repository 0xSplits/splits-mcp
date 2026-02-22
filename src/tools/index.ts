import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { SplitsApiClient } from '@/client'
import { registerBalancesTools } from '@/tools/balances'
import { registerTransactionsTools } from '@/tools/transactions'

export function registerAllTools(server: McpServer, client: SplitsApiClient) {
  registerBalancesTools(server, client)
  registerTransactionsTools(server, client)
}
