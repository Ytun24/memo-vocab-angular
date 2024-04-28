import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabCardComponent } from './vocab-card.component';
import { Router, provideRouter } from '@angular/router';

describe('VocabCardComponent', () => {
  let component: VocabCardComponent;
  let fixture: ComponentFixture<VocabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabCardComponent],
      providers: [provideRouter([]),],
    }).compileComponents();

    fixture = TestBed.createComponent(VocabCardComponent);
    component = fixture.componentInstance;
    component.vocab = {
      _id: '',
      title: '',
      meaning: ''
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
