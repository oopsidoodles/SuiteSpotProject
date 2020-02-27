import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantRequestFormComponent } from './tenant-request-form.component';

describe('TenantRequestFormComponent', () => {
  let component: TenantRequestFormComponent;
  let fixture: ComponentFixture<TenantRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
