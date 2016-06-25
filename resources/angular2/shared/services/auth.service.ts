import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import {LocalStorageService} from "angular2-localstorage/LocalStorageEmitter";
// import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";

@Injectable()
export class AuthService implements OnInit {
    authorized = false;
    hasStorage = !(localStorage === undefined);
   // @LocalStorage() public token: string = '';
    private token = '';

    constructor(private http: Http) {
        this.ngOnInit();
    }

    ngOnInit() {
        console.log('authService#init', this);

        if (this.hasStorage) {
            var token = localStorage.getItem('jpa_token');
            if (token) {
                this.setToken(token);
            }
        } else {
            console.warn('local storage is not supported.');
        }

        // @todo: check token.
        if (this.token != '') {
            this.authorized = true;
        }
    }

    setToken(token) {
        if (this.hasStorage) localStorage.setItem('jpa_token', token);
        this.token = token;
    }

    login(email: string, password: string) : Observable<any> {
        console.log('authService#login: ', email, password);
        return Observable.create(observer => {
            this.http.post('authenticate', { email: email, password: password })
                .map(res => res.json())
                .subscribe(
                    res => {
                        this.setToken(res.token);
                        this.authorized = true;
                        observer.next(res);
                    },
                    error => observer.error(this.parseError(error))
                );
        });
    }

    logout() {
        this.authorized = false;
        this.token = '';
        if (this.hasStorage) localStorage.removeItem('jpa_token');
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
                console.log('couldnt parse the json: ', e);
            }
        }

        return { title: title, message: message };
    }
}
