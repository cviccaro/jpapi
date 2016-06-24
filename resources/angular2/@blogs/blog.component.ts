import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {BlogService, Blog} from '../shared/index';

@Component({
    template: '<h1>BlogCOmponent</h1>',
})
export class BlogComponent implements OnInit {
    public blog: Blog;

    constructor(private route: ActivatedRoute, private blogService: BlogService) { }
    ngOnInit() {
        let id = +this.route.snapshot.params['id'];

        this.blogService.find(id).subscribe(res => {
            this.blog = res;
        });

        console.log('BlogComponent initialized.', this);
    }
}
