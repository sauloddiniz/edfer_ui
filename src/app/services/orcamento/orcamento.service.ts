import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class OrcamentoService {

    constructor(private http: HttpClient) { }

    public getAll() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/orcamento`);
    }

    public salvar(orcamento: any) {
        return this.http.post(`${EDFER_LOG_API}/orcamento`, orcamento);
    }
}
