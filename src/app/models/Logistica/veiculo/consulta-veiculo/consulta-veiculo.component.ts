
import { Component, OnInit } from '@angular/core';
import { VeiculoService, ManutencaoService, AbastecimentoService, PneuService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-veiculo',
  templateUrl: './consulta-veiculo.component.html',
  styleUrls: ['./consulta-veiculo.component.css']
})
export class ConsultaVeiculoComponent implements OnInit {

    veiculos: any[];
    cols: any[];
    anyListValue: any[];
    tituloLista: string;
    displaySideBar = false;

  constructor(private veiculoService: VeiculoService,
            private manutencaoService: ManutencaoService,
            private abastecimentoService: AbastecimentoService,
            private pneuService: PneuService,
            private router: Router) { }

  ngOnInit() {
      this.veiculoService.getVeiculosNoFilter().subscribe(
          (veiculos: any[]) => {
              this.veiculos = veiculos;
            },
          onErr => console.log(onErr)
      );
  }

  alterarAtividade(idVeiculo: number, ativo: boolean) {
    this.veiculoService.alterarEstado(idVeiculo, ativo).subscribe(
        onSuccess => this.ngOnInit(),
        onErr => {
            return console.log(onErr);
        }
    );
  }

  getManutencao(veiculo: any) {
    this.cols = [];
    this.anyListValue = [];
    this.tituloLista = 'Manutenções';
      this.cols = [
          {field: 'dataManutencao', header: 'Data'},
          {field: 'tipoManutencao', header: 'Tipo Manutenção'},
          {field: 'tipoServico', header: 'Servico'},
          {field: 'fornecedor', header: 'Fornecedor'},
          {field: 'hodometroEfetuado', header: 'Hodômetro'},
          {field: 'valor', header: 'Valor'}
      ];
    this.manutencaoService.getManutencaoByIdVeiculo(veiculo.idVeiculo).subscribe(
        (manutencoes: any[]) => { console.log(manutencoes);
            manutencoes.forEach(
            manutencao => this.anyListValue.push(
                {
                    dataManutencao: manutencao.dataManutencao,
                    tipoManutencao: manutencao.tipoManutencao,
                    tipoServico: manutencao.tipoServico,
                    fornecedor: manutencao.fornecedor,
                    hodometroEfetuado: manutencao.hodometroEfetuado,
                    valor: manutencao.valorManutencao
                }
            )
        ); }
    );
  }

  getAbastecimentos(veiculo: any) {
      this.tituloLista = 'Abastecimentos';
      this.cols = [];
      this.anyListValue = [];

      this.cols = [
          {field: 'data', header: 'Data'},
          {field: 'posto', header: 'Posto'},
          {field: 'hodometro', header: 'Hodômetro'},
          {field: 'quantidadeLitro', header: 'Quantidade Litro'},
          {field: 'valorLitro', header: 'Valor Litro'},
          {field: 'valorTotal', header: 'Valor Total'},
          {field: 'consumoMedio', header: 'Consumo médio'}
      ];

      this.abastecimentoService.getAbastecimentoByIdVeiculo(veiculo.idVeiculo).subscribe(
          (abastecimentos: any[]) => {
              console.log(abastecimentos);
              abastecimentos.forEach(
                  abastecimento => this.anyListValue.push(
                      {
                          data: abastecimento.dataAbastecimento,
                          posto: abastecimento.posto.nome,
                          hodometro: abastecimento.hodometro,
                          quantidadeLitro: abastecimento.quantidadeLitro,
                          valorLitro: abastecimento.valorLitro,
                          valorTotal: abastecimento.valorTotal,
                          consumoMedio: (abastecimento.consumoMedio).toPrecision(2).replace('.', ',')
                      }
                  )
              );
          }
      );
  }

  getPneus(veiculo: any) {
    this.tituloLista = 'Pneus';
    this.cols = [];
    this.anyListValue = [];

    this.cols = [
        {field: 'numSerie', header: 'Nº Série'},
        {field: 'tipo', header: 'Tipo' },
        {field: 'data', header: 'Data Compra/Reforma' },
        {field: 'dataInsert', header: 'Data Inserido' },
        {field: 'km', header: 'Km'}
    ];

    this.pneuService.getAllPneusByVeiculo(veiculo.idVeiculo).subscribe(
        (pneus: any[]) => {console.log(pneus); pneus.forEach(
            pneu => this.anyListValue.push(
                {
                    numSerie: pneu.numSerie,
                    tipo: pneu.estadosPneu[0].estado,
                    data: pneu.estadosPneu[0].dataCompraOuReforma,
                    dataInsert: pneu.dataEntradaVeiculo,
                    km: pneu.km
                }
            )
        ); console.log(pneus); }
    );
  }

  atualizarVeiculo(veiculo: any) {
      this.router.navigate(['/veiculo', veiculo.idVeiculo]);
  }
}
