import { Inject, OnInit } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';

import { AuthService } from './index';

export class AuthRequestOptions extends BaseRequestOptions implements OnInit {
    constructor (@Inject("AuthService") public service: AuthService) {
       super();
       // if (this.service.getToken() !== '') {
       //     const token = this.service.getToken();
       //     console.log('Appending token to request: ', token);
       //     this.headers.append('Authorization','Bearer ' + token);
       // }
       console.log('AuthRequestOptions constructed.', this, service);

       setTimeout(() => {
           console.log(service);
       },500)
     }

     ngOnInit() {
         console.log('initialized');
     }
}
