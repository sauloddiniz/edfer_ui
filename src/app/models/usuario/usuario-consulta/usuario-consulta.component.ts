import { Component, OnInit } from '@angular/core';
import { UsuarioService, SharedService } from 'src/app/services';
import { ConfirmationService } from 'primeng/components/common/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-usuario-consulta',
    templateUrl: './usuario-consulta.component.html',
    styleUrls: ['./usuario-consulta.component.css']
})
export class UsuarioConsultaComponent implements OnInit {

    usuarios: any[];
    shared: any;

    constructor(private usuarioService: UsuarioService,
                private confirmationService: ConfirmationService,
                private router: Router) {
                    this.shared = SharedService.getInstance();
                }

    ngOnInit() {
        this.usuarioService.listaDeUsuario().subscribe(
            (usuarios: any[]) => {this.usuarios = usuarios; },
            onErr => {console.log(onErr); }
        );
    }

    confirmChange(usuario: any) {
        this.confirmationService.confirm({
            message: 'Deseja Fazer Alteração?',
            accept: () => {
                this.router.navigate([`usuario/${usuario.idUsuario}/edit`]);
            }
        });
    }

}
