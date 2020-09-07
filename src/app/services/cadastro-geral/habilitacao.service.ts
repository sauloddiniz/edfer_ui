import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class HabilitacaoService {

constructor(private http: HttpClient) { }

    public getHabilitacao() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/geral/habilitacao`);
    }

}
