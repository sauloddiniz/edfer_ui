import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class CategoriaVeiculoService {

    constructor(private http: HttpClient) { }

    public getCategorias() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/categoria`);
    }

    public salvarCategoria(categoria: any) {
        return this.http.post(`${EDFER_LOG_API}/categoria`, categoria);
    }

    public getCategoriaById(idCategoria: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/categoria/${idCategoria}`);
    }

    public deleteCategoria(idCategoria: number) {
        return this.http.delete(`${EDFER_LOG_API}/categoria/${idCategoria}`);
    }

}
