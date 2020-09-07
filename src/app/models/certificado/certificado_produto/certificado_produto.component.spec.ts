/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Certificado_produtoComponent } from './certificado_produto.component';

describe('Certificado_produtoComponent', () => {
  let component: Certificado_produtoComponent;
  let fixture: ComponentFixture<Certificado_produtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Certificado_produtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Certificado_produtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
