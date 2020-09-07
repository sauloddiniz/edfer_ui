import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class FabricanteService {

    constructor(private http: HttpClient) { }

    public getFabricantes() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fabricante`);
    }

    public salvarFabricante(fabricante: any) {
        return this.http.post(`${EDFER_LOG_API}/fabricante`, fabricante);
    }

    public getFabricanteById(idFabricante: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fabricante/${idFabricante}`);
    }

    public deleteFabricante(idFabricante: number) {
        return this.http.delete(`${EDFER_LOG_API}/fabricante/${idFabricante}`);
    }

}
