import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Request, BaseRequestOptions} from '@angular/http';
import {Subscription, Observable} from "rxjs/Rx";
import {LoggerService} from "./logger.service";

@Injectable()
export class AuthHttp {
    authSub: Subscription;

    set token(v: string) { this._token = v; }
    get token(): string { return this._token; }

    private _token: string;

    constructor(public http: Http, public log: LoggerService) {
        this.log.log('AuthHttp constructed.');
    }

    request(url: string|Request, options?: RequestOptionsArgs) : Observable<Response> {
        options = this.injectToken(options);
        this.log.debug('AuthHttp.request # ', {url: url, options: options});
        return this.http.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this.injectToken(options);
        this.log.debug('AuthHttp.get # ', {url: url, options: options});
        return this.http.get(url, options);
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        options = this.injectToken(options);
        this.log.debug('AuthHttp.post # ', {url: url, body: body, options: options});
        return this.http.post(url, body, options);
    }

    put(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response> {
        options = this.injectToken(options);
        this.log.debug('AuthHttp.put # ', {url: url, body: body, options: options});
        return this.http.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs) : Observable<Response> {
        options = this.injectToken(options);
        this.log.debug('AuthHttp.delete # ', {url: url, options: options});
        return this.http.delete(url, options);
    }

    /**
     * Inject the token into the request options
     * @param options
     * @returns RequestOptionsArgs
     */
    private injectToken(options: RequestOptionsArgs = new BaseRequestOptions()) {
        return Object.assign({}, options, { headers: { 'Authorization': `Bearer ${this.token}`} });
    }
}