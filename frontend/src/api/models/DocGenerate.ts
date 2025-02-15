/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SettingsProps } from './SettingsProps';
import type { User } from './User';
export type DocGenerate = {
    id: string;
    status: DocGenerate.status;
    prompt: string;
    content: string;
    settings: SettingsProps;
    userId: string;
    createdBy: User;
    createdAt: string;
    updatedAt: string;
};
export namespace DocGenerate {
    export enum status {
        DRAFT = 'draft',
        GENERATE = 'generate',
    }
}

