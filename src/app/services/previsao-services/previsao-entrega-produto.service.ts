import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class PrevisaoEntregaProdutoService {

constructor(private http: HttpClient) { }

    public salvarPrevisao(previsao: any) {
       return this.http.post(`${EDFER_LOG_API}/previsao`, previsao);
    }

    public getAllPrevisao() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/previsao/lista`);
    }

}
