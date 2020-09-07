import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ColaboradorService } from '../../services';

@Component({
  selector: 'app-consulta-motorista',
  templateUrl: './consulta-motorista.component.html',
  styleUrls: ['./consulta-motorista.component.css']
})
export class ConsultaMotoristaComponent implements OnInit {

    motoristas: any[];
  constructor(private colaboradorService: ColaboradorService,
              private router: Router,
              private confirmationService: ConfirmationService  ) {
}

  ngOnInit() {
      this.colaboradorService.listarAtivos().subscribe(
          (onSuccess: any[]) => {
            this.motoristas = onSuccess; },
          onError => {
              console.log('Error');
          }
      );
  }

  confirmChange(motorista: any) {
    this.confirmationService.confirm({
        message: 'Deseja Fazer Alteração?',
        accept: () => {
            this.router.navigate([`colaborador/${motorista.idFuncionario}/edit`]);
        }
    });
  }

}
