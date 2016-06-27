import { Injectable, OnInit } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
// import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
// import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class AuthService implements OnInit {
    authorized = false;
    hasStorage = !(localStorage === undefined);
   // @LocalStorage() public token: string = '';
    private token = '';
    private expires: number;

    constructor(private http: Http, private authHttp: AuthHttp, private helper: JwtHelper) {
        this.ngOnInit();
    }

    ngOnInit() {
        if (this.hasStorage) {
            ['token', 'expires'].forEach(key => {
                let val = localStorage.getItem(`id_${key}`);
                if (val) this[key] = val;
            });
        } else {
            console.warn('authService#local storage is not supported.');
        }

        // @todo: check token.
        if (this.token != '') {
            console.log('authService#Found authorization token in localStorage.  Checking expiration date...');
            if (this.expires !== undefined && this.timeLeft(this.expires) > 0) {
                this.authorized = true;
                console.log('authService#PASS: Authorization token is still valid for ' + this.timeLeft(this.expires) + ' seconds.');
            } else {
                console.log('authService#FAIL: Authorization token expired on ',this.expires);
                this.refresh()
                    .subscribe(res => {
                        console.log('refresh response to subscription receiver', res);
                    });
            }
        } else {
            console.log('authService#no token found in storage.');
        }

        console.log('authService#init END', this);
    }

    timeLeft(expires) {
        return expires - (new Date().getTime() / 1000);
    }

    setToken(token) {
        if (this.hasStorage) localStorage.setItem('id_token', token);
        this.token = token;
        return this;
    }

    getToken() {
        return this.token;
    }

    setExpires(expires) {
        if (this.hasStorage) localStorage.setItem('id_expires', expires);
        this.expires = expires;
        return this;
    }

    login(email: string, password: string) : Observable<any> {
        console.log('authService#login: ', email, password);
        return Observable.create(observer => {
            this.http.post('authenticate', { email: email, password: password })
                .map(res => res.json())
                .subscribe(
                    res => {
                        this.setToken(res.token);
                        this.setExpires(res.expires);
                        this.authorized = true;
                        observer.next(res);
                    },
                    error => observer.error(this.parseError(error))
                );
        });
    }

    refresh() {
        console.log('authService#refresh');
        return Observable.create(observer => {
            let headers = new Headers({'Authorization': 'Bearer ' + this.token});
            this.http.get('authenticate/refresh', {headers: headers})
                .map(res => res.json())
                .subscribe(
                    res => {
                        console.log('authService#refresh Success', res);
                        this.setToken(res.token);
                        this.setExpires(res.expires);
                        this.authorized = true;
                        observer.next(res);
                    },
                    error => {
                        console.log('error in jwt refresh ', error);
                        observer.error(error);
                        //observer.error(this.parseError(error)
                    }
                );
        });

    }

    reset() {
        this.authorized = false;

        // this.token = '';
        // if (this.hasStorage) localStorage.removeItem('id_token');

        // this.expires = undefined;
        // if (this.hasStorage) localStorage.removeItem('id_expires');
    }

    parseError(error) : {title: string, message: string} {
        let title = 'Error';
        let message = "Something went wrong and I'm not sure what.  Try again later.";

        if (error.status === 500) {
            title = 'Server Error';
            message = 'An error occured on the server.  Come back later and try again.';
        } else {
            try {
                let json = JSON.parse(error._body);
                message = json.errorText || json.error;

                if (json.error === 'invalid_credentials') title = 'Login failed';
            } catch (e) {
                console.log('authService#parseError couldnt parse the json: ', {
                    error: error,
                    reason: e
                });
            }
        }

        return { title: title, message: message };
    }
}
