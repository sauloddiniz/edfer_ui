import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

constructor(private http: HttpClient) { }

    public salvarPedido(pedido: any) {
        return this.http.post(`${EDFER_LOG_API}/pedidos`, pedido);
    }

    public salvar(entrada: any) {
        return this.http.post(`${EDFER_LOG_API}/pedidos/entrada`, entrada);
    }

    public getListaByCriteria(sortField: string, sortOrder: string, first: string, rows: string, numeroPedido: string, cliente: string,
        rota: string, localizacao: string, pesoInicio: string, pesoFinal: string, previsaoInicio: string, previsaoFinal: string,
        status: string, localizacaoPedido: string, situacaoFinal: string, dataCriacaoInicio: string, dataCriacaoFinal: string) {
        // tslint:disable-next-line:max-line-length
        console.log(situacaoFinal);
        // tslint:disable-next-line:max-line-length
        return this.http.get<any[]>(`${EDFER_LOG_API}/pedidos/entrada/criteria?sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&rows=${rows}&numeroPedido=${numeroPedido}&cliente=${cliente}&rota=${rota}&localizacao=${localizacao}&pesoInicio=${pesoInicio}&pesoFinal=${pesoFinal}&previsaoInicio=${previsaoInicio}&previsaoFinal=${previsaoFinal}&status=${status}&localizacaoPedido=${localizacaoPedido}&situacaoFinal=${situacaoFinal}&dataCriacaoInicio=${dataCriacaoInicio}&dataCriacaoFinal=${dataCriacaoFinal}`);
    }

    public getRotas(rota: string) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/pedidos/rotas?rota=${rota}`);
    }

    public getLocalizacao(localizacao: string) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/pedidos/localizacao?localizacao=${localizacao}`);
    }

    public updatePedido(pedido: any, idPedido: number) {
        return this.http.put(`${EDFER_LOG_API}/pedidos/${idPedido}`, pedido);
    }

    public findPedidoIsNull() {
        return this.http.get<number>(`${EDFER_LOG_API}/pedidos/isnull`);
    }

    public findAllPedido() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/pedidos/list`);
    }

    public salverPedidoSeparacao(pedidoSeparacao: any) {
        return this.http.post(`${EDFER_LOG_API}/pedidos/pedidoSeparacao`, pedidoSeparacao);
    }
}
