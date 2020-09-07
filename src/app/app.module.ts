import { environment} from 'src/app/domain';
import { LogisticaGuard } from './security/logisticaGuard';
import { AdminGuard } from './security/AdminGuard';
import { LoginModule } from './security/login.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './app.menu.component';
import { DashboardModule } from './models/dashboard/dashboard.module';
import { OrcamentoModule } from './models/orcamento/orcamento.module';
import { SharedService } from './services';
import { OauthGuard } from './security/guard';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { VendaGuard } from './security/vendaGuard';
import { GestorGuard } from './security/gestorGuard';
import { CompraGuard } from './security/compraGuard';
import { ScrollPanelModule } from 'primeng/components/scrollpanel/scrollpanel';
import { PedidoModule } from './models/Logistica/pedido/pedido.module';
import { LogisticaOrVendaGuard } from './security/LogisticaOrVendaGuard';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

registerLocaleData(ptBr);

export function getToken() {
    return localStorage.getItem('access_token');
   }

@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken,
                whitelistedDomains: ['localhost:8080']
              }
          }),
        ScrollPanelModule,
        BrowserAnimationsModule,
        DashboardModule,
        PedidoModule,
        OrcamentoModule,
        LoginModule
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenuComponent
    ],
    providers: [
        SharedService,
        OauthGuard,
        AdminGuard,
        VendaGuard,
        GestorGuard,
        LogisticaGuard,
        CompraGuard,
        LogisticaOrVendaGuard,
        {
            provide: LOCALE_ID,
            useValue: 'pt'
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: OauthInterceptor,
        //     multi: true,
        // },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
