export interface ICard {
  id: string;
  previewUrl: string;
  createdTime: string;
  updatedTime: string;
  __typename: 'Card';
}

export interface IUser {
  profileImageUrl: string;
  displayName: string;
  id: string;
  email: string;
  __typename: 'User';
}

export interface IDocCollaborator {
  docId: string;
  user: IUser;
  permission: string;
  __typename: 'DocCollaborator';
}

export interface IDocUser {
  id: string;
  docId: string;
  lastViewed: string;
  lastEdited: string;
  favorited: null | boolean; // можно было бы указать тип, но в этом случае Null или Boolean
  __typename: 'DocUser';
}

export interface IOrganization {
  id: string;
  name: string;
  __typename: 'Organization';
}

export interface IDocEditor {
  docId: string;
  user: IUser;
  lastEdited: string;
  __typename: 'DocEditor';
}

export interface IAccessLink {
  id: string;
  docId: string;
  permission: string;
  token: string;
  url: string;
  __typename: 'AccessLink';
}
export interface IDoc {
  id: string;
  title: string;
  archived: boolean;
  createdTime: string;
  updatedTime: string;
  editedTime: string;
  currentSnapshotId: string;
  titleCard: ICard;
  createdBy: IUser;
  collaborators: IDocCollaborator[];
  docUser: IDocUser;
  channels: any[]; // если точно не знаете тип, можно указать 'any'
  organization: IOrganization;
  orgAccess: null | { id: string }; // может быть null или другой объект
  editors: IDocEditor[];
  accessLinks: IAccessLink[];
  site: null | { id: string, domains: Record<any, any>[] }; // может быть null или другой объект
  __typename: 'Doc';
}

export interface IDocEdge {
  node: IDoc;
  __typename: 'DocEdge';
}
