import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class PostoService {

constructor(private http: HttpClient) { }

 public getPostos() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/posto`);
    }

    public salvarPosto(posto: any) {
        return this.http.post(`${EDFER_LOG_API}/posto`, posto);
    }

    public getPostoById(idPosto: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/posto/${idPosto}`);
    }

    public deletePosto(idPosto: number) {
        return this.http.delete(`${EDFER_LOG_API}/posto/${idPosto}`);
    }
}
