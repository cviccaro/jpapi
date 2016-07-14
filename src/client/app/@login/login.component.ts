import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS } from '../shared/libs/angular2-material';
import { AuthService, LoggerService } from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    directives: [MATERIAL_DIRECTIVES],
    providers: [ NgForm]
})
export class LoginComponent implements OnInit, OnDestroy {
    subs: Subscription[] = [];

    email: string;
    password: string;
    submitted = false;
    working = false;

    constructor(private router: Router, private service: AuthService, private toaster: ToasterService, private log: LoggerService) { }

    ngOnInit() {
        this.log.log('LoginComponent initialized.', this);
        let sub = this.service.whenAuthorized.subscribe(authorized => this.router.navigate(['']));

        this.subs.push(sub);
    }

    onSubmit() {
        this.working = true;
        this.submitted = true;

        let sub = this.service.login(this.email, this.password)
            .subscribe(res => this.success(res), error => this.fail(error));

        this.subs.push(sub);
    }

    success(res) {
        this.log.log('Authservice returned successfully: ', res);

        this.working = false;
        this.toaster.pop('success', 'Success!', 'Logging you in now.');

        setTimeout(() => this.router.navigate(['']), 500);
    }

    fail(error) {
        this.working = false;
        this.toaster.pop('error', error.title, error.message);
    }

    ngOnDestroy() {
        this.subs.forEach(sub => {
            if (sub) sub.unsubscribe();
        })
    }
}
