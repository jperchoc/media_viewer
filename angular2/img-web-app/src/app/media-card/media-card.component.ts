import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaCardComponent implements OnInit {

  constructor() { }
  @Input() media : any;

  ngOnInit() {
  }

}
