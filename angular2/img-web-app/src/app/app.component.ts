import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from './models/constants';
import { Media } from './models/media';
import { QueryChangedEventData } from './models/queryChangedEventData';
import { MatDialog } from '@angular/material';
import { ModalMediaComponent } from './modal-media/modal-media.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  medias: Array<Media>;
  
  constructor(private http:Http, public dialog: MatDialog) {
   }

  getMedias(event:QueryChangedEventData) {
    this.http.get(Constants.API_URL + '/medias/query/' + event.query.getStringQuery(true))
    .map(response => response.json())
    .subscribe(res => this.medias = res);
  }

  showDialog(media:Media) {
    const dialogRef = this.dialog.open(ModalMediaComponent, {
      data: media
    });
    dialogRef.keydownEvents().subscribe(res => {
      let index = this.medias.indexOf(dialogRef.componentInstance.data);
      if (index !== -1) {
        if (res.key === "ArrowLeft" && index !== 0) {
          dialogRef.componentInstance.data = this.medias[index - 1];
        } else if(res.key === "ArrowRight" && index != this.medias.length -1) {
          dialogRef.componentInstance.data = this.medias[index + 1];
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    }); 
  }

}
