import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class AgendaService {
    constructor(private http: HttpClient) {}

    public salvar(agenda: any) {
        return this.http.post(`${EDFER_LOG_API}/agenda`, agenda);
    }

    public atualizar(agenda: any, idAgenda: number) {
        return this.http.put(`${EDFER_LOG_API}/agenda/${idAgenda}`, agenda);
    }

    public getAllByEmailUser() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/agenda`);
    }

    public getFilterByCriteria(
        first: number,
        rows: number,
        nome: any,
        idAgenda: string,
        orcamentoNumber: string,
        estados: any,
        tipoCliente: string,
        cliente: string,
        visitaDe: string,
        visitaAte: string,
        retornoDe: string,
        retornoAte: string,
        observacao: string,
        valorMin: string,
        valorMax: string,
        sortField: string,
        sortOrder: string
    ) {
        return this.http.get<any[]>(
            // tslint:disable-next-line:max-line-length
            `${EDFER_LOG_API}/agenda/list?first=${first}&rows=${rows}&nomes=${nome}&idAgenda=${idAgenda}&orcamentoNumber=${orcamentoNumber}&estados=${estados}&tipoCliente=${tipoCliente}&cliente=${cliente}&visitaDe=${visitaDe}&visitaAte=${visitaAte}&retornoDe=${retornoDe}&retornoAte=${retornoAte}&observacao=${observacao}&valorMin=${valorMin}&valorMax=${valorMax}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
    }

    public getFilterByCriteriaUser(
        first: number,
        rows: number,
        idAgenda: string,
        estados: any,
        orcamentoNumber: string,
        tipoCliente: string,
        cliente: string,
        visitaDe: string,
        visitaAte: string,
        retornoDe: string,
        retornoAte: string,
        observacao: string,
        valorMin: string,
        valorMax: string,
        sortField: string,
        sortOrder: string
    ) {
        console.log('service', orcamentoNumber);
        return this.http.get<any[]>(
            // tslint:disable-next-line:max-line-length
            `${EDFER_LOG_API}/agenda/list/vendedor?first=${first}&rows=${rows}&idAgenda=${idAgenda}&estados=${estados}&tipoCliente=${tipoCliente}&cliente=${cliente}&visitaDe=${visitaDe}&visitaAte=${visitaAte}&retornoDe=${retornoDe}&retornoAte=${retornoAte}&observacao=${observacao}&orcamentoNumber=${orcamentoNumber}&valorMin=${valorMin}&valorMax=${valorMax}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
    }

    public deleteHistoryById(idAgenda: number, idHistorico: number) {
        console.log(idAgenda, idHistorico);
       return this.http.delete(`${EDFER_LOG_API}/agenda/${idAgenda}/historico/${idHistorico}`);
    }

    public getClientes(cliente: string) {
        return this.http.get<string[]>(
            `${EDFER_LOG_API}/agenda/cliente?cliente=${cliente}`
        );
    }

    public getContatos(contato: string) {
        return this.http.get<string[]>(
            `${EDFER_LOG_API}/agenda/contato?contato=${contato}`
        );
    }

    public deleteAgendaById(idAgenda: number) {
        return this.http.delete(`${EDFER_LOG_API}/agenda/${idAgenda}`);
    }
}
