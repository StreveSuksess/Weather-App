import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CardHoursForecastComponent } from './card-hours-forecast.component'

describe('CardForecastComponent', () => {
  let component: CardHoursForecastComponent
  let fixture: ComponentFixture<CardHoursForecastComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHoursForecastComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(CardHoursForecastComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
