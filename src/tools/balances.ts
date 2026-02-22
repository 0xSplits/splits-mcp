import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { SplitsApiClient } from '@/client'

export function registerBalancesTools(server: McpServer, client: SplitsApiClient) {
  server.tool(
    'get_org_balances',
    'Returns token balances across all chains for the org, grouped by smart account address. Includes total portfolio value.',
    {
      show_spam_tokens: z
        .boolean()
        .optional()
        .describe('Include spam/zero-balance tokens in the response'),
    },
    async ({ show_spam_tokens }) => {
      const data = await client.getBalances({
        showSpamTokens: show_spam_tokens,
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
