/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class HealthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Api is ready
     * @returns any
     * @throws ApiError
     */
    public appControllerIsReady(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/readiness',
        });
    }
}
