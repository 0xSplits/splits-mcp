import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { SplitsApiClient } from '@/client'

export function registerTransactionsTools(server: McpServer, client: SplitsApiClient) {
  server.tool(
    'get_transactions',
    'Returns combined transactions and asset transfers for the org. Supports pagination, filtering by smart account, chain, and dust threshold.',
    {
      limit: z.number().int().positive().describe('Maximum number of transactions to return'),
      smart_account_id: z
        .string()
        .optional()
        .describe('Filter transactions to a specific smart account'),
      hide_dust: z.boolean().optional().describe('Hide transfers worth less than $1'),
      chain_ids: z
        .string()
        .optional()
        .describe('Comma-separated chain IDs to filter by (e.g. "1,137,42161")'),
      next_page: z.string().optional().describe('Pagination cursor from a previous response'),
    },
    async ({ limit, smart_account_id, hide_dust, chain_ids, next_page }) => {
      const data = await client.getTransactions({
        limit,
        smartAccountId: smart_account_id,
        hideDust: hide_dust,
        chainIds: chain_ids,
        nextPage: next_page,
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
