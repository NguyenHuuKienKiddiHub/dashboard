import type { SuggestItem } from '~/types/models'

interface SuggestApiResponse {
    code: number
    message: string
    data: SuggestItem[]
}

interface SuggestQuery {
    fields?: string
    compare?: Record<string, string>
}

export function useSuggestApi() {
    const { public: { apiBase, apiToken } } = useRuntimeConfig()

    const headers = {
        Authorization: `Bearer ${apiToken}`,
        Origin: 'http://dashboard.kiddihub.test',
    }

    async function get(node: string, queries: SuggestQuery): Promise<SuggestItem[]> {
        const params: Record<string, string> = {}

        if (queries.fields) {
            params.fields = queries.fields
        }
        if (queries.compare) {
            params.compare = JSON.stringify(queries.compare)
        }

        const response = await $fetch<SuggestApiResponse>(`${apiBase}/sg/${node}`, {
            method: 'GET',
            query: params,
            headers,
        })

        return response.data ?? []
    }

    return { get }
}
