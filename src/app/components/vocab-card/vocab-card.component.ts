import { Component, Input } from '@angular/core';
import { Vocab } from '../../interfaces/vocab';
import { environment } from '../../../../environment/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vocab-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vocab-card.component.html',
  styleUrl: './vocab-card.component.scss',
})
export class VocabCardComponent {
  @Input() vocab!: Vocab;
  imageUrl = '';

  ngOnInit() {
    this.imageUrl = this.vocab?.imageUrl ? `${environment.beUrl}/${this.vocab.imageUrl}` : 'assets/images/baymax.jpeg';
  }
}
