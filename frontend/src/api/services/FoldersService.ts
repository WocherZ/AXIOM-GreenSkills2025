/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFolderDto } from '../models/CreateFolderDto';
import type { Folder } from '../models/Folder';
import type { UpdateFolderDto } from '../models/UpdateFolderDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FoldersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Создать папку
     * @param requestBody
     * @returns Folder
     * @throws ApiError
     */
    public folderControllerCreate(
        requestBody: CreateFolderDto,
    ): CancelablePromise<Folder> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/folders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Название папки должно быть уникальным`,
            },
        });
    }
    /**
     * Получить список своих папок
     * @returns Folder
     * @throws ApiError
     */
    public folderControllerFindAll(): CancelablePromise<Array<Folder>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/folders',
        });
    }
    /**
     * Получить папку по id
     * @param id
     * @returns Folder
     * @throws ApiError
     */
    public folderControllerFindOne(
        id: string,
    ): CancelablePromise<Folder> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/folders/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Обновить папку по id
     * @param id
     * @param requestBody
     * @returns Folder
     * @throws ApiError
     */
    public folderControllerUpdate(
        id: string,
        requestBody: UpdateFolderDto,
    ): CancelablePromise<Folder> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/folders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Название папки должно быть уникальным`,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public folderControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/folders/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Добавить пользователя своего workspace в папку
     * @param id
     * @param memberId
     * @returns any
     * @throws ApiError
     */
    public folderControllerAddMemberToFolder(
        id: string,
        memberId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/folders/{id}/add-member/{memberId}',
            path: {
                'id': id,
                'memberId': memberId,
            },
        });
    }
    /**
     * Удалить пользователя своего workspace из папку
     * @param id
     * @param memberId
     * @returns any
     * @throws ApiError
     */
    public folderControllerRemoveMemberFromFolder(
        id: string,
        memberId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/folders/{id}/remove-member/{memberId}',
            path: {
                'id': id,
                'memberId': memberId,
            },
        });
    }
}
