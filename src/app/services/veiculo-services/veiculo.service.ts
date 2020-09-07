import { EDFER_LOG_API } from 'src/app/domain';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

constructor(private http: HttpClient) { }

    public salvar(veiculo: any) {
        return this.http.post(`${EDFER_LOG_API}/veiculo`, veiculo);
    }

    public getVeiculos() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/veiculo?filter=yes`);
    }

    public getVeiculosNoFilter() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/veiculo`);
    }

    public alterarEstado(idVeiculo: number, atividade: boolean) {
        const veiculo = {'ativo': atividade};
        return this.http.patch(`${EDFER_LOG_API}/veiculo/${idVeiculo}`, veiculo );
    }

    public getEixos(idVeiculo: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/veiculo/eixos/${idVeiculo}`);
    }

    public getVeiculoById(idVeiculo: any) {
        return this.http.get<any>(`${EDFER_LOG_API}/veiculo/${idVeiculo}`);
    }

    public updateVeiculoById(veiculo: any, idVeiculo: number) {
        return this.http.put(`${EDFER_LOG_API}/veiculo/${idVeiculo}`, veiculo);
    }
}
