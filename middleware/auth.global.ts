export default defineNuxtRouteMiddleware((to) => {
    // // --- 1. Handle tokens arriving via query params (redirect from Laravel Sanctum) ---
    // if (to.query.access_token) {
    //     // Server side: do nothing — let the page render as-is.
    //     // Client will pick up the tokens on hydration and save them.
    //     if (import.meta.server) return

    //     // Client side: write cookies directly to document.cookie (synchronous, no Vue reactivity delay)
    //     const accessToken = to.query.access_token as string
    //     const refreshToken = (to.query.refresh_token as string) ?? ''
    //     const expiresIn = parseInt((to.query.expires_in as string) ?? '3600', 10)

    //     const accessTokenExpires = new Date(Date.now() + expiresIn * 1000).toUTCString()
    //     const refreshTokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()

    //     document.cookie = `access_token=${accessToken}; expires=${accessTokenExpires}; path=/; SameSite=Lax`
    //     document.cookie = `refresh_token=${refreshToken}; expires=${refreshTokenExpires}; path=/; SameSite=Lax`

    //     const cleanQuery = { ...to.query }
    //     delete cleanQuery.access_token
    //     delete cleanQuery.refresh_token
    //     delete cleanQuery.expires_in

    //     return navigateTo(
    //         {
    //             path: to.path,
    //             query: Object.keys(cleanQuery).length > 0 ? cleanQuery : undefined,
    //         },
    //         { replace: true }
    //     )
    // }

    // // --- 2. Check cookies for an existing session (server side only) ---
    // if (import.meta.client) return

    // const { public: { loginUrl } } = useRuntimeConfig()
    // const accessToken = useCookie('access_token')
    // if (!accessToken.value) {
    //     return navigateTo(loginUrl, { external: true })
    // }
})

