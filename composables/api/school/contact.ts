import type { Contact } from '~/types/models'

interface ContactApiResponse {
    code: number
    message: string
    data: Contact
}

type ContactPayload = Partial<Pick<Contact,
    'hotlines' | 'phones' | 'emails' | 'zalo' | 'facebook' | 'website'
>>

export function useSchoolContactApi() {
    const { public: { apiBase } } = useRuntimeConfig()

    function get(schoolId: number | string) {
        return useApiGet<ContactApiResponse>(
            `${apiBase}/school/${schoolId}/contacts`,
            undefined,
            { lazy: true }
        )
    }

    function save(schoolId: number | string, payload: ContactPayload) {
        return useApiPost<ContactApiResponse>(
            `${apiBase}/school/${schoolId}/contacts`,
            payload as Record<string, unknown>
        )
    }

    return { get, save }
}
