import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { default as axios } from 'axios'
import { Dictionary } from "./Dictionary"

export class HTTPClient {
    private static instance: HTTPClient

    private readonly timeout: number

    private readonly headers: Dictionary<string>

    constructor(timeout: number = 30_000, headers: Dictionary<string> = { 'Content-Type': 'application/json' }) {
        this.timeout = timeout
        this.headers = headers
    }

    public static getInstance(): HTTPClient {
        if (!HTTPClient.instance) {
            const timeout = 30_000
            const headers = { 'Content-Type': 'application/json' }

            HTTPClient.instance = new HTTPClient(timeout, headers)
        }

        return HTTPClient.instance
    }

    public async post<T = any>(
        url: string,
        data: Dictionary<any> | string,
        authHeader?: Dictionary<any>,
        timeout_?: number,
        parameters: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        const config = {
            headers: this.getHeadersWithAuth(this.headers, authHeader),
            timeout: timeout_ ?? this.timeout,
            ...parameters,
        }
        try {
            const result = await axios.post(url, data, config)

            return result
        } catch (error) {
            throw error
        }
    }

    public async put<T = any>(
        url: string,
        data: Dictionary<any>,
        authHeader?: Dictionary<string>,
        parameters: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<T>> {
        const config = {
            headers: this.getHeadersWithAuth(this.headers, authHeader),
            timeout: this.timeout,
            ...parameters,
        }

        try {
            const result = await axios.put(url, data, config)
            return result
        } catch (error) {
            alert('Не удалось выполнить запрос!')
            throw error
        }
    }

    public async delete<T = any>(url: string, authHeader?: Dictionary<string>, parameters: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
        const config = {
            headers: this.getHeadersWithAuth(this.headers, authHeader),
            timeout: this.timeout,
            ...parameters,
        }
        try {
            const result = await axios.delete(url, config)
            return result
        } catch (error) {
            alert('Не удалось выполнить запрос!')
            throw error
        }
    }

    public async get<T = any>(url: string,  parameters?: any): Promise<AxiosResponse<T>> {
        const config = {
            params: parameters,
            timeout: this.timeout,
        }

        try {
            const result = await axios.get(url, config)
            return result
        } catch (error) {
            throw error
        }
    }

    private getHeadersWithAuth(headers: Dictionary<string>, authHeader: Dictionary<string> | undefined): Dictionary<string> {
        if (!authHeader) {
            return headers
        }

        return { ...headers, ...authHeader }
    }
}
