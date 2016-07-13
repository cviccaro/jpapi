import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoggerService } from './logger.service';

// import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
// import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class AuthService {
    private _authorized = false;
    hasStorage = !(localStorage === undefined);
   // @LocalStorage() public token: string = '';
    private token = '';
    private expires: number;

    // Observable source
    private _authTokenSource = new ReplaySubject<string>(1);
    // Observable stream
    public authToken$ = this._authTokenSource.asObservable();

    // source
    private _authorizedSource = new ReplaySubject<boolean>(1);

    // stream
    public whenAuthorized = this._authorizedSource.asObservable();

    constructor(private http: Http, private authHttp: AuthHttp, private helper: JwtHelper, private log: LoggerService) {
        if (this.hasStorage) {
            ['token', 'expires'].forEach(key => {
                let val = localStorage.getItem(`id_${key}`);
                if (val) this[key] = val;
            });
        } else {
            this.log.warn('authService#local storage is not supported.');
        }

        // @todo: check token.
        if (this.token != '') {
            this.log.log('authService#Found authorization token in localStorage.  Checking expiration date...');
            if (this.expires !== undefined && this.timeLeft(this.expires) > 0) {
                this.authorized = true;
                //this.log.log('authService#PASS: Authorization token is still valid for ' + this.timeLeft(this.expires) + ' seconds.');
            } else {
                this.log.log('authService#FAIL: Authorization token expired on ',this.expires);
                this.refresh()
                    .subscribe(res => {
                        this.log.log('refresh response to subscription receiver', res);
                    });
            }
        } else {
            this.log.log('authService#no token found in storage.');
        }

        this.log.log('authService#init END', this);
    }

    get authorized() { return this._authorized; }
    set authorized(v: boolean) {
        this._authorized = v;
        this._authorizedSource.next(v);
    }

    timeLeft(expires) {
        return expires - (new Date().getTime() / 1000);
    }

    setToken(token) {
        if (this.hasStorage) localStorage.setItem('id_token', token);
        this.token = token;
        this.informObservers(token);
        return this;
    }

    getToken() {
        return this.token;
    }

    informObservers(token?:string) {
        if (token === undefined) token = this.token;

        this._authTokenSource.next(token);
    }

    setExpires(expires) {
        if (this.hasStorage) localStorage.setItem('id_expires', expires);
        this.expires = expires;
        return this;
    }

    login(email: string, password: string) : Observable<any> {
        this.log.log('authService#login: ', email, password);
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
        this.log.log('authService#refresh');
        return Observable.create(observer => {
            let headers = new Headers({'Authorization': 'Bearer ' + this.token});
            this.http.get('authenticate/refresh', {headers: headers})
                .map(res => res.json())
                .subscribe(
                    res => {
                        this.log.log('authService#refresh Success', res);
                        this.setToken(res.token);
                        this.setExpires(res.expires);
                        this.authorized = true;
                        observer.next(res);
                    },
                    error => {
                        this.log.log('error in jwt refresh ', error);
                        observer.error(error);
                        //observer.error(this.parseError(error)
                    }
                );
        });

    }

    reset() {
        this.authorized = false;

        this.token = '';
        if (this.hasStorage) localStorage.removeItem('id_token');

        this.expires = undefined;
        if (this.hasStorage) localStorage.removeItem('id_expires');
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
                this.log.log('authService#parseError couldnt parse the json: ', {
                    error: error,
                    reason: e
                });
            }
        }

        return { title: title, message: message };
    }
}
