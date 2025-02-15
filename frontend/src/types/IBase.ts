export interface ILookupField {
  id: number;
  title: string;
}

export interface iDictionaryField extends ILookupField {
  slug: string;
}
