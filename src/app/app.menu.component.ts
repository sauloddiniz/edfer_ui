import { SharedService } from 'src/app/services';
import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ul app-submenu [item]="model" root="true" parentActive="true"></ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model?: MenuItem[];
    shared: SharedService;

    constructor() {
        this.shared = SharedService.getInstance();
    }

    ngOnInit() {
        this.model = [
            {   label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
            {   label: 'Logistica', icon: 'fa fa-fw fa-road', badge: '3',
                items: [
                    {   label: 'Rotas', icon: 'fas fa-fw fa-route', badge: '2', routerLink: [],
                    items:
                        [
                            {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['/viagem']},
                            {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['']},
                        ]
                    },
                    {
                        label: 'Colaboradores', icon: 'fa fa-fw fa-users', badge: '2',
                        items:
                        [
                            {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['colaborador/novo']},
                            {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['colaborador/lista']},
                        ]
                    },
                    {
                        label: 'Veiculo', icon: 'fa fa-fw fa-truck', badge: '5',
                        items:
                        [
                            {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['veiculo/cadastro']},
                            {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['veiculo/lista']},
                            {label: 'Diaria', icon: 'fa fa-fw fa-clipboard', routerLink: [],
                            items:
                            [
                                {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['veiculo/diaria/cadastro']},
                                {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['veiculo/diaria/lista']}
                            ]
                            },
                            {
                                label: 'Manutenção', icon: 'fas fa-fw fa-tools', routerLink: [],
                                items:
                                [
                                    {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['veiculo/manutencao/cadastro']},
                                    {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['veiculo/manutencao/lista']}
                                ]
                            },
                            {
                                label: 'Abastecimento', icon: 'fa fa-fw fa-tint', routerLink: [],
                                items:
                                [
                                    {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['veiculo/abastecimento/cadastro']},
                                    {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['veiculo/abastecimento/lista']}
                                ]
                            },
                            {
                                label: 'Pneu', icon: 'fa fa-fw fa-cog', routerLink: [],
                                items:
                                [
                                    {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['veiculo/pneu/cadastro']},
                                    {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['veiculo/pneu/lista']}
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Patios', icon: 'fas fa-fw fa-truck-loading', routerLink: ['patios/consulta']
                    }
                ]
            },
            {label: 'Compras', icon: 'fas fa-fw fa-search-dollar', badge: '1',
            items:
            [
                {label: 'Previsão', icon: 'fa fa-fw fa-calendar-check', badge: '2',
                items:
                [
                    {label: 'Cadastrar Previsão', icon: 'fa fa-fw fa-plus', routerLink: ['previsao']},
                    {label: 'Consultar Previsão', icon: 'fa fa-fw fa-database', routerLink: ['previsao/consulta']}
                ]
                },
            ]
            },
            {label: 'Faturamento', icon: 'fas fa-fw fa-cash-register', badge: '1',
            items:
            [
                {label: 'Check-In Pedidos', icon: 'fas fa-fw fa-clipboard-list', badge: '2',
                items:
                [
                    {label: 'Cadastrar', icon: 'fa fa-fw fa-plus', routerLink: ['faturamento/novo']},
                    {label: 'Consultar', icon: 'fa fa-fw fa-database', routerLink: ['faturamento/lista']}
                ]
                },
            ]
            },
            {label: 'Almoxarifado', icon: 'fas fa-fw fa-warehouse', badge: '1',
            items:
            [
                {label: 'Itens', icon: 'fa fa-fw fa-tags', routerLink: ['almoxerifado']},
                {label: 'Entrada / Saida', icon: 'fas fa-fw fa-edit', routerLink: ['almoxerifado/lista']},
                ]
            },
            {
                label: 'Vendas', icon: 'fas fa-fw fa-comments-dollar', badge: '2',
                items:
                [
                    {label: 'Agenda', icon: 'fa fa-fw fa-calendar-alt',
                    items:
                        [
                        {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['agenda/novo']},
                        {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['agenda/lista']},
                        ]
                    },
                    {label: 'Certificados', icon: 'fas fa-fw fa-paperclip',
                    items:
                        [
                        {label: 'Produto', icon: 'fa fa-fw fa-tag', routerLink: ['certificado/produto-certificado']},
                        {label: 'Lista', icon: 'fa fa-fw fa-list', routerLink: ['certificado/cadastro']},
                        {label: 'Cliente', icon: 'far fa-fw fa-handshake', routerLink: ['certificado/cliente']}
                        ]
                    },
                    {label: 'Almoxarifado', icon: 'fas fa-fw fa-warehouse', routerLink: ['/almoxerifado']}
                ]
            },
            {
                label: 'Cadastros Gerais', icon: 'fa fa-fw fa-cogs', badge: '9',
                items: [
                    {label: 'Categoria Veículo', icon: 'fa fa-fw fa-car', routerLink: ['cadastro-geral/veiculo-categoria']},
                    {label: 'Fabricante Veículo', icon: 'fa fa-fw fa-truck', routerLink: ['cadastro-geral/fabricante-veiculo']},
                    {label: 'Fabricante Pneu', icon: 'fa fa-fw fa-cog', routerLink: ['cadastro-geral/fabricante-pneu']},
                    {label: 'Fornecedor', icon: 'fa fa-fw fa-industry', routerLink: ['cadastro-geral/fornecedor']},
                    {label: 'Produto', icon: 'fa fa-fw fa-product-hunt', routerLink: ['cadastro-geral/produto']},
                    {label: 'Fornecedor Produto', icon: 'fa fa-fw fa-industry', routerLink: ['cadastro-geral/fornecedor-produto']},
                    {label: 'Posto de Gasolina', icon: 'fa fa-fw fa-tint', routerLink: ['cadastro-geral/posto']},
                    {label: 'Item', icon: 'fa fa-fw fa-shopping-cart', routerLink: ['cadastro-geral/tipo-item']},
                ]
            },
            {
                label: 'Usuario', icon: 'fa fa-fw fa-user', badge: '2',
                items: [
                    {label: 'Cadastro', icon: 'fa fa-fw fa-plus', routerLink: ['/usuario/novo']},
                    {label: 'Consulta', icon: 'fa fa-fw fa-database', routerLink: ['/usuario/lista']},
                ]
            }
        ];
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-submenu]',
    /* tslint:enable:component-selector */
    template: `
        <ul>
            <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
                <li [ngClass]="{'active-menuitem': isActive(i), 'ui-state-disabled':child.disabled}" [class]="child.badgeStyleClass">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" (click)="itemClick($event,child,i)"
                       [attr.tabindex]="!visible ? '-1' : null"  [attr.target]="child.target">
                        <i [ngClass]="child.icon"></i>
                        <span>{{child.label}}</span>
                        <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                        <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                    </a>
                    <a *ngIf="child.routerLink" (click)="itemClick($event,child,i)" [attr.target]="child.target"
                        [routerLink]="!child.disabled?child.routerLink:null" routerLinkActive="active-menuitem-routerlink"
                       [routerLinkActiveOptions]="{exact: true}">
                        <i [ngClass]="child.icon"></i>
                        <span>{{child.label}}</span>
                        <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                        <i class="fa fa-fw fa-angle-down" *ngIf="child.items"></i>
                    </a>
                    <ul app-submenu [item]="child" *ngIf="child.items"
                        [@children]="isActive(i) ? 'visible' : 'hidden'"  [parentActive]="isActive(i)"></ul>
                </li>
            </ng-template>
        </ul>
    `,
    animations: [
        trigger('children', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    activeIndex: number;

    _parentActive: boolean;

    constructor(public app: AppComponent) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item: item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {this.app.scrollerViewChild.moveBar(); }, 400);
            event.preventDefault();
        }

        if (!item.items) {
            this.app.menuActiveMobile = false;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
