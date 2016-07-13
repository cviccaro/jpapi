import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    private _cache = {};

    public get cache() { return this._cache; }

    public get(name) { return this.has(name) ? this.cache[name] : null; }

    public store(name, data) {
        this._cache[name] = data;

        return this;
    }

    public has(name) {
        return this._cache.hasOwnProperty(name);
    }
}
