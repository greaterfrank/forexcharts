import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCandle1Component } from './chart-candle1.component';

describe('ChartCandle1Component', () => {
  let component: ChartCandle1Component;
  let fixture: ComponentFixture<ChartCandle1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCandle1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCandle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
