import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorService {

    constructor(private http: HttpClient) {}

    public salvar(motorista: any) {
        return this.http.post(`${EDFER_LOG_API}/colaborador/motorista`, motorista);
    }

    public salvarAjudante(ajudante: any) {
        return this.http.post(`${EDFER_LOG_API}/colaborador/ajudante`, ajudante);
    }

    public listarAtivos() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/colaborador/lista`);
    }

    public listarAjudantesAtivos() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/colaborador/ajudantes`);
    }

    public listarMotoristasAtivos() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/colaborador/motoristas`);
    }

    public findById(idFuncionario: any) {
        console.log('idColaborador', idFuncionario);
        return this.http.get<any[]>(`${EDFER_LOG_API}/colaborador/${idFuncionario}`);
    }
}
