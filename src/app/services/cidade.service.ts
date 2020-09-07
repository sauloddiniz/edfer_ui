import { Injectable } from '@angular/core';
import { Cidade } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

    cidades: Cidade[];

    getCidades(): any {
       return this.cidades = [
           {cidade: 'Coronel Fabriciano', estado: 'MG'},
           {cidade: 'Ipatinga', estado: 'MG'},
           {cidade: 'Governador Valadares', estado: 'MG'},
       ];
    }

constructor() { }



}
