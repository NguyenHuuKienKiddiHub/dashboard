import type { PaginatedApiResponse } from '~/types/api'
import type { School } from '~/types/models'

type Params = Record<string, unknown>

export function useSchoolApi() {
    const { public: { apiBase, apiToken } } = useRuntimeConfig()

    const headers = {
        Authorization: `Bearer ${apiToken}`,
        Origin: 'http://dashboard.kiddihub.test',
    }

    /**
     * Paginated school list.
     * Pass Ref values inside `params` for auto-refetch (e.g. { page: currentPage }).
     */
    function list(params?: Params) {
        return useApiGet<PaginatedApiResponse<School>>(
            `${apiBase}/school/list`,
            {
                fields: 'id,name,address,verify,status,member,type,origin,slug_name,short_name,picture,gsp,new_link',
                with: 'contact,customerSupport,saler',
                ...params,
            },
            { lazy: true, headers }
        )
    }

    function updateCustomerSupport(schoolId: number, customerSupportId: number | null) {
        return $fetch(`${apiBase}/school/${schoolId}/customer-support`, {
            method: 'POST',
            body: { customer_support_id: customerSupportId },
            headers,
        })
    }

    function updateStatuses(schoolId: number, payload: { verify?: boolean; status?: boolean }) {
        return $fetch(`${apiBase}/school/${schoolId}/statuses`, {
            method: 'PUT',
            body: payload,
            headers,
        })
    }

    return { list, updateCustomerSupport, updateStatuses }
}
