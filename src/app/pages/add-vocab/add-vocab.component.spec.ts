import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocabComponent } from './add-vocab.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddVocabComponent', () => {
  let component: AddVocabComponent;
  let fixture: ComponentFixture<AddVocabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVocabComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
