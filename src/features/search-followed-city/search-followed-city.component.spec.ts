import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFollowedCityComponent } from './search-followed-city.component';

describe('SearchFollowedCityComponent', () => {
  let component: SearchFollowedCityComponent;
  let fixture: ComponentFixture<SearchFollowedCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFollowedCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFollowedCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
