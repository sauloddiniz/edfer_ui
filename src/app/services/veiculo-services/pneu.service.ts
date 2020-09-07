import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PneuService {

    constructor(private http: HttpClient) { }

    // PNEU
    public salvar(pneu: any) {
      return this.http.post(`${EDFER_LOG_API}/pneu`, pneu);
    }

    public getByCriteria(
        sortField: string,
        sortOrder: string,
        first: any,
        rows: any,
        veiculos: string,
        codControleEdfer: string,
        kmMin: string,
        kmMax: string,
        compraPneuDateMin: string,
        compraPneuDateMax: string,
        caracteristicas: string,
        fabricantePneu: string,
        numSerie: string,
        estadoAtual: string,
        numNotaOuNumOrdem: string,
        estepe: string,
        ativo: string
    ) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/pneu/criterio?sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&rows=${rows}&veiculos=${veiculos}&codControleEdfer=${codControleEdfer}&kmMin=${kmMin}&kmMax=${kmMax}&compraPneuDateMin=${compraPneuDateMin}&compraPneuDateMax=${compraPneuDateMax}&caracteristicas=${caracteristicas}&fabricantePneu=${fabricantePneu}&numSerie=${numSerie}&estadoAtual=${estadoAtual}&numNotaOuNumOrdem=${numNotaOuNumOrdem}&estepe=${estepe}&ativo=${ativo}`);
    }

    public getAllPneusByVeiculo(idVeiculo: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/pneu/${idVeiculo}/lista`);
    }

    public getByIdPneu(idPneu: number) {
        return this.http.get<any>(`${EDFER_LOG_API}/pneu/${idPneu}`);
    }

    public updatePneuById(pneu: any) {
        return this.http.put(`${EDFER_LOG_API}/pneu`, pneu);
    }

    // HISTORICO
    public salvarHistorico(idPneu: number, historico: any) {
        return this.http.post(`${EDFER_LOG_API}/pneu/${idPneu}/historico`, historico);
    }

    public getHistorico(idPneu: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/pneu/${idPneu}/historico`);
    }

    public deleteHistoricoById(idHistorico: number, idPneu: number) {
        return this.http.delete(`${EDFER_LOG_API}/pneu/${idPneu}/historico/${idHistorico}`);
    }

    updateHistorico(idPneu: number, idHistorico: number, histoico: any) {
        return this.http.put(`${EDFER_LOG_API}/pneu/${idPneu}/historico/${idHistorico}`, histoico);
    }

    // ESTADO
    public salvarEstado(idPneu: number, estado: any) {
        return this.http.post(`${EDFER_LOG_API}/pneu/${idPneu}/estado`, estado);
    }

    public getEstados(idPneu: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/pneu/${idPneu}/estado`);
    }

    public updateKmFinal(idPneu: number, idEstadoPneu: number, estadoPneu: any) {
        return this.http.put(`${EDFER_LOG_API}/pneu/${idPneu}/estado/${idEstadoPneu}`, estadoPneu);
    }

    public alterarEstado(pneu: any, atividade: boolean) {
        return this.http.patch(`${EDFER_LOG_API}/pneu/${pneu.idPneu}`, pneu );
    }

    public deleteEstadoById(idEstado: number, idPneu: number) {
        return this.http.delete(`${EDFER_LOG_API}/pneu/${idPneu}/estado/${idEstado}`);
    }
}
