import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphProductComponent } from './graph-product.component';

describe('GraphProductComponent', () => {
  let component: GraphProductComponent;
  let fixture: ComponentFixture<GraphProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
