import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCandidatComponent } from './show-candidat.component';

describe('ShowCandidatComponent', () => {
  let component: ShowCandidatComponent;
  let fixture: ComponentFixture<ShowCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCandidatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
