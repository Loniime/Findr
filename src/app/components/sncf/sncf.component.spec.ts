import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SncfComponent } from './sncf.component';

describe('SncfComponent', () => {
  let component: SncfComponent;
  let fixture: ComponentFixture<SncfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SncfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SncfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
