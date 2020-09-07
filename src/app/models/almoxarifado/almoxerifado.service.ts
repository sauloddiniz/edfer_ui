import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlmoxerifadoService {

    constructor(private http: HttpClient) { }

    public save(miudeza: any) {
        return this.http.post(`${EDFER_LOG_API}/almoxerifado`, miudeza);
    }

    public getAlmoxerifadoCriteria(
        first: string,
        rows: string,
        sortField: string,
        sortOrder: string,
        codigo: string,
        descricao: string
        ) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/almoxerifado/criterio?first=${first}&rows=${rows}&sortField=${sortField}&sortOrder=${sortOrder}&codigo=${codigo}&descricao=${descricao}`);
    }

    public getMiudezaStartingWithCodigo(codigo: any) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/almoxerifado/miudeza/${codigo}`);
    }

    public saveEntradaSaida(entradaSaida: any) {
        return this.http.post(`${EDFER_LOG_API}/almoxerifado/entradaSaida`, entradaSaida);
    }

    public getAllEntradaSaida() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/almoxerifado`);
    }

    public cancelAction(idMiudeza: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/almoxerifado/update/${idMiudeza}`);
    }
}
