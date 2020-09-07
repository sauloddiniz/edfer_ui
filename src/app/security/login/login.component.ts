import { SharedService, LoginService } from 'src/app/services';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    shared: SharedService;
    showErr: Message[];

    constructor(
        private loginService: LoginService,
        private router: Router,
    ) {
        this.shared = SharedService.getInstance();
        this.loadToken();
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl(null),
            password: new FormControl(null)
        });
    }

    login() {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        const body = `username=${username}&password=${password}&grant_type=password`;

        this.loginService.getUser(body).subscribe(
            (responseSuccess: any) => {
                this.addToken(responseSuccess.access_token);
            },
            responseError => {
                 this.showErr = [];
                 this.showErr.push({
                     severity: 'error',
                     summary: responseError.error.error_description,
                     detail: ''
                });
            }
        );
    }

    addToken(token: string) {
        const helper = new JwtHelperService();
        this.shared.payLoad = helper.decodeToken(token);
        this.shared.token = token;
        localStorage.setItem('access_token', token);
        this.shared.showTamplate = true;
        this.shared.tokenTime = helper.getTokenExpirationDate(token);
        this.router.navigate( [''] );
    }

    private loadToken() {
        const helper = new JwtHelperService();
        const token = localStorage.getItem('access_token');
        if (token && !helper.isTokenExpired(token)) {
            this.addToken(token);
        }
    }
}
