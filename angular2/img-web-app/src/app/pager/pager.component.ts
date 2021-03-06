import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  SimpleChanges,
  EventEmitter,
  Output
} from "@angular/core";
import { Constants } from "../models/constants";
class Pager {
  totalPages: number;
  pages: Array<number>;
}

@Component({
  selector: "pager",
  templateUrl: "./pager.component.html",
  styleUrls: ["./pager.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PagerComponent implements OnInit {
  @Input() size: number;
  @Input() selected: number;
  @Output() selectedChange = new EventEmitter<number>();
  pager: Pager;
  constructor() {}

  ngOnInit() {
    console.log("init pager", this.size, this.selected);
    this.pager = this.getPager(this.size, this.selected);
  }

  ngOnChanges(changes: SimpleChanges) {
    let size = changes.size ? changes.size.currentValue : this.size;
    let selected = changes.selected
      ? changes.selected.currentValue
      : this.selected;
    this.pager = this.getPager(size, selected);
  }

  range(start, stop?, step?) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.selected = page;
    this.pager = this.getPager(this.size, page);
    this.selectedChange.emit(this.selected);
  }
  getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = Constants.ITEMS_PER_PAGE
  ): Pager {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // create an array of pages to ng-repeat in the pager control
    let pages = this.range(startPage, endPage + 1);
    return {
      pages: pages,
      totalPages: totalPages
    };
  }
}
