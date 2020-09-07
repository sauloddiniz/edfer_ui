import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParteDiariaService {

    constructor(private http: HttpClient) { }

    public save(parteDiaria: any) {
        return this.http.post(`${EDFER_LOG_API}/parte-diaria`, parteDiaria);
    }

    public updateDiaria(parteDiaria: any) {
        return this.http.put(`${EDFER_LOG_API}/parte-diaria`, parteDiaria);
    }

    public getListByCriteria(
        sortField: string,
        sortOrder: string,
        first: any,
        rows: any,
        veiculos: string,
        cliente: string,
        nota: string,
        dataParteDiariaMin: string,
        dataParteDiariaMax: string,
    ) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/parte-diaria/criteria?sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&rows=${rows}&veiculos=${veiculos}&cliente=${cliente}&nota=${nota}&dataParteDiariaMin=${dataParteDiariaMin}&dataParteDiariaMax=${dataParteDiariaMax}`);
    }

    public getNomeClienteOuFornecedor(nomeClienteOuFornecedor: string) {
        return this.http.get<string[]>(
            `${EDFER_LOG_API}/parte-diaria/nomeClienteOuFornecedor?nomeClienteOuFornecedor=${nomeClienteOuFornecedor}`
        );
    }

    public getDiariaById(idParteDiaria: number) {
        return this.http.get<any>(
            `${EDFER_LOG_API}/parte-diaria/${idParteDiaria}`
        );
    }
}
