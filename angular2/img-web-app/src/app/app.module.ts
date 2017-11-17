import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app.material.module';
import { FormsModule } from '@angular/forms';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { MediaCardComponent } from './media-card/media-card.component';
import { MediaGridComponent } from './media-grid/media-grid.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PagerComponent } from './pager/pager.component';
import { DebounceDirective } from './debounce/debounce.directive';
import { ModalMediaComponent } from './modal-media/modal-media.component';



@NgModule({
  declarations: [
    AppComponent,
    FilterFormComponent,
    MediaCardComponent,
    MediaGridComponent,
    ToolbarComponent,
    PagerComponent,
    DebounceDirective,
    ModalMediaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppMaterialModule
  ],
  entryComponents: [
    ModalMediaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
