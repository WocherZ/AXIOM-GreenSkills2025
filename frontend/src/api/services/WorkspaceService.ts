/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateWorkspaceDto } from '../models/UpdateWorkspaceDto';
import type { Workspace } from '../models/Workspace';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class WorkspaceService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Принять инвайт по ссылке приглашению
     * @param id
     * @param code
     * @returns any
     * @throws ApiError
     */
    public workspaceControllerAcceptInvite(
        id: string,
        code: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/workspaces/{id}/join/{code}',
            path: {
                'id': id,
                'code': code,
            },
        });
    }
    /**
     * @param id
     * @param memberId
     * @returns any
     * @throws ApiError
     */
    public workspaceControllerExcludeMember(
        id: string,
        memberId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/workspaces/{id}/exclude/{memberId}',
            path: {
                'id': id,
                'memberId': memberId,
            },
        });
    }
    /**
     * Получить по id
     * @param id
     * @returns Workspace
     * @throws ApiError
     */
    public workspaceControllerFindOne(
        id: string,
    ): CancelablePromise<Workspace> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/workspaces/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Ресурс не найден`,
            },
        });
    }
    /**
     * Обновить ресурс по id
     * @param id
     * @param requestBody
     * @returns Workspace
     * @throws ApiError
     */
    public workspaceControllerUpdate(
        id: string,
        requestBody: UpdateWorkspaceDto,
    ): CancelablePromise<Workspace> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/workspaces/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Ресурс не найден`,
            },
        });
    }
}
