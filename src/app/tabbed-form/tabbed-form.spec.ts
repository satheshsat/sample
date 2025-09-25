import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedForm } from './tabbed-form';

describe('TabbedForm', () => {
  let component: TabbedForm;
  let fixture: ComponentFixture<TabbedForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabbedForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabbedForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
