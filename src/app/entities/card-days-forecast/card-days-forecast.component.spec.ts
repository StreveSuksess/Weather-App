import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDaysForecastComponent } from './card-days-forecast.component';

describe('CardDaysForecastComponent', () => {
  let component: CardDaysForecastComponent;
  let fixture: ComponentFixture<CardDaysForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDaysForecastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
