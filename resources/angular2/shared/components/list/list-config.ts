import { PagerData } from './pager/pager-data';

export interface ListConfig {
    sortOptions: { name: string, value: string }[];
    perPageOptions: number[];
    sort: { by: string, descending: boolean };
    page: PagerData;
    emptyText?: string;
};
