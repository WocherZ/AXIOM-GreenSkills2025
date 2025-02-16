/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthChangePasswordDto } from '../models/AuthChangePasswordDto';
import type { AuthForgotPasswordDto } from '../models/AuthForgotPasswordDto';
import type { AuthLoginDto } from '../models/AuthLoginDto';
import type { AuthRefreshTokenDto } from '../models/AuthRefreshTokenDto';
import type { AuthRegisterDto } from '../models/AuthRegisterDto';
import type { AuthResetPasswordDto } from '../models/AuthResetPasswordDto';
import type { AuthResponseDto } from '../models/AuthResponseDto';
import type { UpdateProfileDto } from '../models/UpdateProfileDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns AuthResponseDto
     * @throws ApiError
     */
    public authControllerLogin(
        requestBody: AuthLoginDto,
    ): CancelablePromise<AuthResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Неверный логин или пароль`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AuthRegisterDto
     * @throws ApiError
     */
    public authControllerRegister(
        requestBody: AuthRegisterDto,
    ): CancelablePromise<AuthRegisterDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/sign-up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Неверный логин или пароль`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns AuthResponseDto
     * @throws ApiError
     */
    public authControllerRefreshToken(
        requestBody: AuthRefreshTokenDto,
    ): CancelablePromise<AuthResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Неверный логин или пароль`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public authControllerForgotPassword(
        requestBody: AuthForgotPasswordDto,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public authControllerResetPassword(
        requestBody: AuthResetPasswordDto,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Изменение пароля пользователя
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public authControllerChangePassword(
        requestBody: AuthChangePasswordDto,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Неверный пароль`,
                404: `Пользователь не найден`,
            },
        });
    }
    /**
     * Получить свой профиль
     * @returns User
     * @throws ApiError
     */
    public authControllerGetProfile(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/auth/me',
            errors: {
                404: `Пользователь не найден`,
            },
        });
    }
    /**
     * Обновить свой профиль
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public authControllerUpdateProfile(
        requestBody: UpdateProfileDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/auth/me',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Пользователь не найден`,
            },
        });
    }
    /**
     * Выйти из аккаунта
     * @returns void
     * @throws ApiError
     */
    public authControllerLogout(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
}
