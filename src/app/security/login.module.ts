import { DeniedComponent } from './denied/denied.component';
import { NgModule } from '@angular/core';
import { UsuarioService } from 'src/app/services';
import { SharedService } from 'src/app/services';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GrowlModule } from 'primeng/growl';

@NgModule({
  imports: [
    CoreModule,
    ReactiveFormsModule,
    GrowlModule
  ],
  declarations: [LoginComponent, DeniedComponent],
  providers: [
      SharedService,
      UsuarioService]
})
export class LoginModule { }
