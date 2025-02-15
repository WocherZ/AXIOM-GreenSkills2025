export enum PathTypes {
  PHOTOS = 'products/photos',
  FILES = 'products/files',
  PROMPT = 'prompt/files',
}

export type PathTypesString = keyof typeof PathTypes;
