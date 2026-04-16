import type { ApiResponse } from '~/types/api'
import type { TeamMember } from '~/types/models'

export function useTeamApi() {
    const { public: { apiBase } } = useRuntimeConfig()

    /**
     * List members of a team.
     * @param teamId  11 = Chăm sóc khách hàng (CSKH), 3 = Sale
     */
    function members(teamId: number) {
        return useApiGet<ApiResponse<TeamMember>>(
            `${apiBase}/team/members`,
            { team: teamId },
            { lazy: true }
        )
    }

    return { members }
}
