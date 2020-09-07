import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';

@Injectable({
    providedIn: 'root'
})
export class FornecedorProdutoService {

    constructor(private http: HttpClient) { }

    public getFornecedores() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fornecedor-produto`);
    }

    public savlvarFornecedor(fornecedorProduto: any) {
        return this.http.post(`${EDFER_LOG_API}/fornecedor-produto`, fornecedorProduto);
    }

    public getFornecedorById(idFornecedorProduto: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fornecedor-produto/${idFornecedorProduto}`);
    }

    public deleteFornecedor(idFornecedorProduto: number) {
        return this.http.delete(`${EDFER_LOG_API}/fornecedor-produto/${idFornecedorProduto}`);
    }

    public getFornecedorStartingWith(result: string) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/fornecedor-produto?nome=${result}`);
    }

}
