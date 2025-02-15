/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from './File';
export type Workspace = {
    id: string;
    name: string;
    slug: string;
    inviteCode: string;
    workspaceMembers: Array<string>;
    workspaceMemberPermission: string;
    accessLinkPermission: string;
    logo: File;
    disabled: boolean;
    disabledReason: boolean;
    disabledComment: boolean;
    createdAt: string;
    updatedAt: string;
};

