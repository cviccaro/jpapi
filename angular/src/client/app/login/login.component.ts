import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { AuthService, LoggerService, RegistersSubscribers } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy, RegistersSubscribers {
    _subscriptions: Subscription[] = [];

    email: string;
    password: string;
    submitted = false;
    working = false;

    constructor(private router: Router, private service: AuthService, private toaster: ToasterService, private log: LoggerService) { }

    ngOnInit() {
        this.log.log('LoginComponent initialized.', this);
        let sub = this.service.whenAuthorized.subscribe(authorized => this.router.navigate(['']));

        this.registerSubscriber(sub);
    }

    /**
     * Form submit
     */
    onSubmit(): void {
        this.working = true;
        this.submitted = true;

        let sub = this.service.login(this.email, this.password)
            .subscribe((res:Response) => this.success(res), error => this.fail(error));

        this.registerSubscriber(sub);
    }

    /**
     * Implemented as part of RegistersSubscribers
     * @param {Subscription} sub
     */
    registerSubscriber(sub: Subscription): void {
        this._subscriptions.push(sub);
    }

    /**
     * Login succeeded
     * @param {Response} res
     */
    success(res: Response): void {
        this.log.log('Authservice returned successfully: ', res);

        this.working = false;
        this.toaster.pop('success', 'Success!', 'Logging you in now.');

        setTimeout(() => this.router.navigate(['']), 500);
    }

    /**
     * Login failed
     * @param {Response} error
     */
    fail(error: { title: string, message: string}): void {
        this.working = false;
        this.toaster.pop('error', error.title, error.message);
    }

    /**
     * Cleanup just before Angular destroys the directive/component. Unsubscribe
     * observables and detach event handlers to avoid memory leaks.
     */
    ngOnDestroy(): void {
        this._subscriptions.forEach(sub => {
            if (sub) sub.unsubscribe();
        });
    }
}
