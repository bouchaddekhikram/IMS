import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreUpdateComponent } from './offre-update.component';

describe('OffreUpdateComponent', () => {
  let component: OffreUpdateComponent;
  let fixture: ComponentFixture<OffreUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffreUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
