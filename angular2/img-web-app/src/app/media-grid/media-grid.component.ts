import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'media-grid',
  templateUrl: './media-grid.component.html',
  styleUrls: ['./media-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaGridComponent implements OnInit {

  @Input() medias: Array<any> = [];
  @Input() cols: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
