import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { SplitsApiClient } from '@/client'
import { registerAccountsTools } from '@/tools/accounts'
import { registerBalancesTools } from '@/tools/balances'
import { registerContactsTools } from '@/tools/contacts'
import { registerInfoTools } from '@/tools/info'
import { registerTransactionsTools } from '@/tools/transactions'

export function registerAllTools(server: McpServer, client: SplitsApiClient) {
  registerInfoTools(server, client)
  registerAccountsTools(server, client)
  registerBalancesTools(server, client)
  registerContactsTools(server, client)
  registerTransactionsTools(server, client)
}
