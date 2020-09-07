import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDFER_LOG_API } from 'src/app/domain';
import { SharedService } from './shared.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    shared: any;
    constructor(private http: HttpClient) {
        this.shared = SharedService.getInstance();
    }

    getUser(usuario: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ZWRmZXI6ZWRmZXI5MDIw'
            })
        };
        return this.http.post(`${EDFER_LOG_API}/oauth/token`, usuario, {
            headers: httpOptions.headers,
            withCredentials: true
        });
    }

    // updateToken() {
    //     const body = 'grant_type=refresh_token';
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             Authorization: 'Basic ZWRmZXI6ZWRmZXI5MDIw'
    //         })
    //     };
    //  return this.http.post(`${EDFER_LOG_API}/oauth/token`, body, {
    //         headers: httpOptions.headers,
    //         withCredentials: true
    //     });
    // }
}
