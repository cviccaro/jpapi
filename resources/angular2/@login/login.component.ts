import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from '../shared/libs/angular2-material';
import {ToasterService} from 'angular2-toaster';
import {AuthService} from '../shared/index';

@Component({
    moduleId: module.id,
    selector: 'jpa-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    directives: [MATERIAL_DIRECTIVES],
    providers: [ NgForm]
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    submitted = false;
    working = false;

    constructor(private router: Router, private service: AuthService, private toaster: ToasterService) { }

    ngOnInit() {
        console.log('LoginComponent initialized.', this);
        this.service.whenAuthorized.subscribe(authorized => this.router.navigate(['']));
    }

    onSubmit() {
        this.working = true;
        this.submitted = true;

        this.service.login(this.email, this.password)
            .subscribe(res => this.success(res), error => this.fail(error));
    }

    success(res) {
        console.log('Authservice returned successfully: ', res);

        this.working = false;
        this.toaster.pop('success', 'Success!', 'Logging you in now.');

        setTimeout(() => this.router.navigate(['']), 500);
    }

    fail(error) {
        this.working = false;
        this.toaster.pop('error', error.title, error.message);
    }
}
