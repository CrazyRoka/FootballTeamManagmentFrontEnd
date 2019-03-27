import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFootballPlayerComponent } from './edit-football-player.component';

describe('EditFootballPlayerComponent', () => {
  let component: EditFootballPlayerComponent;
  let fixture: ComponentFixture<EditFootballPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFootballPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFootballPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
