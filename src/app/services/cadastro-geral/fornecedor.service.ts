import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

constructor(private http: HttpClient) { }

    public getFornecedores() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fornecedor-veiculo/list`);
    }

    public savlvarFornecedor(fornecedor: any) {
        return this.http.post(`${EDFER_LOG_API}/fornecedor-veiculo`, fornecedor);
    }

    public getFornecedorById(idFornecedor: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fornecedor-veiculo/${idFornecedor}`);
    }

    public deleteFornecedor(idFornecedor: number) {
        return this.http.delete(`${EDFER_LOG_API}/fornecedor-veiculo/${idFornecedor}`);
    }
}
