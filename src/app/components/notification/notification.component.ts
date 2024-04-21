import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @Input() display = true;
  @Input() message = { title: '', paragraph: '' };
  @Input() status: 'success' | 'error' | 'info' = 'success';

  close() {
    this.display = false;
  }
}
