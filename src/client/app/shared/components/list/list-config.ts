import { PagerData } from './pager/pager-data';
import { JpFile } from '../../models/index';

export interface ListConfig {
    sortOptions?: { name: string, value: string }[];
    per_pageOptions?: number[];
    sort?: { by: string, descending: boolean };
    page?: PagerData;
    emptyText?: string;
};

export interface ListLineItem {
	id: number;
	title: string;
	subtitle?: string;
    thumbnail?: JpFile;
	dates?: {
		updated_at: any,
		created_at: any
	};
}
