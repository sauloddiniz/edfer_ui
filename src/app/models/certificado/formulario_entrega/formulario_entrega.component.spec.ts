/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Formulario_entregaComponent } from './formulario_entrega.component';

describe('Formulario_entregaComponent', () => {
  let component: Formulario_entregaComponent;
  let fixture: ComponentFixture<Formulario_entregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Formulario_entregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Formulario_entregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
