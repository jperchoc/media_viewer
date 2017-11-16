import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myData: Array<any>;
  
  constructor(private http:Http) { }

  getMedias(event:any) {
    this.http.get('http://localhost:3000/medias/query/' + event.query)
    .map(response => response.json())
    .subscribe(res => this.myData = res);
  }
}
