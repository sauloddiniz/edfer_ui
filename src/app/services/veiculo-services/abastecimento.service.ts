import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class AbastecimentoService {

    constructor(private http: HttpClient) { }

    public salvar(abastecimento: any) {
        return this.http.post(`${EDFER_LOG_API}/abastecimento`, abastecimento);
    }

    public getAbastecimentoByIdVeiculo(idVeiculo: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/abastecimento/${idVeiculo}`);
    }

    public getAll() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/abastecimento/list`);
    }

    public getAbastecimentoById(id: any) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/abastecimento/one/${id}`);
    }

    public update(idAbastecimento: number, abastecimento: any) {
        return this.http.put(`${EDFER_LOG_API}/abastecimento/${idAbastecimento}`, abastecimento);
    }

    public removeById(idAbastecimento: number) {
        return this.http.delete(`${EDFER_LOG_API}/abastecimento/${idAbastecimento}`);
    }

    public getByCriteria(
        rows: string,
        first: string,
        sortField: string,
        sortOrder: string,
        idAbastecimento: string,
        veiculos: string,
        abastecimentoDateMin: string,
        abastecimentoDateMax: string,
        postos: string,
        tipoCombustivel: string) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/abastecimento/criteria?rows=${rows}&first=${first}&sortField=${sortField}&sortOrder=${sortOrder}&idAbastecimento=${idAbastecimento}&veiculos=${veiculos}&abastecimentoDateMin=${abastecimentoDateMin}&abastecimentoDateMax=${abastecimentoDateMax}&postos=${postos}&tipoCombustivel=${tipoCombustivel}`);
    }

    public updateConsumo(rowData: any) {
        return this.http.put(`${EDFER_LOG_API}/abastecimento/consumoMedio/${rowData.idAbastecimento}`, rowData);
    }
}
