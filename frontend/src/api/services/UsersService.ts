/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Добавить пользователя
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public usersControllerCreate(
        requestBody: CreateUserDto,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/admin/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Получить всех пользователей
     * @param page
     * @param limit
     * @param customer
     * @returns any
     * @throws ApiError
     */
    public usersControllerFindAll(
        page: number = 1,
        limit: number = 10,
        customer?: boolean,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/users',
            query: {
                'page': page,
                'limit': limit,
                'customer': customer,
            },
        });
    }
    /**
     * Получить все роли
     * @returns any
     * @throws ApiError
     */
    public usersControllerFindAllRoles(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/users/roles',
        });
    }
    /**
     * Обновить роль пользователя
     * @param roleId
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public usersControllerUpdateUserRole(
        roleId: string,
        userId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/admin/users/{roleId}/{userId}/roles',
            path: {
                'roleId': roleId,
                'userId': userId,
            },
        });
    }
    /**
     * Получить пользователя
     * @param id
     * @returns User
     * @throws ApiError
     */
    public usersControllerFindOne(
        id: string,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/admin/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Пользователь не найден`,
            },
        });
    }
    /**
     * Обновить пользователя
     * @param id
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public usersControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/admin/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Пользователь не найден`,
            },
        });
    }
    /**
     * Удалить пользователя
     * @param id
     * @returns void
     * @throws ApiError
     */
    public usersControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/admin/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Пользователь не найден`,
            },
        });
    }
}
