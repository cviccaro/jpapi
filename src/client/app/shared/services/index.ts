export * from './auth.http';
export * from './auth.service';
export * from './blog.service';
export * from './cache.service';
export * from './client.service';
export * from './division.service';
export * from './logger.service';
export * from './metadata.service';
export * from './project.service';
export * from './settings.service';
export * from './tag.service';
export * from './xhr';

import { AuthHttp } from './auth.http';
import { AuthService } from './auth.service';
import { BlogService } from './blog.service';
import { CacheService } from './cache.service';
import { ClientService } from './client.service';
import { DivisionService } from './division.service';
import { LoggerService } from './logger.service';
import { MetadataService } from "./metadata.service";
import { ProjectService } from './project.service';
import { SettingsService } from './settings.service';
import { TagService } from './tag.service';
import { XhrService } from './xhr';

export const APP_SERVICES = [
    AuthHttp,
    AuthService,
    BlogService,
    CacheService,
    ClientService,
    DivisionService,
    LoggerService,
    MetadataService,
    ProjectService,
    SettingsService,
    TagService,
    XhrService
];
