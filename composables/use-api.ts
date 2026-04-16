import type { UseFetchOptions } from 'nuxt/app'

type Params = Record<string, unknown>

function getAuthHeaders(): Record<string, string> {
    return {
        // Authorization: `Bearer ${useCookie('access_token').value ?? ''}`,
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxNDBhYTY3OTY1NGE4MzRiYWFiNTI3MjBmYmU5OWYxOTBhYWNjOWE4NjViYzE3YjQ0NDFhMjRhZGE2NzE1NTgzMzIxNWE2NTU0YjhjMTZkIn0.eyJhdWQiOiI1IiwianRpIjoiNzE0MGFhNjc5NjU0YTgzNGJhYWI1MjcyMGZiZTk5ZjE5MGFhY2M5YTg2NWJjMTdiNDQ0MWEyNGFkYTY3MTU1ODMzMjE1YTY1NTRiOGMxNmQiLCJpYXQiOjE3NzQyNTU0MzEsIm5iZiI6MTc3NDI1NTQzMSwiZXhwIjoxNzkwMTUzMDMxLCJzdWIiOiI2NzciLCJzY29wZXMiOlsic2Nob29sIiwic2Nob29sLmFkdmFuY2UiLCJyZWNydWl0bWVudCIsInJlY3J1aXRtZW50LmFkdmFuY2UiLCJzb2NpYWxQb3N0aW5nIiwic29jaWFsUG9zdGluZy5hZHZhbmNlIiwic29jaWFsUG9zdGluZy5jb2xhYiIsImJsb2ciLCJibG9nLmFkdmFuY2UiLCJibG9nLmNvbGFiIiwic3RhdGlzdGljIiwic3RhdGlzdGljLnNjaG9vbC52aXNpdCIsInN0YXRpc3RpYy5zY2hvb2wuYWR2aWNlUmVxdWVzdCIsIm1hbmFnZSIsIm1hbmFnZS5jb2xhYiIsImVkdWNhdGlvbi50ZWFjaGVycyIsImVkdWNhdGlvbi50ZWFjaGVycy5jb2xhYiIsIndvcmtzcGFjZSIsInNlbyIsInNlby5jb2xhYiIsInNjaG9vbC5yZWFkIiwic2Nob29sLnNlcnZpY2UiLCJyZWNydWl0bWVudC5yZWFkIiwiYmxvZy5yZWFkIiwibWFuYWdlLmFkdmFuY2UiLCJ3b3Jrc3BhY2UuYWR2YW5jZSIsImtpZGRpaHViIiwic2FsZXN0YWZmIiwic2FsZXN0YWZmLmFkdmFuY2UiLCJzY2hvb2wuZGVsZXRlIiwiYWQtc2Nob29sIiwiYWQtc2Nob29sLWNyZWF0ZSIsImFkLXNjaG9vbC1pZC1lZGl0IiwiYWQtc2Nob29sLWlkLXBob3RvcyIsImFkLXNjaG9vbC1pZC1jb250YWN0IiwiYWQtc2Nob29sLWlkLXR1aXRpb24tYW5kLWZlZSIsImFkLXNjaG9vbC1pZC1zZWN0aW9uIiwiYWQtYmxvZyIsImFkLWJsb2ctYXJ0aWNsZSIsImFkLWJsb2ctYXJ0aWNsZS1jcmVhdGUiLCJhZC1ibG9nLWFydGljbGUtaWQtZWRpdCIsImFkLWJsb2ctYXV0aG9yIiwiYWQtcHJvbW90aW9uIiwiYWQtcHJvbW90aW9uLWNyZWF0ZSIsImFkLXByb21vdGlvbi1pZC1lZGl0IiwiYWQtc2VydmljZS1vZi1zY2hvb2wiLCJhZC1zZXJ2aWNlLW9mLXNjaG9vbC1jcmVhdGUiLCJhZC1zZXJ2aWNlLW9mLXNjaG9vbC1pZC1lZGl0IiwiYWQtY291cnNlIiwiYWQtY291cnNlLWNyZWF0ZSIsImFkLWNvdXJzZS1pZC1lZGl0IiwiYWQtY291cnNlLWlkLXNlY3Rpb24iLCJhZC1zY2hvb2wtYWR2aWNlLXJlcXVlc3QiLCJhZC1yZXZpZXciLCJhZC11c2VyIiwiYWQtdXNlci1jcmVhdGUiLCJhZC11c2VyLWlkLWVkaXQiLCJhZC11c2VyLWlkLXByb2ZpbGUiLCJhZC11c2VyLWlkLWNoYW5nZS1wYXNzd29yZCIsImFkLXVzZXItaWQtc2Nob29sLW1hbmFnZSIsImFkLXVzZXItaWQtcmVzZXQtcGFzc3dvcmQiLCJhZC11c2VyLWlkLXNjb3BlcyIsImFkLXNlby1saW5rLXJlcXVlc3QiLCJhZC1zZW8tbGluay1yZXF1ZXN0LWNyZWF0ZSIsImFkLXNlby1saW5rLXJlcXVlc3QtaWQtZWRpdCIsImFkLXNlby1saW5rLXJlcXVlc3QtaWQtcmV2aWV3IiwiYWQtc2VvLWFydGljbGUiLCJhZC1zZW8tYXJ0aWNsZS1jcmVhdGUiLCJhZC1zZW8tYXJ0aWNsZS1pZC1lZGl0IiwiYWQtc2VvLXNob3J0LWxpbmsiLCJhZC1zZW8tc2hvcnQtbGluay1jcmVhdGUiLCJhZC1zZW8tc2hvcnQtbGluay1pZC1lZGl0IiwiYWQtZ2VvIiwiYWQtZ2VvLXByb3ZpbmNlLWNyZWF0ZSIsImFkLWdlby1wcm92aW5jZS1pZC1lZGl0IiwiYWQtZ2VvLWRpc3RyaWN0LWNyZWF0ZSIsImFkLWdlby1kaXN0cmljdC1pZC1lZGl0IiwiYWQtZ2VvLXBsYWNlLWNyZWF0ZSIsImFkLWdlby1wbGFjZS1pZC1lZGl0IiwiYWQtbWFuYWdlLXNjaG9vbC1jYXRlZ29yeSIsImFkLW1hbmFnZS1zY2hvb2wtY2F0ZWdvcnktY3JlYXRlIiwiYWQtbWFuYWdlLXNjaG9vbC1jYXRlZ29yeS1pZC1lZGl0IiwiYWQtbWFuYWdlLWNvdXJzZS1jYXRlZ29yeSIsImFkLW1hbmFnZS1jb3Vyc2UtY2F0ZWdvcnktY3JlYXRlIiwiYWQtbWFuYWdlLWNvdXJzZS1jYXRlZ29yeS1pZC1lZGl0IiwiYWQtbWFuYWdlLWJsb2ctdG9waWMiLCJhZC1tYW5hZ2UtYmxvZy10b3BpYy1jcmVhdGUiLCJhZC1tYW5hZ2UtYmxvZy10b3BpYy1pZC1lZGl0IiwiYWQtbWFuYWdlLWNyaXRlcmlhIiwiYWQtbWFuYWdlLWNyaXRlcmlhLWNyZWF0ZSIsImFkLW1hbmFnZS1jcml0ZXJpYS1lZGl0IiwiYWQtbWFuYWdlLXJldmlldy1jcml0ZXJpYSIsImFkLW1hbmFnZS1yZXZpZXctY3JpdGVyaWEtY3JlYXRlIiwiYWQtbWFuYWdlLXJldmlldy1jcml0ZXJpYS1pZC1lZGl0IiwiYWQtbWFuYWdlLXNjb3BlIiwiYWQtbWFuYWdlLXNjb3BlLWNyZWF0ZSIsImFkLW1hbmFnZS1zY29wZS1pZC1lZGl0IiwiYWQtbWFuYWdlLXBhZ2UtZ3JvdXAiLCJhZC1tYW5hZ2UtcGFnZS1ncm91cC1jcmVhdGUiLCJhZC1tYW5hZ2UtcGFnZS1ncm91cC1pZC1lZGl0IiwiYWQtbWFuYWdlLWpvYi1wb3NpdGlvbiIsImFkLW1hbmFnZS1qb2ItcG9zaXRpb24tY3JlYXRlIiwiYWQtbWFuYWdlLWpvYi1wb3NpdGlvbi1pZC1lZGl0IiwiYWQtdXRpbC1qc29uLXRvLWV4Y2VsIiwiYWQtdXRpbC1mYWtlLXJldmlld3MiLCJhZC1uZXdzIiwiYWQtbmV3cy1jcmVhdGUiLCJhZC1uZXdzLWlkLWVkaXQiLCJhZC1zY2hvb2wtY2FyZS1yZXF1ZXN0IiwiYWQtc2Nob29sLWlkLXNlbyIsImFkLXNjaG9vbC1pZC1tYW5hZ2UiLCJhZC1zY2hvb2wtaWQtcGxhY2UiLCJhZC1zY2hvb2wtaWQtYmFubmVycyIsImFkLXNjaG9vbC1pZC1lZHUiLCJhZC1zZW8tc2l0ZW1hcCJdfQ.HOwXl735sU3OJi1jncjTOadFwtIYmsBzoHb48kA3tb571kT3DxrSrT8p_6MZesWnVbrNpH6JeuV817F4t_MuYYXRsYY-CeTSLrVyrRiTgMG_jRQQhWeFsVtRjHmrAw6lmd5L5mzqhUx30Vc-Lyrnul0LyBjhBBmUI_cCT2F6LoLSRpC2mu7StvOmHCGvKLqafWvPB777342RtshcezkFuDkCUsuX5g7HlkE8Tl_jdJKuVQG1JsySnFXc02FHhd99Ye1nmW5yuDmp2QJhQMYMM1lRm7CQJabtuYt496c9CDFu4IeA3g2aGIELYrjGvrpnxLRHMSph55rkeb5axMEHTGCmsJ0Z0_rIzkOyZVRw_XJhMBDKiQCk77D__9HjI24SnmkC_wWlsG24L23XtDOW2R-uceLJ4fmNYW1vwbDsVFNfkkfiKPGbemefrSVPynpBv8XA94oo96doDPmM_EXp3DBbU0ktjNkAtrthEKJtNCE_ydhDJecRpZq4ersY5BZmv9FQhV_f2XHT2HGcwnd8gliQK0zrVcgXPv38bRR5TpVAd4oo3y2hOT5SvLnj07tmzI6vO66RgISgbV2RrQnd50HoYVf3Ti1fcxPfq4l-fuc4Fk8T8mza0QcEc0ZRUJ8na46Ue5mQAD6hheXiz_8wUocMGmv6OMTWvvsSvkcftNU`,
        Origin: 'http://dashboard.kiddihub.test',
    }
}

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
 * Auth headers are injected automatically.
 * Pass Ref values inside `params` to auto-refetch when they change.
 */
export function useApiGet<T>(
    endpoint: string,
    params?: Params,
    options?: Omit<UseFetchOptions<T>, 'method' | 'query' | 'headers'>
) {
    return useFetch<T>(endpoint, {
        method: 'get',
        headers: getAuthHeaders(),
        query: params ? serializeParams(params) : undefined,
        ...options,
        onResponseError({ response }) {
            console.error('[API Error GET]', response.status, response._data)
        },
    })
}

/**
 * Imperative GET request (for use inside useAsyncData callbacks or event handlers).
 * Auth headers are injected automatically.
 */
export function useApiGetFetch<T>(endpoint: string, params?: Params) {
    return $fetch<T>(endpoint, {
        method: 'GET',
        headers: getAuthHeaders(),
        query: params,
        onResponseError({ response }) {
            console.error('[API Error GET]', response.status, response._data)
        },
    })
}

/**
 * Imperative POST request.
 * Auth headers are injected automatically.
 */
export function useApiPost<T>(endpoint: string, body?: Params) {
    return $fetch<T>(endpoint, {
        method: 'POST',
        headers: getAuthHeaders(),
        body,
        onResponseError({ response }) {
            console.error('[API Error POST]', response.status, response._data)
        },
    })
}

/**
 * Imperative PUT request.
 * Auth headers are injected automatically.
 */
export function useApiPut<T>(endpoint: string, body?: Params) {
    return $fetch<T>(endpoint, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body,
        onResponseError({ response }) {
            console.error('[API Error PUT]', response.status, response._data)
        },
    })
}
