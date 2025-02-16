/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from './File';
import type { Role } from './Role';
export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: File;
    password: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
};

