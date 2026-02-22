export class SplitsApiClient {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  private async request<T>(path: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(path, this.baseUrl)
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') {
          url.searchParams.set(key, value)
        }
      }
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Splits API error ${response.status}: ${text}`)
    }

    return response.json() as Promise<T>
  }

  async getBalances(params?: { showSpamTokens?: boolean }) {
    const queryParams: Record<string, string> = {}
    if (params?.showSpamTokens) {
      queryParams.showSpamTokens = 'true'
    }
    return this.request('/api/external/org/balances', queryParams)
  }

  async getTransactions(params: {
    limit: number
    smartAccountId?: string
    hideDust?: boolean
    chainIds?: string
    nextPage?: string
  }) {
    const queryParams: Record<string, string> = {
      limit: params.limit.toString(),
    }
    if (params.smartAccountId) queryParams.smartAccountId = params.smartAccountId
    if (params.hideDust) queryParams.hideDust = 'true'
    if (params.chainIds) queryParams.chainIds = params.chainIds
    if (params.nextPage) queryParams.nextPage = params.nextPage

    return this.request('/api/external/org/transactions', queryParams)
  }
}
