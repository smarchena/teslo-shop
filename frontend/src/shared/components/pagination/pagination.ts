import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
})
export class Pagination {

  pages = input(0)
  currentPage = input<number>(1)

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1)
  })



}
