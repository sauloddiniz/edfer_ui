import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    constructor(private http: HttpClient) { }

    public getAllProdutos() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/produto/lista`);
    }

    public getAllProdutosContains(descricao: string) {
        return this.http.get<any[]>(
            `${EDFER_LOG_API}/produto/lista?contains=${descricao}`
        );
    }

    public getProdutoByCodigo(codigo: string) {
        return this.http.get<any>(
            `${EDFER_LOG_API}/produto?tipo=${'one'}&codigo=${codigo}`
        );
    }

    public getProdutosStartingWith(codigo: string) {
        return this.http.get<any[]>(
            `${EDFER_LOG_API}/produto?tipo=${'list'}&codigo=${codigo}`
        );
    }

    public salvarProduto(produto: any) {
        return this.http.post(`${EDFER_LOG_API}/produto`, produto);
    }

    public getProdutoById(idProduto: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/produto/${idProduto}`);
    }

    public deleteProdutoById(idProduto: number) {
        return this.http.delete(`${EDFER_LOG_API}/produto/${idProduto}`);
    }

    public getAllProdutoFilter(
        first: number,
        rows: number,
        codigo: string,
        descricao: string,
        sortField: string,
        sortOrder: string
    ) {
        return this.http.get<any[]>(
            // tslint:disable-next-line:max-line-length
            `${EDFER_LOG_API}/produto/lista/filters?first=${first}&rows=${rows}&codigo=${codigo}&descricao=${descricao}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
    }
}
