// import { SharedService, LoginService } from 'src/app/services';
// import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { EDFER_LOG_API } from '../domain';

// @Injectable()
// export class OauthInterceptor implements HttpInterceptor {
//     shared: SharedService;

//     constructor(private login: LoginService,
//                 private http: HttpClient) {
//         this.shared = SharedService.getInstance();
//     }

//     intercept(
//         request: HttpRequest<any>,
//         next: HttpHandler
//     ): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(
//             catchError(err => {
//                 if (err instanceof HttpErrorResponse && err.status === 401) {
//                     return this.handle401Error(request, next);
//                 } else {
//                     return throwError(err);
//                 }
//             })
//         );
//     }
//     private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//         const helper = new JwtHelperService();
//         let oauthRequest: any;
//         if (helper.isTokenExpired(this.shared.token)) {
//             const body = 'grant_type=refresh_token';
//             const httpOptions = {
//                 headers: new HttpHeaders({
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                     Authorization: 'Basic ZWRmZXI6ZWRmZXI5MDIw'
//                 })
//             };
//             this.http.post(`${EDFER_LOG_API}/oauth/token`, body, {
//             headers: httpOptions.headers, withCredentials: true}
//             ).subscribe(
//                 (success: any) => {

//                 },
//                 err => {}
//                 );
//             return next.handle(oauthRequest);
//         } else {
//             oauthRequest = request.clone({
//                 setHeaders: {'Authorization' : `Bearer ${this.shared.token}`}
//             });
//             return next.handle(oauthRequest);
//         }
//     }
// }
