export interface IPhoto {
  id: number;
  fileName: string;
  contentUrl: string;
  contentType: string;
}

export interface IUser {
  id: number;
  name: string;
  photo: IPhoto;
}
