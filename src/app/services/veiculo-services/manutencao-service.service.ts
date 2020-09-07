import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: "root"
})
export class ManutencaoService {
    constructor(private http: HttpClient) {}

    public salvar(manutencao: any) {
        return this.http.post(`${EDFER_LOG_API}/manutencao`, manutencao);
    }

    public getManutencaoByIdVeiculo(idVeiculo: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/manutencao/${idVeiculo}`);
    }

    public getManutencaoById(idManutencao: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/manutencao/one/${idManutencao}`);
    }

    public update(idManutencao: number, manutencao: any) {
        return this.http.put(`${EDFER_LOG_API}/manutencao/${idManutencao}`, manutencao);
    }

    public getAllManutencaoCriteria(
        sortField: string,
        sortOrder: string,
        first: any,
        rows: any,
        idManutencao: string,
        tipoManutencao: string,
        tipoServico: string,
        valorMin: string,
        valorMax: string,
        tipoNota: string,
        validHodometroMin: string,
        validHodometroMax: string,
        validManutencaoDateMin: string,
        validManutencaoDateMax: string,
        fornecedor: string,
        numNotaOuNumOrdem: string,
        veiculos: string
    ) {
        return this.http.get<any[]>(
            // tslint:disable-next-line:max-line-length
            `${EDFER_LOG_API}/manutencao/criteria?sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&rows=${rows}&idManutencao=${idManutencao}&tipoManutencao=${tipoManutencao}&tipoServico=${tipoServico}&valorMin=${valorMin}&valorMax=${valorMax}&tipoNota=${tipoNota}&validHodometroMin=${validHodometroMin}&validHodometroMax=${validHodometroMax}&validManutencaoDateMin=${validManutencaoDateMin}&validManutencaoDateMax=${validManutencaoDateMax}&fornecedor=${fornecedor}&numNotaOuNumOrdem=${numNotaOuNumOrdem}&veiculos=${veiculos}`);
    }

    public getFornecedores(fornecedor: string) {
        return this.http.get<string[]>(
            `${EDFER_LOG_API}/manutencao/fornecedor?fornecedor=${fornecedor}`
        );
    }

    public removeById(idManutencao: number) {
        return this.http.delete(`${EDFER_LOG_API}/manutencao/${idManutencao}`);
    }

    public getAllServicos() {
        return this.http.get<any[]>(
            `${EDFER_LOG_API}/manutencao/getServicos`
        );
    }

}
