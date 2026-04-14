export interface ApiResponse<T = unknown> {
    code: number
    message: string
    data: T[]
}

export interface PaginatedApiResponse<T = unknown> {
    code: number
    message: string
    data: {
        current_page: number
        data: T[]
        from: number
        to: number
        last_page: number
        last_page_url: string
        first_page_url: string
        next_page_url: string | null
        prev_page_url: string | null
        path: string
        per_page: number
        total: number
    }
}