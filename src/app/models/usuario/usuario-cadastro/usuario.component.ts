import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services';
import { MessageService, Checkbox } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

    @ViewChild('confSenha', { static: true }) confSenha: any;
    @ViewChild('checkAdministrador', { static: true }) checkAdministrador: HTMLElement;

    usuarioForm: FormGroup;

    constructor(private usuarioService: UsuarioService,
        private messageService: MessageService,
        private router: ActivatedRoute) { }

    ngOnInit() {
        const idUser = this.router.snapshot.params['id'];
        this.usuarioForm = new FormGroup({
            'idUsuario': new FormControl(null),
            'usuario': new FormControl(null, Validators.required),
            'nome': new FormControl(null, Validators.required),
            'email': new FormControl(null, Validators.required),
            'ativo': new FormControl(true, Validators.required),
            'senha': new FormControl(null, Validators.required),
            'perfil': new FormArray([], Validators.required)
        });
        if (idUser !== undefined) {
            this.usuarioService.findById(idUser).subscribe(
                (usuario: any) => {
                    this.usuarioForm.patchValue({
                        'idUsuario': usuario.idUsuario,
                        'usuario': usuario.usuario,
                        'nome': usuario.nome,
                        'email': usuario.email,
                        'ativo': usuario.ativo,
                        'senha': null,
                        'perfil': usuario.perfis
                    });
                },
                responseErr => { console.log(responseErr); }
            );
        }
    }

    onSubmit() {
        const id = this.usuarioForm.get('idUsuario').value;
        if (id !== null) {
            if (this.usuarioForm.get('senha').value === this.confSenha.nativeElement.value) {
                this.usuarioService.updateUsuario(id, this.usuarioForm.value).subscribe(
                    responseSuccess => {
                        this.usuarioForm.reset();
                        this.ngOnInit();
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário atualizado' });
                    },
                    (responseError: any) => {
                        for (const response of responseError.error) {
                            this.messageService.add({ severity: 'error', summary: 'Atenção', detail: response });
                        }
                    }
                );
            } else {
                this.messageService.add({ severity: 'error', summary: 'Atenção', detail: 'Senhas Não Conferem' });
            }
        } else {
            if (this.usuarioForm.get('senha').value === this.confSenha.nativeElement.value) {
                this.usuarioService.salvarUsuario(this.usuarioForm.value).subscribe(
                    responseSuccess => {
                        this.ngOnInit();
                        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário cadastrado' });
                    },
                    (responseError: any) => {
                        for (const response of responseError.error) {
                            this.messageService.add({ severity: 'error', summary: 'Atenção', detail: response });
                        }
                    }
                );
            } else {
                this.messageService.add({ severity: 'error', summary: 'Atenção', detail: 'Senhas Não Conferem' });
            }
        }
    }

    changeCheck(check: Checkbox) {
        if (check.checked) {
            (<FormArray>this.usuarioForm.get('perfil')).push(
                new FormControl(check.value)
            );
        } else {
            const perfil = (<FormArray>this.usuarioForm.get('perfil').value);
            for (let i = 0; i < perfil.length; i++) {
                if (check.value === perfil[i]) {
                    (<FormArray>this.usuarioForm.get('perfil')).removeAt(i);
                }
            }
        }
    }
}
