import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDevocionaisPageComponent } from './admin-devocionais-page.component';

describe('AdminDevocionaisPageComponent', () => {
  let component: AdminDevocionaisPageComponent;
  let fixture: ComponentFixture<AdminDevocionaisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDevocionaisPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDevocionaisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
