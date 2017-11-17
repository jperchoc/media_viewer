import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Media } from '../models/media';

@Component({
  selector: 'media-grid',
  templateUrl: './media-grid.component.html',
  styleUrls: ['./media-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaGridComponent implements OnInit {

  @Input() medias: Array<Media> = [];
  @Input() cols: number = 0;

  @Output() mediaCardClicked:EventEmitter<Media> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  propagateEvent(media:Media) {
    this.mediaCardClicked.emit(media);
  }

}
