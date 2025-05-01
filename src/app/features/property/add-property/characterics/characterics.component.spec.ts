import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactericsComponent } from './characterics.component';

describe('CharactericsComponent', () => {
  let component: CharactericsComponent;
  let fixture: ComponentFixture<CharactericsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactericsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactericsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
