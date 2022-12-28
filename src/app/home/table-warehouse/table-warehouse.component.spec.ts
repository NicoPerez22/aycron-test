import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWarehouseComponent } from './table-warehouse.component';

describe('TableWarehouseComponent', () => {
  let component: TableWarehouseComponent;
  let fixture: ComponentFixture<TableWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
