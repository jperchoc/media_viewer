import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Media } from '../models/media';

@Component({
  selector: 'media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MediaCardComponent implements OnInit {

  constructor() { }
  @Input() media : Media;

  ngOnInit() {
  }

}
