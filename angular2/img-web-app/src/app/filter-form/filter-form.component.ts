import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FilterFormComponent implements OnInit {

  filterPhoto: boolean = true;
  filterGif: boolean = true;
  filterTags: string = '';
  mediaSize: number = 0;
  selectedPage: number = 0;

  @Output() querychanged:EventEmitter<any> = new EventEmitter();

  updateQuery() {
    let query: string;
    query = 'type=';
    if (this.filterPhoto) query += (query[query.length -1] !== '=') ? ',photo' : 'photo';
    if (this.filterGif) query += (query[query.length -1] !== '=') ? ',gif' : 'gif';
    if (this.filterTags.length !== 0) {
      query += '&tags='
      let tags = this.filterTags.split(',')
      for (let i = 0; i < tags.length; i++) {
        query += (i !== tags.length - 1) ? tags[i].trim() + ',' : tags[i].trim();
      }
    }
    //http://localhost:3000/medias/query/type=photo,gif/count
    this.http.get('http://localhost:3000/medias/query/' + query + '/count')
    .map(response => response.json())
    .subscribe(res => {
      this.mediaSize = res[0].nbMedias;
      let eventData = {query:query, size: this.mediaSize }
      this.querychanged.emit(eventData);
    });
  }

  constructor(private http:Http) { }

  ngOnInit() {
    this.updateQuery();
  }

}
