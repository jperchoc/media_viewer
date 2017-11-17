import { Component, OnInit, ViewEncapsulation, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Media } from '../models/media';

@Component({
  selector: 'modal-media',
  templateUrl: './modal-media.component.html'
})
export class ModalMediaComponent {

  @Output() keyPressed:EventEmitter<KeyboardEvent> = new EventEmitter();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Media) { }
}
