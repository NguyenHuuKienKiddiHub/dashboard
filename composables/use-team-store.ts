import type { ApiResponse } from '~/types/api'
import type { TeamMember } from '~/types/models'

/**
 * Global store for team members (sale + cskh).
 *
 * useAsyncData with a static key is the correct Nuxt primitive here:
 *  - Multiple components calling this composable share the SAME Ref (same key).
 *  - Data fetched once (SSR or first client mount) is kept in the Nuxt payload
 *    and NEVER re-fetched — not on hydration, not on route query changes.
 *  - Unlike callOnce, this is resilient: if a fetch fails it won't ghost-retry
 *    on every subsequent component mount.
 */
export function useTeamStore() {
    const { public: { apiBase } } = useRuntimeConfig()

    const { data: salers } = useAsyncData(
        'team:salers',
        () => useApiGetFetch<ApiResponse<TeamMember>>(`${apiBase}/team/members`, { team: 3 })
            .then(r => r.data),
        { default: () => [] as TeamMember[] }
    )

    const { data: cskhList } = useAsyncData(
        'team:cskh',
        () => useApiGetFetch<ApiResponse<TeamMember>>(`${apiBase}/team/members`, { team: 11 })
            .then(r => r.data),
        { default: () => [] as TeamMember[] }
    )

    return { salers, cskhList }
}
