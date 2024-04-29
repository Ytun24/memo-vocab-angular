import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVocabComponent } from './add-vocab.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { VocabService } from '../../services/vocab.service';
import { of, throwError } from 'rxjs';
import { Vocab } from '../../interfaces/vocab';
import { Router } from '@angular/router';

describe('AddVocabComponent', () => {
  let component: AddVocabComponent;
  let fixture: ComponentFixture<AddVocabComponent>;
  let vocabService: VocabService;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVocabComponent, HttpClientTestingModule],
      providers: [VocabService, { provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddVocabComponent);
    component = fixture.componentInstance;
    vocabService = TestBed.inject(VocabService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update imageUrl value when select image file', () => {
    const expectedFile = new File([''], 'test-file.pdf');

    let fileInput = fixture.debugElement.query(
      By.css('#file-upload')
    ).nativeElement;
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(expectedFile);
    fileInput.files = dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.vocabForm.get('imageUrl').value).toEqual(expectedFile);
  });

  it('should redirect to home when form is valid and call post vocab successfully', () => {
    const vocabServiceSpy = spyOn(vocabService, 'postVocab').and.returnValue(
      of({} as Vocab)
    );
    const mockVocabValue = {
      title: 'mock title',
      meaning: 'mock meaning',
      imageUrl: '',
    };
    component.vocabForm.patchValue(mockVocabValue);

    const vocabForm = fixture.debugElement.query(By.css('#vocab-form'));
    vocabForm.triggerEventHandler('submit');
    fixture.detectChanges();

    expect(vocabServiceSpy).toHaveBeenCalledOnceWith(mockVocabValue);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display error notification when form is valid and call post vocab fail', () => {
    const vocabServiceSpy = spyOn(vocabService, 'postVocab').and.returnValue(
      throwError(() => new Error('post vocab fail'))
    );
    const mockVocabValue = {
      title: 'mock title',
      meaning: 'mock meaning',
      imageUrl: '',
    };
    component.vocabForm.patchValue(mockVocabValue);

    const vocabForm = fixture.debugElement.query(By.css('#vocab-form'));
    vocabForm.triggerEventHandler('submit');
    fixture.detectChanges();
    const errorNoti = fixture.debugElement.query(By.css('#noti-error'));

    expect(vocabServiceSpy).toHaveBeenCalledOnceWith(mockVocabValue);
    expect(errorNoti).toBeTruthy();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
