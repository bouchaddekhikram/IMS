import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresDetailComponent } from './offres-detail.component';

describe('OffresDetailComponent', () => {
  let component: OffresDetailComponent;
  let fixture: ComponentFixture<OffresDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffresDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
