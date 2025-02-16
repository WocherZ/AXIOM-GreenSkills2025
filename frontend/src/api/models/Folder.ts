/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Workspace } from './Workspace';
export type Folder = {
    id: string;
    name: string;
    slug: string;
    members: Array<string>;
    workspace: Workspace;
    workspaceId: string;
    memberCount: number;
    isMemeber: boolean;
    archived: boolean;
    createdAt: string;
    updatedAt: string;
};

