import type { PaginatedApiResponse } from '~/types/api'
import type { School } from '~/types/models'

type Params = Record<string, unknown>

export function useSchoolApi() {
    const { public: { apiBase } } = useRuntimeConfig()

    function list(params?: Params) {
        return useApiGet<PaginatedApiResponse<School>>(
            `${apiBase}/school/list`,
            {
                fields: 'id,name,address,verify,status,member,type,origin,slug_name,short_name,picture,gsp,new_link',
                with: 'contact,customerSupport,saler',
                ...params,
            },
            { lazy: true }
        )
    }

    function updateCustomerSupport(schoolId: number, customerSupportId: number | null) {
        return useApiPost(`${apiBase}/school/${schoolId}/customer-support`, {
            customer_support_id: customerSupportId,
        })
    }

    function updateStatuses(schoolId: number, payload: { verify?: boolean; status?: boolean }) {
        return useApiPut(`${apiBase}/school/${schoolId}/statuses`, payload)
    }

    return { list, updateCustomerSupport, updateStatuses }
}
