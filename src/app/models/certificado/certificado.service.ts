import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EDFER_LOG_API, Cliente } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

constructor(private http: HttpClient) { }

    public save (produtoCertificado: any) {
        return this.http.post(`${EDFER_LOG_API}/certificados/produto`, produtoCertificado);
    }

    public getProdutoStartingWithCodigo(codigo: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/produto/${codigo}`);
    }

    public saveCertificado(certificado: any) {
        return this.http.post(`${EDFER_LOG_API}/certificados/`, certificado);
    }

    public getStartingWithFornecedor(fornecedor: any) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/fornecedor/${fornecedor}`);
    }

    public getStartingWithNorma(norma: any) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/norma/${norma}`);
    }

    public getAllProduto(
        first: string,
        rows: string,
        sortField: string,
        sortOrder: string,
        codigo: string,
        classe: string,
        descricao: string,

    ) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/produto-criteria?first=${first}&rows=${rows}&sortField=${sortField}&sortOrder=${sortOrder}&codigo=${codigo}&classe=${classe}&descricao=${descricao}`);
    }

    public getCertificadoByCriteria(
        first: string,
        rows: string,
        sortField: string,
        sortOrder: string,
        codigo: string,
        dateMin: string,
        dateMax: string,
        numero: string,
        fornecedor: string,
        norma: string,
        corrida: string,
        volume: string,
        dimensao: string
    ) {
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/certificado-criteria?first=${first}&rows=${rows}&sortField=${sortField}&sortOrder=${sortOrder}&codigo=${codigo}&dateMin=${dateMin}&dateMax=${dateMax}&numero=${numero}&fornecedor=${fornecedor}&norma=${norma}&corrida=${corrida}&volume=${volume}&dimensao=${dimensao}`);
    }

    public saveCliente(cliente: Cliente) {
        return this.http.post(`${EDFER_LOG_API}/certificados/${cliente.idCertificado}/cliente`, cliente);
    }

    public getClienteByCertificado(idCertificado: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/${idCertificado}/cliente`);
    }

    public getClienteByNumeroPedido(numPedido: string) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/${numPedido}/pedido`);
    }

    public getCertificadosByIdProduto(idProduto: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/certificados/${idProduto}`);
    }

    public updateCertificado(certificado: any) {
        return this.http.put(`${EDFER_LOG_API}/certificados/`, certificado);
    }
}
