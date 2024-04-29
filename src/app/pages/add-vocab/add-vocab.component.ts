import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VocabService } from '../../services/vocab.service';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'app-add-vocab',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NotificationComponent],
  templateUrl: './add-vocab.component.html',
  styleUrl: './add-vocab.component.scss',
})
export class AddVocabComponent {
  vocabForm: any;
  displayNoti = false;

  constructor(
    private formBuilder: FormBuilder,
    private vocabService: VocabService,
    private router: Router
  ) {}

  ngOnInit() {
    this.vocabForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      meaning: ['', [Validators.required]],
      imageUrl: [null],
    });
  }

  onImageSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files ?? [];
    if (files.length > 0) {
      const file = files[0];
      console.log(file);
      this.vocabForm.patchValue({ imageUrl: file });
    }
  }

  onSubmit() {
    if (this.vocabForm.valid) {
      this.vocabService.postVocab(this.vocabForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.displayNoti = true;
        }
      });
    }
  }

  get title() {
    return this.vocabForm.get('title')
  }

  get meaning() {
    return this.vocabForm.get('meaning')
  }
}
