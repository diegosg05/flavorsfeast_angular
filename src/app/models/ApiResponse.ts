export interface ApiResponse<T> {
    data: T
    error: Error
}

export interface Error {
    status: number
    message: string
}