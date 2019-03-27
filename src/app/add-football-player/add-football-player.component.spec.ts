import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFootballPlayerComponent } from './add-football-player.component';

describe('AddFootballPlayerComponent', () => {
  let component: AddFootballPlayerComponent;
  let fixture: ComponentFixture<AddFootballPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFootballPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFootballPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
