/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostoCombustivelComponent } from './posto-combustivel.component';

describe('PostoCombustivelComponent', () => {
  let component: PostoCombustivelComponent;
  let fixture: ComponentFixture<PostoCombustivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostoCombustivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostoCombustivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
