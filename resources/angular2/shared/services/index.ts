export * from './auth.service';
export * from './blog.service';
export * from './client.service';
export * from './division.service';
export * from './project.service';
export * from './tag.service';
export * from './cache';
export * from './xhr';

import { AuthService } from './auth.service';
import { BlogService } from './blog.service';
import { ClientService } from './client.service';
import { DivisionService } from './division.service';
import { ProjectService } from './project.service';
import { TagService } from './tag.service';
import { JpaCache } from './cache';
import { XhrService } from './xhr';

export const APP_SERVICES = [
    AuthService,
    BlogService,
    ClientService,
    DivisionService,
    TagService,
    ProjectService,
    JpaCache,
    XhrService
];
