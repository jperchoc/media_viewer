import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from './models/constants';
import { Media } from './models/media';
import { QueryChangedEventData } from './models/queryChangedEventData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  medias: Array<Media>;
  
  constructor(private http:Http) { }

  getMedias(event:QueryChangedEventData) {
    this.http.get(Constants.API_URL + '/medias/query/' + event.query.getStringQuery(true))
    .map(response => response.json())
    .subscribe(res => this.medias = res);
  }
}
