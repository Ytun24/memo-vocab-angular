import { Component } from '@angular/core';
import { VocabService } from '../../services/vocab.service';
import { VocabCardComponent } from '../../components/vocab-card/vocab-card.component';
import { Vocab } from '../../interfaces/vocab';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vocab-list',
  standalone: true,
  imports: [CommonModule, VocabCardComponent],
  templateUrl: './vocab-list.component.html',
  styleUrl: './vocab-list.component.scss',
})
export class VocabListComponent {
  vocabList: Vocab[] = [];
  totalPage = 0;
  itemPerPage = 4;
  totalItems = 0;
  currentPage = 1;
  Arr = Array;
  constructor(private vocabService: VocabService) {}

  ngOnInit() {
    this.vocabService.getVocabs(this.currentPage).subscribe({
      next: (data) => {
        console.log(data);
        this.vocabList = data.vocabs;
        this.totalItems = data.totalItems;
        this.totalPage = Math.ceil(data.totalItems / this.itemPerPage);
      },
    });
  }

  onPagination(page: number) {
    if (page > 0 && page <= this.totalPage) {
      this.vocabService.getVocabs(page).subscribe({
        next: (data) => {
          this.currentPage = page;
          this.vocabList = data.vocabs;
          this.totalItems = data.totalItems;
          this.totalPage = Math.ceil(data.totalItems / this.itemPerPage);
        },
      });
    }
  }
}
