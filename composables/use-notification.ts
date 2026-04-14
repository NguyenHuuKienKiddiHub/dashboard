/**
 * Shared notification composable.
 * Wraps Nuxt UI's useToast() with convenience methods for consistent
 * notification styling across the app.
 */
export function useNotification() {
    const toast = useToast()

    function success(title: string, description?: string) {
        toast.add({
            title,
            description,
            color: 'success',
            icon: 'i-heroicons-check-circle',
            duration: 3000,
        })
    }

    function error(title: string, description?: string) {
        toast.add({
            title,
            description,
            color: 'error',
            icon: 'i-heroicons-x-circle',
            duration: 4000,
        })
    }

    function info(title: string, description?: string) {
        toast.add({
            title,
            description,
            color: 'info',
            icon: 'i-heroicons-information-circle',
            duration: 3000,
        })
    }

    return { success, error, info }
}
