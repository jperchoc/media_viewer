import { MediaType } from "./mediaType";

export class Media {
  id: number;
  path: string;
  type: MediaType;
  libelle: string;
  ratings: number;
  tags: Array<string>;
}
