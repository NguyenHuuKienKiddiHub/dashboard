import type { UseFetchOptions } from 'nuxt/app'

type Params = Record<string, unknown>

/**
 * Serialize array values to comma-separated strings.
 * Non-array values (including Refs) pass through unchanged so Nuxt
 * can still set up reactivity watchers on them.
 */
function serializeParams(params: Params): Params {
    return Object.fromEntries(
        Object.entries(params).map(([key, val]) => [
            key,
            Array.isArray(val) ? (val as unknown[]).join(',') : val,
        ])
    )
}

/**
 * Reactive GET request backed by useFetch.
 * Pass Ref values inside `params` to auto-refetch when they change.
 *
 * @example
 * const { data, pending } = useApiGet<MyType>('/api/schools', {
 *   fields: ['id', 'name'],
 *   page: currentPage,   // Ref<number> — watched automatically
 * })
 */
export function useApiGet<T>(
    endpoint: string,
    params?: Params,
    options?: Omit<UseFetchOptions<T>, 'method' | 'query'>
) {
    return useFetch<T>(endpoint, {
        method: 'get',
        query: params ? serializeParams(params) : undefined,
        ...options,
        onResponseError({ response }) {
            console.error('[API Error GET]', response.status, response._data)
        },
    })
}

/**
 * Imperative POST request.
 * Returns a Promise — call it inside an async handler.
 */
export function useApiPost<T>(endpoint: string, body?: Params) {
    return $fetch<T>(endpoint, {
        method: 'POST',
        body,
        onResponseError({ response }) {
            console.error('[API Error POST]', response.status, response._data)
        },
    })
}

/**
 * Imperative PUT request.
 * Returns a Promise — call it inside an async handler.
 */
export function useApiPut<T>(endpoint: string, body?: Params) {
    return $fetch<T>(endpoint, {
        method: 'PUT',
        body,
        onResponseError({ response }) {
            console.error('[API Error PUT]', response.status, response._data)
        },
    })
}