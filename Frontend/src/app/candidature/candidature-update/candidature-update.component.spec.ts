import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatureUpdateComponent } from './candidature-update.component';

describe('CandidatureUpdateComponent', () => {
  let component: CandidatureUpdateComponent;
  let fixture: ComponentFixture<CandidatureUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatureUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
