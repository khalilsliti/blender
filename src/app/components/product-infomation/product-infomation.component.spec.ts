import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfomationComponent } from './product-infomation.component';

describe('ProductInfomationComponent', () => {
  let component: ProductInfomationComponent;
  let fixture: ComponentFixture<ProductInfomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInfomationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
