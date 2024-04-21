import { Component } from '@angular/core';
import { VocabService } from '../../services/vocab.service';

@Component({
  selector: 'app-vocab-list',
  standalone: true,
  imports: [],
  templateUrl: './vocab-list.component.html',
  styleUrl: './vocab-list.component.scss',
})
export class VocabListComponent {
  constructor(private vocabService: VocabService) {}

  ngOnInit() {
    this.vocabService.getVocabs().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
