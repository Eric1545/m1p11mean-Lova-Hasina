import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input()
  currentPage!: number;
  @Input()
  totalPages!: number;

  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  nextPage() {
    if (this.currentPage !== undefined && this.totalPages !== undefined) {
      if ( this.currentPage < this.totalPages) {
        this.pageChange.emit(this.currentPage + 1);
      }
    }
  }

  prevPage() {
    if (this.currentPage !== undefined) {
      if (this.currentPage > 1) {
        this.pageChange.emit(this.currentPage - 1);
      }
    }
  }
  goToPage(page: number) {
    this.pageChange.emit(page);
  }
  getPages(): number[] {
    const maxPagesToShow = 4; // Nombre maximal de pages à afficher
    const pages: number[] = [];
    
    if (this.totalPages <= maxPagesToShow) {
      // Si le nombre total de pages est inférieur ou égal au nombre maximal de pages à afficher,
      // afficher toutes les pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si le nombre total de pages dépasse le nombre maximal de pages à afficher,
      // calculer les pages à afficher autour de la page actuelle
      const startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
  
      // Ajouter les pages à afficher avec des points de suspension si nécessaire
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (startPage > 1) {
        pages.unshift(-1); // Ajouter des points de suspension au début
      }
      if (endPage < this.totalPages) {
        pages.push(-1); // Ajouter des points de suspension à la fin
      }
    }
  
    return pages;
  }
  
  
}
