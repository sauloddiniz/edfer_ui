import { EDFER_LOG_API } from '../../domain/api-url';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/domain';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UsuarioService {
    usuario: Usuario;

    constructor(public http: HttpClient) {}

    public salvarUsuario(usuario: Usuario) {
        return this.http.post(`${EDFER_LOG_API}/usuario`, usuario);
    }

    public listaDeUsuario() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/usuario`);
    }

    public listaDeUsuariosVendedores() {
        return this.http.get<any[]>(`${EDFER_LOG_API}/usuario/vendedores`);
    }

    public findById(idUsuario: number) {
        return this.http.get<any[]>(`${EDFER_LOG_API}/usuario/${idUsuario}`);
    }

    public updateUsuario(idUsuario: number, usuario: any) {
        return this.http.put(`${EDFER_LOG_API}/usuario/${idUsuario}`, usuario);
    }
}
