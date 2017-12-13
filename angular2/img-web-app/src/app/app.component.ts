import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from './models/constants';
import { Media } from './models/media';
import { QueryChangedEventData } from './models/queryChangedEventData';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalMediaComponent } from './modal-media/modal-media.component';
import { constants } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  medias: Array<Media>;

  page: number = 1;
  nbPage: number = 0;
  constructor(private http:Http, public dialog: MatDialog) {
   }

  getMedias(event:QueryChangedEventData) {
    this.nbPage = Math.ceil(event.size / Constants.ITEMS_PER_PAGE) ;
    this.http.get(Constants.API_URL + '/medias/query/' + event.query.getStringQuery(true))
    .map(response => response.json())
    .subscribe(res => this.medias = res);
  }

  showDialog(media:Media) {
    const dialogRef = this.dialog.open(ModalMediaComponent, {
      data: media
    });
    dialogRef.keydownEvents().subscribe(res => 
      this.handleKeyEvents(dialogRef, res)
  );
    dialogRef.afterClosed().subscribe(result => {
    }); 
  }


  private handleKeyEvents(dialogRef: MatDialogRef<ModalMediaComponent>, res:KeyboardEvent) {
    let index = this.medias.indexOf(dialogRef.componentInstance.data);
    if (index !== -1) {
      //Precedent
      if (res.key === "ArrowLeft") {
        //Si on n'est pas sur la première image, on prend la précédente
        if (index !== 0) {
          dialogRef.componentInstance.data = this.medias[index - 1];
        }
        else if (this.page !== 1) {
          this.page--;
          setTimeout(() => {
            dialogRef.componentInstance.data = this.medias[this.medias.length - 1];
          }, 500);
        }
      }
      else if (res.key === "ArrowRight") {
        //Si on n'est pas sur la dernière image, on prend la suivante
        if (index != this.medias.length - 1) {
          dialogRef.componentInstance.data = this.medias[index + 1];
        }
        else if (this.page !== this.nbPage) {
          this.page++;
          setTimeout(() => {
            dialogRef.componentInstance.data = this.medias[0];
          }, 500);
        }
      }
    }
  }
}
