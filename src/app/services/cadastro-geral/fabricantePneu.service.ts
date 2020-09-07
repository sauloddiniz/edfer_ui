import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class FabricantePneuService {

    constructor(private http: HttpClient) { }

    public getFabricantes() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fabricante-pneu`);
    }

    public salvarFabricante(fabricante: any) {
        return this.http.post(`${EDFER_LOG_API}/fabricante-pneu`, fabricante);
    }

    public getFabricanteById(idFabricante: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fabricante-pneu/${idFabricante}`);
    }

    public deleteFabricante(idFabricante: number) {
        return this.http.delete(`${EDFER_LOG_API}/fabricante-pneu/${idFabricante}`);
    }

}
