import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AuthHttp } from './auth.http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoggerService } from './logger.service';

@Injectable()
export class AuthService {
    hasStorage = !(localStorage === undefined);
    token = '';
    expires: number;

    get authorized() { return this._authorized; }
    set authorized(v: boolean) {
        this._authorized = v;
        this._authorizedSource.next(v);
    }

    // Observable sources
    public _authorizedSource = new ReplaySubject<boolean>(1);
    public _authTokenSource = new ReplaySubject<string>(1);

    // Observable streams
    public authToken$ = this._authTokenSource.asObservable();
    public whenAuthorized = this._authorizedSource.asObservable();

    private _authorized = false;

    constructor(private http: Http, private authHttp: AuthHttp, private log: LoggerService) {
        if (this.hasStorage) {
            ['token', 'expires'].forEach(key => {
                let val = localStorage.getItem(`id_${key}`);
                if (val) this[key] = val;
            });
        } else {
            this.log.warn('authService#local storage is not supported.');
        }

        if (this.token !== '') {
            this.log.log('authService#Found authorization token in localStorage.  Checking expiration date...');
            if (this.expires !== undefined && this.timeLeft(this.expires) > 0) {
                this.authorized = true;
                this.setToken(this.token, false);
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

    /**
     * Set the authorization token
     * @param  {string} token string
     * @return {AuthService} this 
     */
    setToken(token: string, store = true): AuthService {
        this.log.log('set token ', token);
        if (store && this.hasStorage) localStorage.setItem('id_token', token);
        this.authHttp.token = token;
        this.token = token;
        this.emitAuthorizationToken(token);
        return this;
    }

    /**
     * Get the authorization token
     * @return {string} token string
     */
    getToken(): string {
        return this.token;
    }

    /**
     * Emit Authorization token
     * @param {string} token token string
     */
    emitAuthorizationToken(token?:string): void {
        if (token === undefined) token = this.token;

        this._authTokenSource.next(token);
    }
    /**
     * Set the time remaining on the authorization token
     * @param {number} expires
     * @return {AuthService} this
     */
    setExpires(expires: number): AuthService {
        if (this.hasStorage) localStorage.setItem('id_expires', expires.toString());

        this.expires = expires;

        return this;
    }

    /**
     * Get the time remaining from an expires timestamp
     * @param {number} expires
     * @return {number} time remaining
     */
    timeLeft(expires: number): number {
        return expires - (new Date().getTime() / 1000);
    }

    /**
     * Login with an email and password
     * @param  {string}          email    
     * @param  {string}          password 
     * @return {Observable<any>}        
     */
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
                    error => observer.error(this.parseErrorFromResponse(error))
                );
        });
    }

    /**
     * Refresh the current token
     * @return {Observable<any>}
     */
    refresh(): Observable<any> {
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
                        //observer.error(this.parseErrorFromResponse(error)
                    }
                );
        });

    }

    /**
     * Reset the service
     */
    reset(): void {
        this.authorized = false;

        this.token = '';
        if (this.hasStorage) localStorage.removeItem('id_token');

        this.expires = undefined;
        if (this.hasStorage) localStorage.removeItem('id_expires');
    }

    /**
     * Parse an error that authService encountered
     * @param {Response} error
     * @return {obj} object with title, message properties
     */
    parseErrorFromResponse(error: Response) : {title: string, message: string} {
        let title = 'Error';
        let message = 'Something went wrong and I\'m not sure what.  Try again later.';

        if (error.status === 500) {
            title = 'Server Error';
            message = 'An error occured on the server.  Come back later and try again.';
        } else {
            try {
                let json = JSON.parse(error['_body']);
                message = json.errorText || json.error;

                if (json.error === 'invalid_credentials') title = 'Login failed';
            } catch (e) {
                this.log.log('authService#parseErrorFromResponse couldnt parse the json: ', {
                    error: error,
                    reason: e
                });
            }
        }

        return { title: title, message: message };
    }
}
