import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingOpinionPollComponent } from './creating-opinion-poll.component';

describe('CreatingOpinionPollComponent', () => {
  let component: CreatingOpinionPollComponent;
  let fixture: ComponentFixture<CreatingOpinionPollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatingOpinionPollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatingOpinionPollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
