import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../models/constants';
import { Query } from '../models/query';
import { QueryChangedEventData } from '../models/queryChangedEventData';

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
  selectedPage: number = 1;
  @Output() querychanged:EventEmitter<QueryChangedEventData> = new EventEmitter();

  updateQuery() {
    let query = new Query;
    query.showGifs = this.filterGif;
    query.showImages = this.filterPhoto;
    query.showVideos = false;
    query.setTags(this.filterTags.split(','));
    query.limit = Constants.ITEMS_PER_PAGE;
    query.offset = query.limit * (this.selectedPage - 1);
    this.http.get(Constants.API_URL + '/medias/query/' + query.getStringQuery(false) + '/count')
    .map(response => response.json())
    .subscribe(res => {
      this.mediaSize = res[0].nbMedias;
      let eventData: QueryChangedEventData = {
        query:query,
        size: this.mediaSize 
      }
      this.querychanged.emit(eventData);
    });
  }

  constructor(private http:Http) { 
  }

  ngOnInit() {
    this.updateQuery();
  }
}
