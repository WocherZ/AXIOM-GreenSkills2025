/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest'
import type { OpenAPIConfig } from './core/OpenAPI'
import { FetchHttpRequest } from './core/FetchHttpRequest'
import { AuthService } from './services/AuthService'
import { DocumentsService } from './services/DocumentsService'
import { FilesService } from './services/FilesService'
import { FoldersService } from './services/FoldersService'
import { HealthService } from './services/HealthService'
import { UsersService } from './services/UsersService'
import { WorkspaceService } from './services/WorkspaceService'

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class ApiClient {
  public readonly auth: AuthService
  public readonly documents: DocumentsService
  public readonly files: FilesService
  public readonly folders: FoldersService
  public readonly health: HealthService
  public readonly users: UsersService
  public readonly workspace: WorkspaceService
  public readonly request: BaseHttpRequest

  constructor (config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    })
    this.auth = new AuthService(this.request)
    this.documents = new DocumentsService(this.request)
    this.files = new FilesService(this.request)
    this.folders = new FoldersService(this.request)
    this.health = new HealthService(this.request)
    this.users = new UsersService(this.request)
    this.workspace = new WorkspaceService(this.request)
  }

  setAuthToken (token?: string) {
    this.request.config.TOKEN = token || undefined
    this.request.config.WITH_CREDENTIALS = true
  }

}

