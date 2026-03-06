import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { SplitsApiClient } from '@/client'

export function registerInfoTools(server: McpServer, client: SplitsApiClient) {
  server.tool(
    'get_org_info',
    'Returns basic information about the org: id, name, logo URL, and creation date.',
    {},
    async () => {
      const data = await client.getOrgInfo()

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
