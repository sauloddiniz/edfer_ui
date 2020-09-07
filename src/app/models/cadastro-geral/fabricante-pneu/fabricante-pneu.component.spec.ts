/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FabricantePneuComponent } from './fabricante-pneu.component';

describe('FabricantePneuComponent', () => {
  let component: FabricantePneuComponent;
  let fixture: ComponentFixture<FabricantePneuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricantePneuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricantePneuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
