/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocGenerate } from './DocGenerate';
import type { File } from './File';
import type { Folder } from './Folder';
import type { User } from './User';
import type { Workspace } from './Workspace';
export type Document = {
    id: string;
    title: string;
    preview: File;
    archived: boolean;
    isFavorited: boolean;
    workspace: Workspace;
    workspaceId: string;
    docGenerateInput: DocGenerate;
    folder: Folder;
    folderId: string;
    userId: string;
    createdBy: User;
    createdAt: string;
    updatedAt: string;
};

