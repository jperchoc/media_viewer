import { Constants } from "./constants";

export class Query {
  private tags: Array<string> = [];
  showImages: boolean;
  showGifs: boolean;
  showVideos:boolean;
  offset: number;
  limit: number = Constants.ITEMS_PER_PAGE;

  setTags(tags: Array<string>) {
    for (let i=0; i < tags.length; i++) {
      let tag = tags[i].trim();
      if (this.tags.indexOf(tag) === -1) {
        this.tags.push(tag);
      }
    }
  }

  getStringQuery(appendOffset:boolean = true):string {
    let queryStr = 'type=';
    if (this.showImages) queryStr += (queryStr[queryStr.length -1] !== '=') ? ',photo' : 'photo';
    if (this.showGifs) queryStr += (queryStr[queryStr.length -1] !== '=') ? ',gif' : 'gif';
    if (this.tags.length !== 0) {
      queryStr += '&tags='
      for (let i = 0; i < this.tags.length; i++) {
        queryStr += (i !== this.tags.length - 1) ? this.tags[i].trim() + ',' : this.tags[i].trim();
      }
    }
    if (appendOffset) queryStr += '?offset=' + this.offset+'&limit=' + this.limit;
    return queryStr;
  }
}
