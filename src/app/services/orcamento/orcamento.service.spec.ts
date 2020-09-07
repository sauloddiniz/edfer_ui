/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrcamentoService } from './orcamento.service';

describe('Service: Orcamento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrcamentoService]
    });
  });

  it('should ...', inject([OrcamentoService], (service: OrcamentoService) => {
    expect(service).toBeTruthy();
  }));
});
