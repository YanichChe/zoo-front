import { HTTPClient } from "../common/HTTPClient";

export class AbstractService {
    protected readonly baseUrl: string
    protected readonly client: HTTPClient
    constructor(client: HTTPClient) {
        this.baseUrl = 'http://localhost:8080'
        this.client = client
    }
}