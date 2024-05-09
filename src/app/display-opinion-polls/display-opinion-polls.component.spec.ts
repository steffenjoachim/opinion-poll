import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOpinionPollsComponent } from './display-opinion-polls.component';

describe('DisplayOpinionPollsComponent', () => {
  let component: DisplayOpinionPollsComponent;
  let fixture: ComponentFixture<DisplayOpinionPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayOpinionPollsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayOpinionPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
