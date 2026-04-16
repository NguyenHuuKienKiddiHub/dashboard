// Environment configuration
// useRuntimeConfig() is a Nuxt composable — available on both client and server.
// Values come from nuxt.config.ts > runtimeConfig.public, overridden by .env

export function useEnv() {
    const config = useRuntimeConfig()
    return {
        apiBase: config.public.apiBase as string,
        loginUrl: config.public.loginUrl as string,
    }
}
