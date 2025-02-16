/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';
import type { FileUploadDto } from '../models/FileUploadDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FilesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Загрузить файл
     * @param path
     * @param formData Загрузить один файл
     * @returns File
     * @throws ApiError
     */
    public filesControllerCreate(
        path: string,
        formData: FileUploadDto,
    ): CancelablePromise<File> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/files',
            query: {
                'path': path,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Получить все файлы
     * @param page
     * @param limit
     * @returns any
     * @throws ApiError
     */
    public filesControllerFindAll(
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/files',
            query: {
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Получить один файл
     * @param id
     * @returns any
     * @throws ApiError
     */
    public filesControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Файл не найден`,
            },
        });
    }
    /**
     * Удалить файл
     * @param id
     * @returns void
     * @throws ApiError
     */
    public filesControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/files/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Файл не найден`,
            },
        });
    }
}
