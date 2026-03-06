import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { SplitsApiClient } from '@/client'

export function registerContactsTools(server: McpServer, client: SplitsApiClient) {
  server.tool(
    'search_contacts',
    'Search org contacts and labeled accounts by name or address. Returns matching contacts with their addresses.',
    {
      query: z.string().describe('Search query — name, ENS, or address fragment'),
    },
    async ({ query }) => {
      const data = await client.searchContacts(query)

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
