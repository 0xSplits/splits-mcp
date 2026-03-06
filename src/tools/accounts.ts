import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { SplitsApiClient } from '@/client'

export function registerAccountsTools(server: McpServer, client: SplitsApiClient) {
  server.tool(
    'get_org_accounts',
    'Returns smart accounts for the org. Each account has an id, name, address, role (TREASURY/OPERATING), and type.',
    {
      show_archived: z
        .boolean()
        .optional()
        .describe('Include archived accounts in the response'),
    },
    async ({ show_archived }) => {
      const data = await client.getAccounts({
        showArchived: show_archived,
      })

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      }
    },
  )
}
