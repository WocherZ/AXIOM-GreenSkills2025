/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocGenerateDto } from '../models/DocGenerateDto';
import type { UpdateDocDto } from '../models/UpdateDocDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DocumentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public docsControllerGenerate(
        requestBody: DocGenerateDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/docs/generate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Получить все документы
     * @param page
     * @param limit
     * @returns any
     * @throws ApiError
     */
    public docsControllerFindAll(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/docs',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public docsControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/docs/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public docsControllerUpdate(
        id: string,
        requestBody: UpdateDocDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/docs/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public docsControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/docs/{id}',
            path: {
                'id': id,
            },
        });
    }
}
