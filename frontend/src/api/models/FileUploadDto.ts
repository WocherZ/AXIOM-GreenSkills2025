/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FileUploadDto = {
    files: Blob;
    path: FileUploadDto.path;
};
export namespace FileUploadDto {
    export enum path {
        PRODUCTS_PHOTOS = 'products/photos',
        PRODUCTS_FILES = 'products/files',
    }
}

