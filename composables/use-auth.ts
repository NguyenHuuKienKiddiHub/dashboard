export function useAuth() {
    const { public: { loginUrl } } = useRuntimeConfig()

    const accessToken = useCookie<string | null>('access_token')
    const refreshToken = useCookie<string | null>('refresh_token')

    const isAuthenticated = computed(() => !!accessToken.value)

    const authHeaders = computed(() => ({
        Authorization: `Bearer ${accessToken.value ?? ''}`,
    }))

    function logout() {
        accessToken.value = null
        refreshToken.value = null
        return navigateTo(loginUrl, { external: true })
    }

    return { accessToken, refreshToken, isAuthenticated, authHeaders, logout }
}
